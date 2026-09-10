export const metadata = { title: "Preguntas frecuentes · INNIA" };

const FAQ = [
  ["¿INNIA es gratis?", "Sí. La app es gratuita y el motor de IA que usa (Ollama) también."],
  [
    "¿Necesito internet?",
    "Solo para instalar la app y descargar el modelo la primera vez. Después funciona sin conexión.",
  ],
  [
    "¿Guarda datos de mis estudiantes?",
    "No. INNIA no pide ni almacena datos personales. Trabaja con situaciones anónimas y todo ocurre en tu computador.",
  ],
  [
    "¿Qué computador necesito?",
    "Windows 10/11 de 64 bits. Con 8 GB de RAM funciona; con 16 GB usa un modelo de mejor calidad. Necesita ~5 GB de espacio.",
  ],
  [
    "¿INNIA diagnostica a un estudiante?",
    "No, y nunca lo hará. Es una herramienta pedagógica que da estrategias. El diagnóstico corresponde a profesionales de la salud.",
  ],
  [
    "¿De dónde salen las estrategias?",
    "De fuentes públicas reputadas y marcos educativos y clínicos de referencia (DUA/CAST, CDC, NICE, DSM-5-TR, CIE-11, entre otros), citadas en la sección Confianza.",
  ],
  [
    "¿Habrá versión para Mac o celular?",
    "Por ahora INNIA es para Windows. Otras plataformas se evaluarán más adelante.",
  ],
];

export default function Faq() {
  return (
    <div className="wrap-narrow py-12">
      <h1 className="font-display text-4xl">Preguntas frecuentes</h1>
      <div className="mt-6 space-y-3">
        {FAQ.map(([q, a]) => (
          <details key={q} className="glass rounded-2xl p-5">
            <summary className="cursor-pointer font-medium text-white/90">{q}</summary>
            <p className="text-[14px] text-white/65 mt-2">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
