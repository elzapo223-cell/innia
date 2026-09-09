// Renderizador Markdown mínimo y seguro (sin dependencias) para las respuestas.
// Soporta: encabezados (#, ##, ###), **negrita**, listas (-, *), y párrafos.
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s) {
  return escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function renderMarkdown(md) {
  const lines = (md || "").split("\n");
  let html = "";
  let inList = false;
  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`;
      continue;
    }
    closeList();
    if (/^###\s+/.test(line)) html += `<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`;
    else if (/^##\s+/.test(line)) html += `<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`;
    else if (/^#\s+/.test(line)) html += `<h1>${inline(line.replace(/^#\s+/, ""))}</h1>`;
    else if (line.trim() === "") html += "";
    else html += `<p>${inline(line)}</p>`;
  }
  closeList();
  return html;
}
