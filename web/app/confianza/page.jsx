import { getFuentes } from "../../lib/content.js";
import { FadeUp, Stagger, Item } from "../../components/Anim.jsx";
import { IconLock, IconShield, IconCompass, IconBook } from "../../components/Icons.jsx";

export const metadata = { title: "Confianza y privacidad · INNIA" };

const PRINCIPIOS = [
  { Icon: IconShield, t: "Cero datos de estudiantes", d: "INNIA nunca solicita ni almacena nombres, documentos, fotos, diagnósticos ni historias clínicas. Trabaja únicamente con situaciones educativas generales y anónimas." },
  { Icon: IconCompass, t: "No diagnostica, no etiqueta, no receta", d: "Su función es exclusivamente educativa y pedagógica. No determina si un estudiante tiene una condición ni sugiere tratamientos. Eso corresponde a profesionales de la salud." },
  { Icon: IconLock, t: "Privacidad por arquitectura", d: "En la app de escritorio, el motor de IA corre localmente en tu computador (Ollama). Ningún dato sale de tu equipo y funciona sin conexión." },
  { Icon: IconBook, t: "Contenido con fuentes", d: "Las estrategias y la información se apoyan en fuentes públicas reputadas y en marcos y guías clínicas de referencia, usadas para fundamentar —no para diagnosticar." },
];

export default function Confianza() {
  const fuentes = getFuentes();
  return (
    <div className="wrap py-24">
      <FadeUp>
        <span className="kicker">Confianza y privacidad</span>
        <h1 className="display-xl text-4xl md:text-6xl mt-5 max-w-3xl">
          Reglas que protegen a estudiantes y docentes
        </h1>
        <p className="mt-6 text-white/65 text-lg max-w-2xl leading-relaxed">
          No son opcionales: gobiernan cada respuesta de INNIA.
        </p>
      </FadeUp>

      <Stagger className="mt-20">
        {PRINCIPIOS.map((p, i) => (
          <Item key={p.t}>
            <div className={`grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start py-9 ${i > 0 ? "hairline" : ""}`}>
              <div className="flex items-center gap-4 md:w-80">
                <p.Icon width={26} height={26} className="text-innia-accent shrink-0" />
                <h2 className="font-display text-xl md:text-2xl">{p.t}</h2>
              </div>
              <p className="text-white/70 leading-relaxed max-w-2xl">{p.d}</p>
            </div>
          </Item>
        ))}
      </Stagger>

      <FadeUp>
        <div className="mt-24 pt-14 hairline">
          <span className="kicker">Fuentes</span>
          <ul className="mt-8 max-w-3xl">
            {fuentes.map((f, i) => (
              <li key={f.id} className={i > 0 ? "hairline" : ""}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-6 py-4"
                >
                  <span>
                    <span className="text-white/85 group-hover:text-white transition">{f.titulo}</span>
                    <span className="text-white/45 text-[13px]"> — {f.organizacion}</span>
                  </span>
                  <span className="text-white/30 group-hover:text-innia-accent transition shrink-0" aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[12.5px] text-white/45 mt-8 max-w-2xl leading-relaxed">
            Las referencias clínicas (como DSM-5-TR o CIE-11) se citan y parafrasean con fines
            educativos; no se reproduce su contenido protegido por derechos de autor.
          </p>
        </div>
      </FadeUp>
    </div>
  );
}
