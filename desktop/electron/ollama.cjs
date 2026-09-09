// Cliente mínimo de Ollama (API local en http://localhost:11434).
// Usa fetch nativo (disponible en el proceso principal de Electron / Node 18+).

const HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

async function estaDisponible() {
  try {
    const r = await fetch(`${HOST}/api/tags`, { method: "GET" });
    return r.ok;
  } catch {
    return false;
  }
}

async function listarModelos() {
  const r = await fetch(`${HOST}/api/tags`);
  if (!r.ok) throw new Error(`Ollama /api/tags ${r.status}`);
  const data = await r.json();
  return (data.models || []).map((m) => m.name);
}

// Descarga un modelo con progreso (callback recibe {status, completed, total}).
async function pullModelo(nombre, onProgress) {
  const r = await fetch(`${HOST}/api/pull`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nombre, stream: true }),
  });
  if (!r.ok || !r.body) throw new Error(`Ollama /api/pull ${r.status}`);
  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line) continue;
      try {
        onProgress && onProgress(JSON.parse(line));
      } catch {
        /* línea parcial, ignorar */
      }
    }
  }
}

// Genera una respuesta de chat en streaming. onToken recibe cada fragmento de texto.
async function chat({ modelo, system, messages, onToken, signal }) {
  const r = await fetch(`${HOST}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: modelo,
      stream: true,
      messages: [{ role: "system", content: system }, ...messages],
      options: { temperature: 0.4 },
    }),
    signal,
  });
  if (!r.ok || !r.body) throw new Error(`Ollama /api/chat ${r.status}`);
  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line) continue;
      try {
        const obj = JSON.parse(line);
        const piece = obj.message?.content || "";
        if (piece) {
          full += piece;
          onToken && onToken(piece);
        }
      } catch {
        /* ignorar línea parcial */
      }
    }
  }
  return full;
}

// Embeddings para el RAG.
async function embed(modeloEmbed, texto) {
  const r = await fetch(`${HOST}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: modeloEmbed, prompt: texto }),
  });
  if (!r.ok) throw new Error(`Ollama /api/embeddings ${r.status}`);
  const data = await r.json();
  return data.embedding;
}

module.exports = { HOST, estaDisponible, listarModelos, pullModelo, chat, embed };
