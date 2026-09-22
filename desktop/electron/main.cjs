const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const os = require("node:os");
const fs = require("node:fs");

const ollama = require("./ollama.cjs");
const motor = require("./ollama-server.cjs");
const { Rag } = require("./rag.cjs");
const { construirSystemPrompt } = require("./prompts.cjs");

const isDev = !!process.env.INNIA_DEV || !app.isPackaged;

let win;
let rag;
const EMBED_MODELO = "nomic-embed-text";

function rutaBundle() {
  const dev = path.join(__dirname, "..", "resources", "base.bundle.json");
  if (isDev && fs.existsSync(dev)) return dev;
  const prod = path.join(process.resourcesPath, "resources", "base.bundle.json");
  return fs.existsSync(prod) ? prod : dev;
}

function cargarRag() {
  try {
    const bundle = JSON.parse(fs.readFileSync(rutaBundle(), "utf8"));
    rag = new Rag(bundle);
    // Intentar cargar cache de embeddings.
    rag.cargarEmbeddingsCache(path.join(app.getPath("userData"), "embeddings.cache.json"));
    return true;
  } catch (e) {
    console.error("No se pudo cargar la base:", e.message);
    rag = new Rag({ entradas: [], fuentes: [], fichas: [] });
    return false;
  }
}

function modeloRecomendado() {
  const gb = os.totalmem() / 1024 ** 3;
  if (gb >= 16) return { modelo: "qwen2.5:7b", ramGb: Math.round(gb), nivel: "calidad" };
  if (gb >= 8) return { modelo: "llama3.2:3b", ramGb: Math.round(gb), nivel: "equilibrado" };
  return { modelo: "llama3.2:1b", ramGb: Math.round(gb), nivel: "ligero" };
}

function crearVentana() {
  win = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 840,
    minHeight: 600,
    backgroundColor: "#0d1117",
    title: "INNIA",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }
}

app.whenReady().then(() => {
  cargarRag();
  // Arranca el motor local embebido (Ollama propio) en paralelo, sin bloquear la ventana.
  motor.asegurar().catch(() => {});
  crearVentana();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) crearVentana();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Apaga el motor embebido al cerrar INNIA.
app.on("will-quit", () => motor.detener());

// --- IPC ---

ipcMain.handle("innia:status", async () => {
  // Garantiza que el motor local embebido esté corriendo (lo arranca si hace falta).
  const r = await motor.asegurar();
  const disponible = r.ok && (await ollama.estaDisponible());
  let modelos = [];
  if (disponible) {
    try {
      modelos = await ollama.listarModelos();
    } catch {
      /* ignorar */
    }
  }
  return {
    ollamaDisponible: disponible,
    motor: r.motor,
    motorError: r.ok ? null : r.error,
    modelos,
    recomendado: modeloRecomendado(),
  };
});

ipcMain.on("innia:pull", async (evt, { modelo }) => {
  try {
    await ollama.pullModelo(modelo, (p) => evt.sender.send("innia:pull-progress", { modelo, ...p }));
    evt.sender.send("innia:pull-done", { modelo });
  } catch (e) {
    evt.sender.send("innia:pull-error", { modelo, error: e.message });
  }
});

ipcMain.handle("innia:fichas", async () => (rag ? rag.bundle.fichas || [] : []));

const cancelaciones = new Map();

ipcMain.on("innia:ask", async (evt, { id, modo, modelo, mensaje, historial, condicion }) => {
  const ctrl = new AbortController();
  cancelaciones.set(id, ctrl);
  try {
    // Recuperar contexto (con embeddings si el modelo de embeddings existe).
    let entradas = [];
    if (rag) {
      const modelos = await ollama.listarModelos().catch(() => []);
      const tieneEmbed = modelos.some((m) => m.startsWith(EMBED_MODELO));
      const embedFn = tieneEmbed ? (t) => ollama.embed(EMBED_MODELO, t) : null;
      entradas = await rag.buscar(mensaje, { condicion: condicion || null, k: 4, embedFn });
    }
    const contexto = rag ? rag.formatearContexto(entradas) : "";
    const system = construirSystemPrompt(modo) + (contexto ? `\n\n${contexto}` : "");

    const messages = [...(historial || []), { role: "user", content: mensaje }];
    await ollama.chat({
      modelo,
      system,
      messages,
      signal: ctrl.signal,
      onToken: (t) => evt.sender.send("innia:token", { id, token: t }),
    });
    const fuentes = [...new Set(entradas.flatMap((e) => e.fuentes || []))]
      .map((fid) => rag.fuentesById[fid])
      .filter(Boolean)
      .map((f) => ({ titulo: f.titulo, organizacion: f.organizacion, url: f.url }));
    evt.sender.send("innia:done", { id, fuentes });
  } catch (e) {
    if (e.name === "AbortError") evt.sender.send("innia:done", { id, cancelado: true, fuentes: [] });
    else evt.sender.send("innia:error", { id, error: e.message });
  } finally {
    cancelaciones.delete(id);
  }
});

ipcMain.on("innia:cancel", (_evt, { id }) => {
  const ctrl = cancelaciones.get(id);
  if (ctrl) ctrl.abort();
});
