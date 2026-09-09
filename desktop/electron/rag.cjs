// RAG local sobre la base curada. Estrategia híbrida:
//  - Recuperación léxica (siempre disponible, sin dependencias): solapamiento de
//    términos normalizados, con refuerzo por coincidencia en situacionesRapidas y
//    filtro por condición.
//  - Opcional: si hay un índice de embeddings cacheado, combina similitud coseno.
// Esto garantiza que el asistente funcione aunque el modelo de embeddings aún no
// esté descargado.

const { readFileSync, writeFileSync, existsSync } = require("node:fs");

const STOPWORDS = new Set(
  "de la el en y a los las un una que se su sus con por para es al lo como mas más o le les del este esta estos estas cuando donde muy sin sobre entre ya no si sí".split(
    " "
  )
);

function normalizar(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizar(s) {
  return normalizar(s)
    .split(" ")
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function textoEntrada(e) {
  return [
    e.titulo,
    e.contextoEducativo,
    (e.situacionesRapidas || []).join(" "),
    (e.dificultadesTipicas || []).join(" "),
    (e.estrategias || []).map((x) => `${x.que} ${x.como}`).join(" "),
    e.area,
    e.condicion,
  ].join(" ");
}

function coseno(a, b) {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

class Rag {
  constructor(bundle) {
    this.bundle = bundle;
    this.entradas = bundle.entradas || [];
    this.fuentesById = Object.fromEntries((bundle.fuentes || []).map((f) => [f.id, f]));
    // Pre-tokeniza cada entrada.
    this.docs = this.entradas.map((e) => ({
      entrada: e,
      tokens: new Set(tokenizar(textoEntrada(e))),
      situaciones: (e.situacionesRapidas || []).map(normalizar),
    }));
    this.embeddings = null; // { model, vectores: number[][] } opcional
  }

  cargarEmbeddingsCache(path) {
    try {
      if (existsSync(path)) {
        const data = JSON.parse(readFileSync(path, "utf8"));
        if (data.vectores && data.vectores.length === this.entradas.length) {
          this.embeddings = data;
          return true;
        }
      }
    } catch {
      /* ignorar */
    }
    return false;
  }

  async construirEmbeddings(embedFn, path) {
    const vectores = [];
    for (const d of this.docs) vectores.push(await embedFn(textoEntrada(d.entrada)));
    this.embeddings = { model: "nomic-embed-text", vectores };
    try {
      writeFileSync(path, JSON.stringify(this.embeddings), "utf8");
    } catch {
      /* ignorar */
    }
  }

  puntuarLexico(qTokens, qNorm, doc, condicion) {
    if (condicion && doc.entrada.condicion !== condicion && doc.entrada.condicion !== "ambos")
      return -1;
    let score = 0;
    for (const t of qTokens) if (doc.tokens.has(t)) score += 1;
    // Refuerzo si la consulta se parece a una situación rápida.
    for (const s of doc.situaciones) {
      if (!s) continue;
      if (qNorm.includes(s) || s.includes(qNorm)) score += 3;
      else {
        const sTokens = new Set(tokenizar(s));
        let overlap = 0;
        for (const t of qTokens) if (sTokens.has(t)) overlap += 1;
        if (overlap >= 2) score += 1.5;
      }
    }
    return score;
  }

  // Devuelve las top-k entradas para una consulta.
  async buscar(query, { condicion = null, k = 4, embedFn = null } = {}) {
    const qTokens = tokenizar(query);
    const qNorm = normalizar(query);
    let resultados = this.docs.map((doc, i) => ({
      i,
      entrada: doc.entrada,
      lex: this.puntuarLexico(qTokens, qNorm, doc, condicion),
    }));

    // Combinar con embeddings si están disponibles.
    if (embedFn && this.embeddings) {
      try {
        const qv = await embedFn(query);
        for (const r of resultados) {
          const sim = coseno(qv, this.embeddings.vectores[r.i]);
          r.score = (r.lex >= 0 ? r.lex : -100) + sim * 5;
        }
      } catch {
        for (const r of resultados) r.score = r.lex;
      }
    } else {
      for (const r of resultados) r.score = r.lex;
    }

    return resultados
      .filter((r) => r.lex >= 0 && r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map((r) => r.entrada);
  }

  // Construye el bloque de CONTEXTO para inyectar en el prompt.
  formatearContexto(entradas) {
    if (!entradas.length) return "";
    const fuentesUsadas = new Set();
    const bloques = entradas.map((e) => {
      (e.fuentes || []).forEach((f) => fuentesUsadas.add(f));
      const estr = (e.estrategias || [])
        .map((x) => `  - ${x.que}: ${x.como}${x.ejemplo ? ` (ej: ${x.ejemplo})` : ""}`)
        .join("\n");
      return `### ${e.titulo} [${e.condicion} · ${e.area}]
${e.contextoEducativo}
Estrategias:
${estr}
Evitar: ${(e.queEvitar || []).join("; ")}
Adaptar: ${(e.comoAdaptar || []).join("; ")}
Comunicar: ${(e.comoComunicar || []).join("; ")}`;
    });
    const fuentesTxt = [...fuentesUsadas]
      .map((id) => {
        const f = this.fuentesById[id];
        return f ? `- ${f.titulo} (${f.organizacion})` : null;
      })
      .filter(Boolean)
      .join("\n");
    return `CONTEXTO (estrategias curadas):\n${bloques.join("\n\n")}\n\nFuentes de este contexto:\n${fuentesTxt}`;
  }
}

module.exports = { Rag, normalizar, tokenizar };
