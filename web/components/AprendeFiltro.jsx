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

  const areasDisponibles = useMemo(() => [...new Set(estrategias.map((e) => e.area))], [estrategias]);

  const filtradas = estrategias.filter((e) => {
    const okC = cond === "todas" || e.condicion === cond || e.condicion === "ambos";
    const okA = area === "todas" || e.area === area;
    return okC && okA;
  });

  const Btn = ({ activo, onClick, children }) => (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[13px] transition border ${
        activo
          ? "text-white border-white/25 bg-white/10"
          : "text-white/55 border-white/10 hover:text-white/85 hover:border-white/20"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="kicker mr-1">Condición</span>
        <Btn activo={cond === "todas"} onClick={() => setCond("todas")}>Todas</Btn>
        <Btn activo={cond === "TDAH"} onClick={() => setCond("TDAH")}>TDAH</Btn>
        <Btn activo={cond === "TEA"} onClick={() => setCond("TEA")}>TEA</Btn>
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-4">
        <span className="kicker mr-1">Área</span>
        <Btn activo={area === "todas"} onClick={() => setArea("todas")}>Todas</Btn>
        {areasDisponibles.map((a) => (
          <Btn key={a} activo={area === a} onClick={() => setArea(a)}>
            {AREAS[a] || a}
          </Btn>
        ))}
      </div>

      <div className="text-[12.5px] text-white/40 mt-6">{filtradas.length} estrategias</div>

      <div className="mt-2">
        {filtradas.map((e) => (
          <div key={e.id} className="py-7 hairline">
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="text-innia-accent text-[11.5px] uppercase tracking-widest">
                {e.condicion} · {AREAS[e.area] || e.area}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-white/90">{e.titulo}</h3>
            </div>
            <p className="text-white/55 text-[14px] mt-2 max-w-3xl">{e.contextoEducativo}</p>
            <ul className="mt-4 grid md:grid-cols-2 gap-x-10 gap-y-2 max-w-4xl">
              {(e.estrategias || []).map((s, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-white/70">
                  <span className="ribbon w-4 mt-2.5 shrink-0" />
                  <span><strong className="text-white/90">{s.que}:</strong> {s.como}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
