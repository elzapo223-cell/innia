// Motor local embebido: arranca y administra un Ollama propio (solo-CPU) como
// subproceso de INNIA. Así el docente NO instala ni "conecta" nada.
const { app } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const { spawn } = require("node:child_process");

const ollama = require("./ollama.cjs");

let proc = null; // subproceso de `ollama serve` que INNIA administra
let arrancando = null; // promesa en curso, para no lanzar dos a la vez

function rutaOllamaExe() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "ollama", "ollama.exe");
  }
  return path.join(__dirname, "..", "resources", "ollama", "ollama.exe");
}

// Carpeta escribible donde se guardan los modelos (persisten entre sesiones).
function dirModelos() {
  const d = path.join(app.getPath("userData"), "models");
  try {
    fs.mkdirSync(d, { recursive: true });
  } catch {
    /* ignorar */
  }
  return d;
}

function hayBinario() {
  try {
    return fs.existsSync(rutaOllamaExe());
  } catch {
    return false;
  }
}

async function esperarListo(timeoutMs = 40000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (await ollama.estaDisponible()) return true;
    await new Promise((r) => setTimeout(r, 700));
  }
  return false;
}

// Garantiza que Ollama esté corriendo. Devuelve
// { ok, motor: 'embebido'|'externo'|'ninguno', error? }.
async function asegurar() {
  // Si ya responde (motor embebido previo, o un Ollama externo del usuario), listo.
  if (await ollama.estaDisponible()) {
    return { ok: true, motor: proc ? "embebido" : "externo" };
  }
  if (arrancando) return arrancando;

  arrancando = (async () => {
    if (!hayBinario()) {
      return { ok: false, motor: "ninguno", error: "No se encontró el motor local empaquetado (ollama.exe)." };
    }
    try {
      const env = {
        ...process.env,
        OLLAMA_MODELS: dirModelos(),
        OLLAMA_HOST: "127.0.0.1:11434",
      };
      proc = spawn(rutaOllamaExe(), ["serve"], { env, windowsHide: true, stdio: "ignore" });
      proc.on("exit", () => {
        proc = null;
      });
      proc.on("error", (e) => {
        console.error("Ollama serve error:", e.message);
      });
    } catch (e) {
      return { ok: false, motor: "ninguno", error: e.message };
    }
    const ok = await esperarListo();
    return ok
      ? { ok: true, motor: "embebido" }
      : { ok: false, motor: "embebido", error: "El motor local no respondió a tiempo." };
  })();

  try {
    return await arrancando;
  } finally {
    arrancando = null;
  }
}

function detener() {
  if (proc) {
    try {
      proc.kill();
    } catch {
      /* ignorar */
    }
    proc = null;
  }
}

module.exports = { asegurar, detener, hayBinario, rutaOllamaExe, dirModelos };
