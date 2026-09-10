"use client";
import { useState } from "react";
import { MODE_ICONS } from "./Icons.jsx";

const MODOS = [
  {
    id: "aprende",
    nombre: "Aprende",
    desc: "Entiende el TDAH y el TEA en el aula, con enfoque práctico (no diagnóstico).",
    ejemplo: "¿Qué características del TEA puedo ver en clase?",
    salida: "Explicación clara y aplicable, sin etiquetar.",
  },
  {
    id: "consulta",
    nombre: "Consulta",
    desc: "Describe una situación y recibe estrategias organizadas.",
    ejemplo: "El estudiante se distrae constantemente.",
    salida: "Qué hacer · qué evitar · cómo adaptar · cómo comunicar.",
  },
  {
    id: "adapta",
    nombre: "Adapta",
    desc: "Pega una actividad, instrucción o evaluación y INNIA la ajusta.",
    ejemplo: "Adapta esta guía de lectura para reducir barreras.",
    salida: "Versión adaptada manteniendo el objetivo de aprendizaje.",
  },
  {
    id: "crea",
    nombre: "Crea",
    desc: "Pide una actividad por tema o materia.",
    ejemplo: "Una actividad de fracciones, dinámica y en pasos.",
    salida: "Pasos claros, apoyos visuales y varias formas de participar.",
  },
  {
    id: "que-hago",
    nombre: "¿Qué hago?",
    desc: "Orientación breve e inmediata ante situaciones frecuentes.",
    ejemplo: "Se frustró y no quiere continuar.",
    salida: "Qué hacer ahora, qué hacer luego, y una idea clave.",
  },
];

export default function ModosTabs() {
  const [activo, setActivo] = useState("consulta");
  const modo = MODOS.find((m) => m.id === activo);
  const Icon = MODE_ICONS[modo.id];

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4">
      {/* Lista de modos */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1">
        {MODOS.map((m) => {
          const MIcon = MODE_ICONS[m.id];
          const on = m.id === activo;
          return (
            <button
              key={m.id}
              onClick={() => setActivo(m.id)}
              className={`shrink-0 md:w-full text-left rounded-2xl px-4 py-3 flex items-center gap-3 transition ${
                on ? "card-spectrum" : "glass glass-hover"
              }`}
            >
              <span className="icon-tile !w-9 !h-9 !rounded-xl">
                <MIcon width={18} height={18} />
              </span>
              <span className="font-medium text-[15px]">{m.nombre}</span>
            </button>
          );
        })}
      </div>

      {/* Panel de detalle */}
      <div className="card-spectrum p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span className="icon-tile shrink-0">
            <Icon width={24} height={24} />
          </span>
          <div>
            <h3 className="font-display text-2xl">{modo.nombre}</h3>
            <p className="text-white/70 mt-1">{modo.desc}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-black/25 border border-white/10 p-4">
          <div className="flex justify-end mb-3">
            <span className="rounded-2xl px-3.5 py-2 bg-innia-accent/20 border border-innia-accent/30 text-[14px]">
              {modo.ejemplo}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-[13.5px]">
            <span className="ribbon w-6" />
            INNIA responde con: <span className="text-white/90">{modo.salida}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
