import React, { useEffect, useMemo, useRef, useState } from "react";
import { MODOS, CONDICIONES } from "./modes.js";
import { MODE_ICONS } from "./icons.jsx";
import { renderMarkdown } from "./lib/markdown.js";

// --- Puente con el proceso principal (o mock para vista en navegador) ---
const bridge =
  typeof window !== "undefined" && window.innia
    ? window.innia
    : {
        _navegador: true,
        status: async () => ({
          ollamaDisponible: true,
          modelos: ["qwen2.5:7b"],
          recomendado: { modelo: "qwen2.5:7b", ramGb: 16, nivel: "calidad" },
        }),
        fichas: async () => [],
        pull: () => () => {},
        ask: ({ mensaje }, { onToken, onDone }) => {
          const demo =
            "**Vista de navegador (demo).** En la app real, INNIA responde localmente con Ollama.\n\n- **Qué puedes hacer:** dividir la actividad en pasos cortos.\n- **Qué evitar:** dar varias instrucciones a la vez.\n\nTu mensaje fue: " +
            mensaje;
          let i = 0;
          const iv = setInterval(() => {
            onToken(demo.slice(i, i + 4));
            i += 4;
            if (i >= demo.length) {
              clearInterval(iv);
              onDone({ id: "demo", fuentes: [] });
            }
          }, 12);
          return { id: "demo", cancel: () => clearInterval(iv) };
        },
      };

function Disclaimer() {
  return (
    <div className="text-[11px] leading-relaxed text-white/50 px-4 py-2 border-t border-white/10">
      INNIA es una herramienta <strong className="text-white/70">educativa</strong>. No diagnostica,
      no etiqueta ni receta tratamientos, y <strong className="text-white/70">no</strong> debe usarse
      con datos personales de estudiantes. Trabaja siempre con situaciones generales y anónimas.
    </div>
  );
}

function Mensaje({ m }) {
  const copiar = () => navigator.clipboard?.writeText(m.content);
  return (
    <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          m.role === "user" ? "bg-innia-accent/20 border border-innia-accent/30" : "glass"
        }`}
      >
        {m.role === "assistant" ? (
          <div
            className="prose-innia text-[14.5px] text-white/90"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content || "…") }}
          />
        ) : (
          <div className="text-[14.5px] whitespace-pre-wrap">{m.content}</div>
        )}
        {m.fuentes?.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/10 text-[11.5px] text-white/55">
            <div className="font-medium text-white/70 mb-1">Basado en:</div>
            <ul className="space-y-0.5">
              {m.fuentes.map((f, i) => (
                <li key={i}>• {f.titulo} — {f.organizacion}</li>
              ))}
            </ul>
          </div>
        )}
        {m.role === "assistant" && m.content && (
          <div className="mt-2 flex gap-3 text-[11px] text-white/40">
            <button onClick={copiar} className="hover:text-white/80">Copiar</button>
            <button onClick={() => window.print()} className="hover:text-white/80">Imprimir</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Onboarding({ estado, onPull, pullState }) {
  const rec = estado.recomendado;
  return (
    <div className="glass rounded-2xl p-6 m-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Configuración inicial</h2>
      {!estado.ollamaDisponible ? (
        <div className="space-y-3 text-sm text-white/75">
          <p>
            INNIA funciona <strong>100% en tu computador</strong> con un motor local que viene{" "}
            <strong>incluido en la app</strong>. No necesitas instalar ni conectar nada.
          </p>
          <p>No se pudo iniciar el motor local automáticamente.</p>
          {estado.motorError && (
            <p className="text-white/45 text-[12px]">Detalle: {estado.motorError}</p>
          )}
          <p className="text-white/60 text-[13px]">
            Cierra y vuelve a abrir INNIA, o presiona <strong>“Reintentar”</strong> arriba a la derecha.
          </p>
          <p className="text-white/50 text-[12.5px]">
            Equipo detectado: ~{rec.ramGb} GB de RAM · modelo sugerido: <b>{rec.modelo}</b> ({rec.nivel}).
          </p>
        </div>
      ) : (
        <div className="space-y-3 text-sm text-white/75">
          <p>
            Motor local listo ✓. Preparando el modelo de IA para tu equipo:{" "}
            <b>{rec.modelo}</b> ({rec.nivel}, ~{rec.ramGb} GB RAM).
          </p>
          <p className="text-white/50 text-[12.5px]">
            Se descarga automáticamente una sola vez (varios GB). Después INNIA funciona sin internet.
          </p>
          {pullState?.activo ? (
            <div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-innia-accent transition-all"
                  style={{ width: `${pullState.pct}%` }}
                />
              </div>
              <div className="text-[12px] text-white/55 mt-1">{pullState.texto}</div>
            </div>
          ) : pullState?.error ? (
            <div className="space-y-2">
              <p className="text-amber-300/90 text-[12.5px]">
                No se pudo descargar el modelo: {pullState.error}
              </p>
              <button
                onClick={() => onPull(rec.modelo)}
                className="glass glass-hover rounded-xl px-4 py-2 text-sm font-medium"
              >
                Reintentar descarga
              </button>
            </div>
          ) : (
            <div className="text-[12px] text-white/55">Iniciando descarga automática…</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [estado, setEstado] = useState(null);
  const [modeloActivo, setModeloActivo] = useState(null);
  const [modoId, setModoId] = useState("consulta");
  const [condicion, setCondicion] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [generando, setGenerando] = useState(false);
  const [pullState, setPullState] = useState(null);
  const askRef = useRef(null);
  const scrollRef = useRef(null);

  const modo = useMemo(() => MODOS.find((m) => m.id === modoId), [modoId]);
  const ModoIcon = MODE_ICONS[modoId];

  const cargarEstado = async () => {
    const s = await bridge.status();
    setEstado(s);
    setModeloActivo((prev) => prev || (s.modelos[0] ?? s.recomendado.modelo));
  };

  useEffect(() => {
    cargarEstado();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, generando]);

  const listo =
    estado?.ollamaDisponible &&
    (estado.modelos.length > 0 || bridge._navegador) &&
    modeloActivo;

  const pull = (modelo) => {
    setPullState({ activo: true, pct: 0, texto: "Iniciando descarga…" });
    bridge.pull(modelo, {
      onProgress: (p) => {
        const pct = p.total ? Math.round((p.completed / p.total) * 100) : 0;
        setPullState({ activo: true, pct, texto: p.status || "Descargando…" });
      },
      onDone: async () => {
        setPullState(null);
        await cargarEstado();
        setModeloActivo(modelo);
      },
      onError: (e) => setPullState({ activo: false, error: e.error }),
    });
  };

  // Primera apertura: si el motor está listo pero aún no hay modelo, descárgalo solo.
  const autoPullRef = useRef(false);
  useEffect(() => {
    if (
      !bridge._navegador &&
      estado?.ollamaDisponible &&
      estado.modelos.length === 0 &&
      !pullState &&
      !autoPullRef.current
    ) {
      autoPullRef.current = true;
      pull(estado.recomendado.modelo);
    }
  }, [estado, pullState]);

  const enviar = (texto) => {
    const contenido = (texto ?? input).trim();
    if (!contenido || generando) return;
    const historial = mensajes.map((m) => ({ role: m.role, content: m.content }));
    const userMsg = { role: "user", content: contenido };
    const asstMsg = { role: "assistant", content: "", fuentes: [] };
    setMensajes((prev) => [...prev, userMsg, asstMsg]);
    setInput("");
    setGenerando(true);

    askRef.current = bridge.ask(
      { modo: modoId, modelo: modeloActivo, mensaje: contenido, historial, condicion },
      {
        onToken: (t) =>
          setMensajes((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: copy[copy.length - 1].content + t,
            };
            return copy;
          }),
        onDone: (d) => {
          setMensajes((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { ...copy[copy.length - 1], fuentes: d.fuentes || [] };
            return copy;
          });
          setGenerando(false);
        },
        onError: (e) => {
          setMensajes((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: "⚠️ Ocurrió un problema: " + e.error,
            };
            return copy;
          });
          setGenerando(false);
        },
      }
    );
  };

  const detener = () => {
    askRef.current?.cancel?.();
    setGenerando(false);
  };

  const nuevoChat = () => {
    detener();
    setMensajes([]);
  };

  return (
    <div className="h-screen w-screen flex text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 glass m-3 rounded-2xl flex flex-col">
        <div className="px-4 pt-4 pb-3">
          <div className="font-display text-2xl font-semibold tracking-tight">
            INN<span className="text-innia-accent">IA</span>
          </div>
          <div className="text-[11.5px] text-white/50">Asistente pedagógico · TDAH y TEA</div>
        </div>
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {MODOS.map((m) => {
            const Icon = MODE_ICONS[m.id];
            const on = m.id === modoId;
            return (
              <button
                key={m.id}
                onClick={() => setModoId(m.id)}
                className={`w-full text-left rounded-xl px-3 py-2.5 transition flex items-start gap-3 ${
                  on ? "bg-white/10 border border-white/15" : "border border-transparent glass-hover"
                }`}
              >
                <Icon className={`mt-0.5 shrink-0 ${on ? "text-innia-accent" : "text-white/45"}`} />
                <span>
                  <span className={`block text-sm font-medium ${on ? "text-white" : "text-white/80"}`}>
                    {m.nombre}
                  </span>
                  <span className="block text-[11px] text-white/45 leading-tight">{m.tagline}</span>
                </span>
                {on && <span className="ribbon w-5 ml-auto mt-2" />}
              </button>
            );
          })}
        </nav>
        <button
          onClick={nuevoChat}
          className="m-2 rounded-xl px-3 py-2 text-sm glass glass-hover"
        >
          + Nueva consulta
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col m-3 ml-0">
        {/* Top bar */}
        <header className="glass rounded-2xl px-4 py-2.5 flex items-center gap-3 mb-3">
          <div className="text-sm font-semibold flex items-center gap-2">
            <ModoIcon className="text-innia-accent" width={18} height={18} />
            {modo.nombre}
          </div>
          <div className="text-[12px] text-white/50 flex-1 truncate">{modo.descripcion}</div>
          <select
            value={condicion ?? ""}
            onChange={(e) => setCondicion(e.target.value || null)}
            className="bg-white/5 border border-white/15 rounded-lg text-[12.5px] px-2 py-1 outline-none"
            title="Enfoque"
          >
            {CONDICIONES.map((c) => (
              <option key={c.nombre} value={c.id ?? ""} className="bg-innia-bg">
                {c.nombre}
              </option>
            ))}
          </select>
          <div
            className={`text-[11.5px] px-2 py-1 rounded-lg border ${
              estado?.ollamaDisponible
                ? "border-emerald-400/30 text-emerald-300/90"
                : "border-amber-400/30 text-amber-300/90"
            }`}
            title="Estado del motor local"
          >
            {estado?.ollamaDisponible ? `● ${modeloActivo || "listo"}` : "○ motor local no disponible"}
          </div>
          <button onClick={cargarEstado} className="text-[11.5px] text-white/50 hover:text-white/80">
            Reintentar
          </button>
        </header>

        {/* Content */}
        {!estado ? (
          <div className="flex-1 grid place-items-center text-white/50">Cargando…</div>
        ) : !listo ? (
          <div className="flex-1 overflow-y-auto">
            <Onboarding estado={estado} onPull={pull} pullState={pullState} />
          </div>
        ) : (
          <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {mensajes.length === 0 && (
                <div className="h-full grid place-items-center text-center px-8">
                  <div>
                    <div className="flex justify-center mb-3 text-innia-accent"><ModoIcon width={40} height={40} /></div>
                    <div className="text-white/70 max-w-md">{modo.descripcion}</div>
                    {modo.atajos && (
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {modo.atajos.map((a) => (
                          <button
                            key={a}
                            onClick={() => enviar(a)}
                            className="glass glass-hover rounded-full px-3 py-1.5 text-[12.5px]"
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {mensajes.map((m, i) => (
                <Mensaje key={i} m={m} />
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      enviar();
                    }
                  }}
                  rows={2}
                  placeholder={modo.placeholder}
                  className="flex-1 resize-none bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-innia-accent/50"
                />
                {generando ? (
                  <button
                    onClick={detener}
                    className="rounded-xl px-4 py-2 text-sm bg-white/10 border border-white/20"
                  >
                    Detener
                  </button>
                ) : (
                  <button
                    onClick={() => enviar()}
                    className="rounded-xl px-5 py-2 text-sm font-medium text-[#0a0e1a] bg-gradient-to-r from-[#6ea8fe] to-[#a78bfa] hover:brightness-110 transition"
                  >
                    Enviar
                  </button>
                )}
              </div>
            </div>
            <Disclaimer />
          </div>
        )}
      </main>
    </div>
  );
}
