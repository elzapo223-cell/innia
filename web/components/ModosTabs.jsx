"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MODE_ICONS } from "./Icons.jsx";

const MODOS = [
  { id: "aprende", nombre: "Aprende", desc: "Entiende el TDAH y el TEA en el aula, con enfoque práctico (no diagnóstico).", ejemplo: "¿Qué características del TEA puedo ver en clase?", salida: "Explicación clara y aplicable, sin etiquetar." },
  { id: "consulta", nombre: "Consulta", desc: "Describe una situación y recibe estrategias organizadas.", ejemplo: "El estudiante se distrae constantemente.", salida: "Qué hacer · qué evitar · cómo adaptar · cómo comunicar." },
  { id: "adapta", nombre: "Adapta", desc: "Pega una actividad, instrucción o evaluación y la ajusta.", ejemplo: "Adapta esta guía de lectura para reducir barreras.", salida: "Versión adaptada, mismo objetivo de aprendizaje." },
  { id: "crea", nombre: "Crea", desc: "Pide una actividad por tema o materia.", ejemplo: "Una actividad de fracciones, dinámica y en pasos.", salida: "Pasos, apoyos visuales y varias formas de participar." },
  { id: "que-hago", nombre: "¿Qué hago?", desc: "Orientación breve e inmediata ante situaciones frecuentes.", ejemplo: "Se frustró y no quiere continuar.", salida: "Qué hacer ahora, qué hacer luego, una idea clave." },
];

export default function ModosTabs() {
  const [activo, setActivo] = useState("consulta");
  const modo = MODOS.find((m) => m.id === activo);

  return (
    <div className="grid md:grid-cols-[minmax(280px,360px)_1fr] gap-x-14 gap-y-8 items-start">
      {/* Lista editorial */}
      <ul>
        {MODOS.map((m, i) => {
          const Icon = MODE_ICONS[m.id];
          const on = m.id === activo;
          return (
            <li key={m.id} className={i > 0 ? "hairline" : ""}>
              <button
                onClick={() => setActivo(m.id)}
                className="w-full text-left py-4 flex items-center gap-4 group"
              >
                <Icon
                  width={22}
                  height={22}
                  className={on ? "text-innia-accent" : "text-white/40 group-hover:text-white/70"}
                  style={{ transition: "color .2s" }}
                />
                <span
                  className={`font-display text-xl md:text-2xl transition ${
                    on ? "text-spectrum" : "text-white/55 group-hover:text-white/85"
                  }`}
                >
                  {m.nombre}
                </span>
                {on && <span className="ribbon w-8 ml-auto" />}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Preview: una sola superficie */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activo}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="md:pt-2"
        >
          <p className="text-white/70 text-lg max-w-xl">{modo.desc}</p>

          <div className="mt-8 flex justify-start">
            <span className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-[14.5px] text-white/90 max-w-md">
              {modo.ejemplo}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-white/60">
            <span className="ribbon w-6 shrink-0" />
            <span className="text-[14px]">
              INNIA responde con <span className="text-white/90">{modo.salida}</span>
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
