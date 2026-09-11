import { FadeUp } from "../../components/Anim.jsx";
import { QuestionScene } from "../../components/Art.jsx";
import { Parallax } from "../../components/AnimatedArt.jsx";

export const metadata = { title: "Preguntas frecuentes · INNIA" };

const FAQ = [
  ["¿INNIA es gratis?", "Sí. La app es gratuita y el motor de IA que usa (Ollama) también."],
  ["¿Necesito internet?", "Solo para instalar la app y descargar el modelo la primera vez. Después funciona sin conexión."],
  ["¿Guarda datos de mis estudiantes?", "No. INNIA no pide ni almacena datos personales. Trabaja con situaciones anónimas y todo ocurre en tu computador."],
  ["¿Qué computador necesito?", "Windows 10/11 de 64 bits. Con 8 GB de RAM funciona; con 16 GB usa un modelo de mejor calidad. Necesita ~5 GB de espacio."],
  ["¿INNIA diagnostica a un estudiante?", "No, y nunca lo hará. Es una herramienta pedagógica que da estrategias. El diagnóstico corresponde a profesionales de la salud."],
  ["¿De dónde salen las estrategias?", "De fuentes públicas reputadas y marcos educativos y clínicos de referencia (DUA/CAST, CDC, NICE, DSM-5-TR, CIE-11, entre otros), citadas en la sección Confianza."],
  ["¿Habrá versión para Mac o celular?", "Por ahora INNIA es para Windows. Otras plataformas se evaluarán más adelante."],
];

export default function Faq() {
  return (
    <div className="wrap-narrow py-24">
      <div className="grid md:grid-cols-[1fr_0.7fr] gap-8 items-center">
        <FadeUp>
          <span className="kicker">Preguntas frecuentes</span>
          <h1 className="display-xl text-4xl md:text-6xl mt-5">Todo lo esencial</h1>
        </FadeUp>
        <Parallax amount={18}>
          <QuestionScene className="w-full h-auto max-w-xs mx-auto" />
        </Parallax>
      </div>

      <FadeUp>
        <div className="mt-16">
          {FAQ.map(([q, a], i) => (
            <details key={q} className={`group py-6 ${i > 0 ? "hairline" : ""}`}>
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                <span className="font-display text-xl md:text-2xl text-white/85 group-open:text-white transition">
                  {q}
                </span>
                <span className="text-innia-accent text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">
                  +
                </span>
              </summary>
              <p className="text-white/65 mt-4 leading-relaxed max-w-2xl">{a}</p>
            </details>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
