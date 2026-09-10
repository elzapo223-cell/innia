import { getFuentes } from "../../lib/content.js";

export const metadata = { title: "Confianza y privacidad · INNIA" };

const PRINCIPIOS = [
  {
    t: "Cero datos de estudiantes",
    d: "INNIA nunca solicita ni almacena nombres, documentos, fotos, diagnósticos ni historias clínicas. Trabaja únicamente con situaciones educativas generales y anónimas.",
  },
  {
    t: "No diagnostica, no etiqueta, no receta",
    d: "Su función es exclusivamente educativa y pedagógica. No determina si un estudiante tiene una condición ni sugiere tratamientos. Eso corresponde a profesionales de la salud.",
  },
  {
    t: "Privacidad por arquitectura",
    d: "En la app de escritorio, el motor de IA corre localmente en tu computador (Ollama). Ningún dato sale de tu equipo y funciona sin conexión.",
  },
  {
    t: "Contenido con fuentes",
    d: "Las estrategias y la información se apoyan en fuentes públicas reputadas y en marcos y guías clínicas de referencia, usadas para fundamentar —no para diagnosticar.",
  },
];

export default function Confianza() {
  const fuentes = getFuentes();
  return (
    <div className="wrap py-12">
      <h1 className="font-display text-4xl">Confianza y privacidad</h1>
      <p className="text-white/65 mt-2 max-w-2xl">
        INNIA se diseñó con reglas que protegen a estudiantes y docentes. Estas no son opcionales.
      </p>

      <div className="grid md:grid-cols-2 gap-3 mt-8">
        {PRINCIPIOS.map((p) => (
          <div key={p.t} className="glass rounded-2xl p-5">
            <div className="font-semibold text-white/90">{p.t}</div>
            <div className="text-[14px] text-white/65 mt-1">{p.d}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-3">Fuentes</h2>
      <div className="glass rounded-2xl p-5">
        <ul className="space-y-2 text-[13.5px]">
          {fuentes.map((f) => (
            <li key={f.id}>
              <a href={f.url} target="_blank" rel="noreferrer" className="text-innia-accent hover:underline">
                {f.titulo}
              </a>
              <span className="text-white/50"> — {f.organizacion}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[12.5px] text-white/45 mt-6 max-w-2xl">
        Las referencias clínicas (como DSM-5-TR o CIE-11) se citan y parafrasean con fines
        educativos; no se reproduce su contenido protegido por derechos de autor.
      </p>
    </div>
  );
}
