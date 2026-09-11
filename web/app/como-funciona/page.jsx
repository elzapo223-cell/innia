import { FadeUp, Stagger, Item } from "../../components/Anim.jsx";
import { MODE_ICONS, IconLock } from "../../components/Icons.jsx";
import { DeviceLocal } from "../../components/Art.jsx";

export const metadata = { title: "Cómo funciona · INNIA" };

const MODOS = [
  { id: "consulta", nombre: "Consulta", desc: "Describe una situación general del aula y recibe estrategias organizadas.", ejemplo: "El estudiante se distrae constantemente.", salida: "Qué hacer · qué evitar · cómo adaptar · cómo comunicar." },
  { id: "adapta", nombre: "Adapta", desc: "Pega una actividad, instrucción o evaluación y INNIA la ajusta.", ejemplo: "Adapta esta guía de lectura para reducir barreras.", salida: "Versión adaptada, mismo objetivo de aprendizaje." },
  { id: "crea", nombre: "Crea", desc: "Pide una actividad por tema o materia.", ejemplo: "Actividad de fracciones, dinámica y en pasos.", salida: "Pasos, apoyos visuales y varias formas de participar." },
  { id: "que-hago", nombre: "¿Qué hago?", desc: "Orientación breve e inmediata para situaciones frecuentes.", ejemplo: "Se frustró y no quiere continuar.", salida: "Qué hacer ahora, qué hacer luego, una idea clave." },
  { id: "aprende", nombre: "Aprende", desc: "Entiende el TDAH y el TEA en contexto educativo.", ejemplo: "¿Qué características del TEA veo en el aula?", salida: "Explicaciones claras y prácticas (no diagnóstico)." },
];

export default function ComoFunciona() {
  return (
    <div className="wrap py-24">
      <FadeUp>
        <span className="kicker">Cómo funciona</span>
        <h1 className="display-xl text-4xl md:text-6xl mt-5 max-w-3xl">
          Un chat con cinco modos, sobre una base curada
        </h1>
        <p className="mt-6 text-white/65 text-lg max-w-2xl leading-relaxed">
          Escribes una situación general del aula —siempre anónima— y obtienes orientación
          pedagógica práctica, apoyada en fuentes reputadas. Todo ocurre en tu computador.
        </p>
      </FadeUp>

      <Stagger className="mt-20">
        {MODOS.map((m, i) => {
          const Icon = MODE_ICONS[m.id];
          return (
            <Item key={m.id}>
              <div className={`grid md:grid-cols-[auto_1fr_1fr] gap-6 md:gap-10 items-start py-9 ${i > 0 ? "hairline" : ""}`}>
                <div className="flex items-center gap-4 md:w-52">
                  <Icon width={26} height={26} className="text-innia-accent shrink-0" />
                  <span className="font-display text-2xl">{m.nombre}</span>
                </div>
                <p className="text-white/70">{m.desc}</p>
                <div className="text-[14px]">
                  <div className="text-white/45 italic">“{m.ejemplo}”</div>
                  <div className="mt-2 flex items-start gap-2 text-white/70">
                    <span className="ribbon w-5 mt-2 shrink-0" />
                    <span>{m.salida}</span>
                  </div>
                </div>
              </div>
            </Item>
          );
        })}
      </Stagger>

      <FadeUp>
        <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <IconLock width={28} height={28} className="text-innia-accent" />
            <h2 className="display-xl text-2xl md:text-4xl mt-5">¿Por qué funciona en tu computador?</h2>
            <p className="text-white/70 mt-4 leading-relaxed">
              INNIA usa un motor de IA local (Ollama) que se instala en tu equipo. Al abrir la app por
              primera vez, te guía para instalarlo y descargar el modelo adecuado a tu computador. Desde
              ahí, todo ocurre localmente: no se envía nada a internet y funciona sin conexión.
            </p>
          </div>
          <DeviceLocal className="w-full h-auto" />
        </div>
      </FadeUp>
    </div>
  );
}
