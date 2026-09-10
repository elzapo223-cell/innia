"use client";
import { useMemo, useState } from "react";

const AREAS = {
  atencion: "Atención",
  comunicacion: "Comunicación",
  "interaccion-social": "Interacción social",
  "regulacion-emocional": "Regulación emocional",
  instrucciones: "Instrucciones",
  aprendizaje: "Aprendizaje",
  "trabajo-en-grupo": "Trabajo en grupo",
  "motivacion-tareas": "Motivación",
  sensorial: "Sensorial",
};

export default function AprendeFiltro({ estrategias }) {
  const [cond, setCond] = useState("todas");
  const [area, setArea] = useState("todas");

  const areasDisponibles = useMemo(
    () => [...new Set(estrategias.map((e) => e.area))],
    [estrategias]
  );

  const filtradas = estrategias.filter((e) => {
    const okC = cond === "todas" || e.condicion === cond || e.condicion === "ambos";
    const okA = area === "todas" || e.area === area;
    return okC && okA;
  });

  const Btn = ({ activo, onClick, children }) => (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition ${
        activo ? "bg-white/14 border border-white/25" : "glass glass-hover text-white/70"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[12px] uppercase tracking-widest text-white/40 mr-1">Condición</span>
        <Btn activo={cond === "todas"} onClick={() => setCond("todas")}>Todas</Btn>
        <Btn activo={cond === "TDAH"} onClick={() => setCond("TDAH")}>TDAH</Btn>
        <Btn activo={cond === "TEA"} onClick={() => setCond("TEA")}>TEA</Btn>
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-3">
        <span className="text-[12px] uppercase tracking-widest text-white/40 mr-1">Área</span>
        <Btn activo={area === "todas"} onClick={() => setArea("todas")}>Todas</Btn>
        {areasDisponibles.map((a) => (
          <Btn key={a} activo={area === a} onClick={() => setArea(a)}>
            {AREAS[a] || a}
          </Btn>
        ))}
      </div>

      <div className="text-[12.5px] text-white/40 mt-4">{filtradas.length} estrategias</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        {filtradas.map((e) => (
          <div key={e.id} className="glass glass-hover rounded-2xl p-4">
            <div className="text-[11.5px] text-white/50">
              {e.condicion} · {AREAS[e.area] || e.area}
            </div>
            <div className="font-medium mt-1">{e.titulo}</div>
            <ul className="mt-2 text-[13px] text-white/65 list-disc ml-4 space-y-1">
              {(e.estrategias || []).slice(0, 2).map((s, i) => (
                <li key={i}>
                  <strong className="text-white/85">{s.que}:</strong> {s.como}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
