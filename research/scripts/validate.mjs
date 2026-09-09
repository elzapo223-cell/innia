// Validador de la base curada de INNIA.
// - Valida fuentes y entradas contra sus JSON Schema.
// - Verifica ids únicos e integridad referencial (entrada.fuentes[] existen).
// - Reporta cobertura por condición×área.
// - Exige que las 6 situaciones de ejemplo del cliente estén cubiertas.
// Sale con código !=0 si algo falla.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { globSync } from "glob";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const AREAS = [
  "atencion",
  "comunicacion",
  "interaccion-social",
  "regulacion-emocional",
  "instrucciones",
  "aprendizaje",
  "trabajo-en-grupo",
  "motivacion-tareas",
  "sensorial",
];
const CONDICIONES = ["TDAH", "TEA", "ambos"];

// Situaciones de ejemplo del cliente. Cada una se considera cubierta si algún
// `situacionesRapidas` (normalizado) cumple su predicado.
const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
const has = (t, w) => norm(t).includes(w);
const SITUACIONES_CLIENTE = [
  { id: "no-quiere-actividad", test: (t) => has(t, "no quiere") && (has(t, "activ") || has(t, "tarea") || has(t, "trabaj")) },
  { id: "no-comprende-instrucciones", test: (t) => (has(t, "no comprende") || has(t, "no entiende") || has(t, "dificultad")) && has(t, "instruc") },
  { id: "se-distrae", test: (t) => has(t, "distrae") || has(t, "distracc") },
  { id: "frustracion-abandona", test: (t) => has(t, "frustr") && (has(t, "continuar") || has(t, "abandon") || has(t, "rendir") || has(t, "seguir")) },
  { id: "trabajo-en-grupo", test: (t) => has(t, "grupo") },
  { id: "explicar-de-otra-manera", test: (t) => has(t, "otra manera") || has(t, "otra forma") || has(t, "explicar de otra") || (has(t, "explic") && has(t, "diferente")) },
];

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const fuenteSchema = JSON.parse(readFileSync(resolve(ROOT, "schema/fuente.schema.json"), "utf8"));
const entradaSchema = JSON.parse(readFileSync(resolve(ROOT, "schema/entrada.schema.json"), "utf8"));
const validateFuente = ajv.compile(fuenteSchema);
const validateEntrada = ajv.compile(entradaSchema);

const errors = [];
const warn = [];

function loadJsonArrayOrObject(file) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  return Array.isArray(data) ? data : [data];
}

// --- Fuentes ---
const fuenteFiles = globSync("fuentes/**/*.json", { cwd: ROOT, absolute: true });
const fuenteIds = new Set();
let fuentes = [];
for (const f of fuenteFiles) {
  let arr;
  try {
    arr = loadJsonArrayOrObject(f);
  } catch (e) {
    errors.push(`JSON inválido en ${f}: ${e.message}`);
    continue;
  }
  for (const fu of arr) {
    if (!validateFuente(fu)) {
      errors.push(`Fuente inválida (${fu.id ?? "sin id"}) en ${f}: ${ajv.errorsText(validateFuente.errors)}`);
      continue;
    }
    if (fuenteIds.has(fu.id)) errors.push(`Fuente id duplicada: ${fu.id}`);
    fuenteIds.add(fu.id);
    fuentes.push(fu);
  }
}

// --- Entradas ---
const entradaFiles = globSync("base/**/*.json", { cwd: ROOT, absolute: true });
const entradaIds = new Set();
let entradas = [];
for (const f of entradaFiles) {
  let arr;
  try {
    arr = loadJsonArrayOrObject(f);
  } catch (e) {
    errors.push(`JSON inválido en ${f}: ${e.message}`);
    continue;
  }
  for (const en of arr) {
    if (!validateEntrada(en)) {
      errors.push(`Entrada inválida (${en.id ?? "sin id"}) en ${f}: ${ajv.errorsText(validateEntrada.errors)}`);
      continue;
    }
    if (entradaIds.has(en.id)) errors.push(`Entrada id duplicada: ${en.id}`);
    entradaIds.add(en.id);
    for (const fid of en.fuentes) {
      if (!fuenteIds.has(fid)) errors.push(`Entrada ${en.id} referencia fuente inexistente: ${fid}`);
    }
    entradas.push(en);
  }
}

// --- Cobertura condición×área ---
const matriz = {};
for (const c of CONDICIONES) matriz[c] = Object.fromEntries(AREAS.map((a) => [a, 0]));
for (const en of entradas) matriz[en.condicion][en.area] += 1;

// --- Cobertura situaciones del cliente ---
const todasSituaciones = entradas.flatMap((e) => e.situacionesRapidas);
const cobertura = SITUACIONES_CLIENTE.map((s) => ({
  id: s.id,
  cubierta: todasSituaciones.some((t) => s.test(t)),
}));
const cubiertas = cobertura.filter((c) => c.cubierta).length;

// --- Reporte ---
console.log("\n=== INNIA · Validación de la base curada ===");
console.log(`Fuentes: ${fuentes.length} | Entradas: ${entradas.length}`);
console.log("\nCobertura condición × área (nº de entradas):");
const header = ["condición".padEnd(8), ...AREAS.map((a) => a.slice(0, 6).padStart(7))].join(" ");
console.log("  " + header);
for (const c of CONDICIONES) {
  console.log("  " + [c.padEnd(8), ...AREAS.map((a) => String(matriz[c][a]).padStart(7))].join(" "));
}
console.log(`\nSituaciones del cliente cubiertas: ${cubiertas}/${SITUACIONES_CLIENTE.length}`);
for (const c of cobertura) console.log(`  ${c.cubierta ? "OK " : "-- "} ${c.id}`);

const situacionesFaltan = cobertura.filter((c) => !c.cubierta).map((c) => c.id);

// En modo estricto (--strict) las situaciones faltantes son error.
const strict = process.argv.includes("--strict");
if (strict && situacionesFaltan.length) {
  errors.push(`Situaciones del cliente sin cubrir: ${situacionesFaltan.join(", ")}`);
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} error(es):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
if (situacionesFaltan.length && !strict) {
  console.warn(`\n⚠ Faltan situaciones del cliente (usa --strict al cierre): ${situacionesFaltan.join(", ")}`);
}
console.log("\n✔ Validación OK\n");
