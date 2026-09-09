// Empaqueta la base curada (research/) en un único bundle que la app carga.
// Salida: desktop/resources/base.bundle.json  { entradas, fuentes, fichas }
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DESKTOP = resolve(__dirname, "..");
const RESEARCH = resolve(DESKTOP, "..", "research");

function readJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

function loadEntradas() {
  const dir = resolve(RESEARCH, "base");
  const out = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
    const data = readJson(resolve(dir, f));
    for (const e of Array.isArray(data) ? data : [data]) out.push(e);
  }
  return out;
}

// Parser mínimo de frontmatter YAML (clave: valor y listas [a, b]).
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      meta[k] = v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      meta[k] = v.replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body: m[2].trim() };
}

function loadFichas() {
  const dir = resolve(RESEARCH, "aprende");
  const out = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".md"))) {
    const { meta, body } = parseFrontmatter(readFileSync(resolve(dir, f), "utf8"));
    out.push({ ...meta, id: meta.slug || basename(f, ".md"), body });
  }
  return out;
}

const bundle = {
  generado: new Date().toISOString(),
  fuentes: readJson(resolve(RESEARCH, "fuentes", "fuentes.json")),
  entradas: loadEntradas(),
  fichas: loadFichas(),
};

const outDir = resolve(DESKTOP, "resources");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "base.bundle.json"), JSON.stringify(bundle, null, 2), "utf8");
console.log(
  `bundle.base.json: ${bundle.entradas.length} entradas, ${bundle.fuentes.length} fuentes, ${bundle.fichas.length} fichas`
);
