"use client";
import { useState } from "react";

const MODOS = [
  {
    id: "aprende",
    emoji: "📚",
    nombre: "Aprende",
    desc: "Entiende el TDAH y el TEA en el aula, con enfoque práctico (no diagnóstico).",
    ejemplo: "¿Qué características del TEA puedo ver en clase?",
  },
  {
    id: "consulta",
    emoji: "💬",
    nombre: "Consulta",
    desc: "Describe una situación y recibe estrategias: qué hacer, qué evitar, cómo adaptar y comunicar.",
    ejemplo: "El estudiante se distrae constantemente.",
  },
  {
    id: "adapta",
    emoji: "🧩",
    nombre: "Adapta",
    desc: "Pega una actividad, instrucción o evaluación y INNIA la ajusta sin bajar el objetivo.",
    ejemplo: "Adapta esta guía de lectura para reducir barreras.",
  },
  {
    id: "crea",
    emoji: "✨",
    nombre: "Crea",
    desc: "Pide una actividad por tema o materia: en pasos, con apoyos visuales y varias formas de participar.",
    ejemplo: "Una actividad de fracciones, dinámica y en pasos.",
  },
  {
    id: "que-hago",
    emoji: "🚨",
    nombre: "¿Qué hago?",
    desc: "Orientación breve e inmediata ante situaciones frecuentes del aula.",
    ejemplo: "Se frustró y no quiere continuar.",
  },
];

export default function ModosTabs() {
  const [activo, setActivo] = useState("consulta");
  const modo = MODOS.find((m) => m.id === activo);
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center">
        {MODOS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActivo(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              m.id === activo
                ? "bg-white/12 border border-white/25"
                : "glass glass-hover text-white/75"
            }`}
          >
            <span className="mr-1.5">{m.emoji}</span>
            {m.nombre}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 mt-5 max-w-3xl mx-auto">
        <div className="text-4xl">{modo.emoji}</div>
        <h3 className="font-display text-2xl mt-2">{modo.nombre}</h3>
        <p className="text-white/70 mt-2">{modo.desc}</p>
        <div className="mt-4 rounded-2xl bg-black/20 border border-white/10 px-4 py-3">
          <div className="text-[12px] uppercase tracking-widest text-white/40">Ejemplo</div>
          <div className="text-[15px] mt-1 italic text-white/85">“{modo.ejemplo}”</div>
        </div>
      </div>
    </div>
  );
}
