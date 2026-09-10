export const metadata = { title: "Descargar · INNIA" };

const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || null;

const REQUISITOS = [
  ["Sistema", "Windows 10 u 11 (64 bits)"],
  ["RAM", "8 GB mínimo · 16 GB recomendado para el modelo de mejor calidad"],
  ["Espacio", "~5 GB (app + modelo local, se descarga una sola vez)"],
  ["Internet", "Solo para instalar; luego funciona sin conexión"],
];

const PASOS = [
  "Descarga el instalador (.exe) y ejecútalo.",
  "Abre INNIA. La primera vez te guiará para instalar el motor local (Ollama).",
  "INNIA descargará el modelo adecuado a tu equipo con una barra de progreso.",
  "Listo: empieza a consultar. A partir de aquí funciona sin internet.",
];

export default function Descargar() {
  return (
    <div className="wrap py-12">
      <h1 className="font-display text-4xl">Descargar INNIA</h1>
      <p className="text-white/65 mt-2 max-w-2xl">
        Gratuito y privado. Por ahora disponible para <strong className="text-white/90">Windows</strong>.
      </p>

      <div className="glass rounded-2xl p-6 mt-6 flex flex-col items-start gap-3">
        {DOWNLOAD_URL ? (
          <a
            href={DOWNLOAD_URL}
            className="rounded-xl px-6 py-3 font-medium bg-innia-accent/25 border border-innia-accent/40 hover:bg-innia-accent/35"
          >
            Descargar para Windows (.exe)
          </a>
        ) : (
          <div className="rounded-xl px-4 py-3 border border-amber-400/30 text-amber-200/90 text-sm">
            El enlace de descarga se publicará aquí cuando esté la primera versión en GitHub Releases.
            (Configura <code>NEXT_PUBLIC_DOWNLOAD_URL</code> para activarlo.)
          </div>
        )}
        <div className="text-[12.5px] text-white/50">
          Al instalar, se descargará también el motor local Ollama y un modelo de IA.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Requisitos</h2>
          <dl className="mt-3 space-y-2 text-[14px]">
            {REQUISITOS.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="w-24 shrink-0 text-white/55">{k}</dt>
                <dd className="text-white/80">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Instalación en 4 pasos</h2>
          <ol className="mt-3 space-y-2 text-[14px] list-decimal ml-5 text-white/80">
            {PASOS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
