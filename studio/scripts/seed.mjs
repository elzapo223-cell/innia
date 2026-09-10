// Importa la base curada (research/) a Sanity.
// Requiere variables de entorno (ver studio/.env.example):
//   SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, SANITY_WRITE_TOKEN
// Uso: node scripts/seed.mjs
import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESEARCH = resolve(__dirname, "..", "..", "research");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Faltan SANITY_STUDIO_PROJECT_ID y/o SANITY_WRITE_TOKEN. Copia .env.example a .env y complétalo."
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-09-01", token, useCdn: false });
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.trim();
    if (v.startsWith("[") && v.endsWith("]"))
      meta[k] = v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    else meta[k] = v.replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2].trim() };
}

async function run() {
  const tx = client.transaction();

  // Fuentes
  const fuentes = readJson(resolve(RESEARCH, "fuentes", "fuentes.json"));
  for (const f of fuentes) {
    tx.createOrReplace({
      _id: `fuente-${f.id}`,
      _type: "fuente",
      idRef: f.id,
      titulo: f.titulo,
      organizacion: f.organizacion,
      tipo: f.tipo,
      url: f.url,
      idiomaOriginal: f.idiomaOriginal,
      nota: f.nota,
    });
  }

  // Estrategias
  const baseDir = resolve(RESEARCH, "base");
  for (const file of readdirSync(baseDir).filter((n) => n.endsWith(".json"))) {
    for (const e of readJson(resolve(baseDir, file))) {
      tx.createOrReplace({
        _id: `estrategia-${e.id}`,
        _type: "estrategia",
        idRef: e.id,
        titulo: e.titulo,
        condicion: e.condicion,
        area: e.area,
        contextoEducativo: e.contextoEducativo,
        dificultadesTipicas: e.dificultadesTipicas,
        estrategias: (e.estrategias || []).map((s) => ({ _type: "object", ...s })),
        queEvitar: e.queEvitar,
        comoAdaptar: e.comoAdaptar,
        comoComunicar: e.comoComunicar,
        situacionesRapidas: e.situacionesRapidas,
        fuentes: (e.fuentes || []).map((fid) => ({ _type: "reference", _ref: `fuente-${fid}`, _key: fid })),
      });
    }
  }

  // Fichas Aprende
  const aprendeDir = resolve(RESEARCH, "aprende");
  for (const file of readdirSync(aprendeDir).filter((n) => n.endsWith(".md"))) {
    const { meta, body } = parseFrontmatter(readFileSync(resolve(aprendeDir, file), "utf8"));
    const slug = meta.slug || basename(file, ".md");
    tx.createOrReplace({
      _id: `ficha-${slug}`,
      _type: "fichaAprende",
      titulo: meta.titulo || slug,
      slug: { _type: "slug", current: slug },
      condicion: meta.condicion,
      bodyText: body,
      fuentes: (meta.fuentes || []).map((fid) => ({ _type: "reference", _ref: `fuente-${fid}`, _key: fid })),
    });
  }

  const res = await tx.commit();
  console.log(`Seed completo. Documentos afectados: ${res.results?.length ?? "?"}`);
}

run().catch((e) => {
  console.error("Error en el seed:", e.message);
  process.exit(1);
});
