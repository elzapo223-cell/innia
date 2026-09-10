// Markdown mínimo para el contenido (encabezados, **negrita**, listas, > citas).
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

export function renderMarkdown(md) {
  const lines = (md || "").split("\n");
  let html = "";
  let inList = false;
  let inQuote = false;
  const closeList = () => {
    if (inList) { html += "</ul>"; inList = false; }
  };
  const closeQuote = () => {
    if (inQuote) { html += "</blockquote>"; inQuote = false; }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*>\s?/.test(line)) {
      closeList();
      if (!inQuote) { html += "<blockquote>"; inQuote = true; }
      html += `<p>${inline(line.replace(/^\s*>\s?/, ""))}</p>`;
      continue;
    }
    closeQuote();
    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inline(line.replace(/^\s*[-*]\s+/, ""))}</li>`;
      continue;
    }
    closeList();
    if (/^###\s+/.test(line)) html += `<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`;
    else if (/^##\s+/.test(line)) html += `<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`;
    else if (/^#\s+/.test(line)) html += `<h1>${inline(line.replace(/^#\s+/, ""))}</h1>`;
    else if (line.trim() !== "") html += `<p>${inline(line)}</p>`;
  }
  closeList();
  closeQuote();
  return html;
}
