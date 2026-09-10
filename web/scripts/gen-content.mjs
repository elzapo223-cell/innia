// Genera web/lib/content.generated.json a partir de la base curada (research/).
// Sirve de CONTENIDO DE RESPALDO cuando aún no hay proyecto Sanity configurado,
// para que el sitio compile y se vea con contenido real.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(__dirname, "..");
const RESEARCH = resolve(WEB, "..", "research");

const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

function loadEntradas() {
  const dir = resolve(RESEARCH, "base");
  const out = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
    const data = readJson(resolve(dir, f));
    for (const e of Array.isArray(data) ? data : [data]) out.push(e);
  }
  return out;
}

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

function loadFichas() {
  const dir = resolve(RESEARCH, "aprende");
  return readdirSync(dir)
    .filter((n) => n.endsWith(".md"))
    .map((f) => {
      const { meta, body } = parseFrontmatter(readFileSync(resolve(dir, f), "utf8"));
      return { ...meta, id: meta.slug || basename(f, ".md"), body };
    });
}

const content = {
  generado: new Date().toISOString(),
  fuentes: readJson(resolve(RESEARCH, "fuentes", "fuentes.json")),
  entradas: loadEntradas(),
  fichas: loadFichas(),
};

mkdirSync(resolve(WEB, "lib"), { recursive: true });
writeFileSync(resolve(WEB, "lib", "content.generated.json"), JSON.stringify(content, null, 2), "utf8");
console.log(
  `content.generated.json: ${content.entradas.length} entradas, ${content.fuentes.length} fuentes, ${content.fichas.length} fichas`
);
