const { contextBridge, ipcRenderer } = require("electron");

let seq = 0;

contextBridge.exposeInMainWorld("innia", {
  status: () => ipcRenderer.invoke("innia:status"),
  fichas: () => ipcRenderer.invoke("innia:fichas"),

  pull: (modelo, { onProgress, onDone, onError }) => {
    const prog = (_e, d) => d.modelo === modelo && onProgress && onProgress(d);
    const done = (_e, d) => {
      if (d.modelo !== modelo) return;
      cleanup();
      onDone && onDone(d);
    };
    const err = (_e, d) => {
      if (d.modelo !== modelo) return;
      cleanup();
      onError && onError(d);
    };
    function cleanup() {
      ipcRenderer.off("innia:pull-progress", prog);
      ipcRenderer.off("innia:pull-done", done);
      ipcRenderer.off("innia:pull-error", err);
    }
    ipcRenderer.on("innia:pull-progress", prog);
    ipcRenderer.on("innia:pull-done", done);
    ipcRenderer.on("innia:pull-error", err);
    ipcRenderer.send("innia:pull", { modelo });
    return cleanup;
  },

  // Envía una consulta y transmite la respuesta por callbacks. Devuelve {id, cancel}.
  ask: ({ modo, modelo, mensaje, historial, condicion }, { onToken, onDone, onError }) => {
    const id = `q${Date.now()}_${seq++}`;
    const tok = (_e, d) => d.id === id && onToken && onToken(d.token);
    const done = (_e, d) => {
      if (d.id !== id) return;
      cleanup();
      onDone && onDone(d);
    };
    const err = (_e, d) => {
      if (d.id !== id) return;
      cleanup();
      onError && onError(d);
    };
    function cleanup() {
      ipcRenderer.off("innia:token", tok);
      ipcRenderer.off("innia:done", done);
      ipcRenderer.off("innia:error", err);
    }
    ipcRenderer.on("innia:token", tok);
    ipcRenderer.on("innia:done", done);
    ipcRenderer.on("innia:error", err);
    ipcRenderer.send("innia:ask", { id, modo, modelo, mensaje, historial, condicion });
    return { id, cancel: () => ipcRenderer.send("innia:cancel", { id }) };
  },
});
