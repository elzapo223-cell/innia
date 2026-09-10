export const metadata = { title: "Cómo funciona · INNIA" };

const MODOS = [
  {
    emoji: "💬",
    nombre: "Consulta",
    desc: "Describe una situación general del aula y recibe estrategias organizadas.",
    ejemplo: "“El estudiante se distrae constantemente durante la actividad.”",
    salida: "Qué hacer · qué evitar · cómo adaptar · cómo comunicar.",
  },
  {
    emoji: "🧩",
    nombre: "Adapta",
    desc: "Pega una actividad, instrucción o evaluación y INNIA la ajusta.",
    ejemplo: "“Adapta esta guía de lectura para reducir barreras.”",
    salida: "Versión adaptada manteniendo el objetivo de aprendizaje.",
  },
  {
    emoji: "✨",
    nombre: "Crea",
    desc: "Pide una actividad por tema o materia.",
    ejemplo: "“Actividad de fracciones, dinámica y en pasos.”",
    salida: "Pasos claros, apoyos visuales y formas de participación.",
  },
  {
    emoji: "🚨",
    nombre: "¿Qué hago?",
    desc: "Orientación breve e inmediata para situaciones frecuentes.",
    ejemplo: "“Se frustró y no quiere continuar.”",
    salida: "Qué hacer ahora, qué hacer luego, y una idea clave.",
  },
  {
    emoji: "📚",
    nombre: "Aprende",
    desc: "Entiende el TDAH y el TEA en contexto educativo.",
    ejemplo: "“¿Qué características del TEA veo en el aula?”",
    salida: "Explicaciones claras con enfoque práctico (no diagnóstico).",
  },
];

export default function ComoFunciona() {
  return (
    <div className="wrap py-12">
      <h1 className="font-display text-4xl">Cómo funciona</h1>
      <p className="text-white/65 mt-2 max-w-2xl">
        INNIA es un chat con cinco modos. Escribes una situación general del aula —siempre anónima—
        y obtienes orientación pedagógica práctica, apoyada en fuentes reputadas.
      </p>

      <div className="grid md:grid-cols-2 gap-3 mt-8">
        {MODOS.map((m) => (
          <div key={m.nombre} className="glass rounded-2xl p-5">
            <div className="text-2xl">{m.emoji} <span className="text-lg font-semibold align-middle">{m.nombre}</span></div>
            <p className="text-[14px] text-white/70 mt-2">{m.desc}</p>
            <div className="mt-3 text-[13px] text-white/55">
              <div className="text-white/70">Ejemplo:</div>
              <div className="italic">{m.ejemplo}</div>
            </div>
            <div className="mt-2 text-[13px] text-white/55">
              <div className="text-white/70">Recibes:</div>
              <div>{m.salida}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold">¿Por qué funciona en tu computador?</h2>
        <p className="text-white/70 mt-2 text-[14.5px]">
          INNIA usa un motor de IA local (Ollama) que se instala en tu equipo. Al abrir la app por
          primera vez, te guía para instalarlo y descargar el modelo adecuado a tu computador. Desde
          ahí, todo ocurre localmente: no se envía nada a internet y funciona sin conexión.
        </p>
      </div>
    </div>
  );
}
