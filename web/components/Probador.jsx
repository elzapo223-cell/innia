"use client";
import { useMemo, useRef, useState } from "react";
import { renderMarkdown } from "../lib/markdown.js";

// Demo honesto: respuestas curadas (de la base de INNIA) mostradas con efecto de
// escritura. La app real responde localmente con Ollama.
const PRESETS = [
  {
    q: "Se distrae constantemente.",
    a: `**Qué puedes hacer**
- Ubícalo cerca de ti y lejos de ventanas o zonas de paso.
- Divide la actividad en bloques cortos de 10–15 min con micro-pausas de movimiento.
- Deja solo el material del momento sobre la mesa.

**Qué evitar**
- Llamarle la atención en público por distraerse.
- Exigir 40 minutos de atención sin pausas.

**Cómo comunicarte**
- Acuerden una señal discreta para reorientar la atención.`,
  },
  {
    q: "No quiere realizar la actividad.",
    a: `**Qué puedes hacer**
- Pide solo el primer paso, no la tarea completa: “escribe únicamente el título”.
- Ofrece una elección acotada: “¿empiezas por lo fácil o por el dibujo?”.
- Vincula el esfuerzo a algo positivo y cercano.

**Qué evitar**
- Mostrar toda la carga de trabajo de golpe.
- Leer la negativa como desobediencia y castigar de entrada.

**Cómo comunicarte**
- Valida antes de exigir: “sé que se ve larga, hagámosla por partes”.`,
  },
  {
    q: "Se frustró y no quiere continuar.",
    a: `**Ahora mismo**
- Baja la activación: ofrece una pausa breve y valida la emoción.
- Reduce la meta inmediata para romper el bloqueo: “hagamos solo este”.

**En un momento de calma**
- Practiquen juntos una rutina de calma para la próxima vez.

**Recuerda**
- Primero calmar, después resolver. No razonar en pleno pico emocional.`,
  },
  {
    q: "¿Cómo explico esta actividad de otra manera?",
    a: `**Cambia el formato, no el objetivo**
- Si no entendió en el cuaderno, muéstralo con material concreto o un ejemplo real.
- Ve de lo concreto a lo abstracto (objetos → dibujo → símbolo).
- Da más apoyo al inicio y retíralo poco a poco.

**Evita**
- Repetir la misma explicación más fuerte o más rápido.
- Bajar el objetivo de aprendizaje al adaptar.`,
  },
];

function useTypewriter() {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const timer = useRef(null);
  const run = (full) => {
    clearInterval(timer.current);
    setText("");
    setTyping(true);
    let i = 0;
    timer.current = setInterval(() => {
      i += 3;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(timer.current);
        setTyping(false);
      }
    }, 14);
  };
  return { text, typing, run };
}

export default function Probador() {
  const [input, setInput] = useState("");
  const [pregunta, setPregunta] = useState(null);
  const { text, typing, run } = useTypewriter();

  const responder = (q) => {
    const preset =
      PRESETS.find((p) => p.q.toLowerCase() === q.toLowerCase()) ||
      PRESETS.find((p) => {
        const w = q.toLowerCase();
        return (
          (w.includes("distra") && p.q.includes("distrae")) ||
          (w.includes("no quiere") && p.q.includes("no quiere")) ||
          (w.includes("frustr") && p.q.includes("frustró")) ||
          ((w.includes("explic") || w.includes("otra manera")) && p.q.includes("explico"))
        );
      }) ||
      PRESETS[0];
    setPregunta(q);
    run(preset.a);
  };

  const enviar = () => {
    const q = input.trim();
    if (!q) return;
    responder(q);
    setInput("");
  };

  const html = useMemo(() => renderMarkdown(text), [text]);

  return (
    <div className="glass rounded-3xl p-4 sm:p-5 w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="ribbon w-8" />
        <span className="text-[12px] uppercase tracking-widest text-white/50">Probador</span>
        <span className="ml-auto text-[11px] text-white/40">demo · respuestas de la base</span>
      </div>

      {/* Situaciones sugeridas */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((p) => (
          <button
            key={p.q}
            onClick={() => responder(p.q)}
            className="glass glass-hover rounded-full px-3 py-1.5 text-[12.5px] text-white/80"
          >
            {p.q}
          </button>
        ))}
      </div>

      {/* Conversación */}
      <div className="rounded-2xl bg-black/20 border border-white/10 p-4 min-h-[220px] max-h-[320px] overflow-y-auto">
        {!pregunta ? (
          <div className="h-full grid place-items-center text-center text-white/45 text-sm py-10">
            Toca una situación o escribe la tuya. INNIA responde con estrategias.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl px-3.5 py-2 bg-innia-accent/20 border border-innia-accent/30 text-[14px]">
                {pregunta}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[92%] glass rounded-2xl px-3.5 py-2.5">
                <div
                  className="prose-innia text-[13.5px] text-white/90"
                  dangerouslySetInnerHTML={{ __html: html || "…" }}
                />
                {typing && <span className="inline-block w-2 h-4 align-middle bg-white/60 animate-pulse" />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Entrada */}
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Escribe una situación del aula…"
          className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-innia-accent/50"
        />
        <button
          onClick={enviar}
          className="rounded-xl px-4 py-2 text-sm font-medium bg-innia-accent/25 border border-innia-accent/40 hover:bg-innia-accent/35"
        >
          Enviar
        </button>
      </div>
      <p className="mt-2 text-[11px] text-white/40">
        Demostración con contenido real de INNIA. En la app, las respuestas se generan en tu
        computador y nunca se piden datos de estudiantes.
      </p>
    </div>
  );
}
