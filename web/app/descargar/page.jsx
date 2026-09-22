import { FadeUp, Stagger, Item, Magnetic } from "../../components/Anim.jsx";
import { AppWindow, DeviceLocal } from "../../components/Art.jsx";
import { Parallax } from "../../components/AnimatedArt.jsx";

export const metadata = { title: "Descargar · INNIA" };

const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL ||
  "https://github.com/elzapo223-cell/innia/releases/download/v0.1.1/INNIA-Windows-x64.zip";

const REQUISITOS = [
  ["Sistema", "Windows 10 u 11 (64 bits)"],
  ["RAM", "8 GB mínimo · 16 GB recomendado para el modelo de mejor calidad"],
  ["Espacio", "~5 GB (app + modelo local, se descarga una sola vez)"],
  ["Internet", "Solo para instalar; luego funciona sin conexión"],
];

const PASOS = [
  ["01", "Descarga el .zip, descomprímelo y ejecuta INNIA.exe (dentro de la carpeta)."],
  ["02", "Abre INNIA. La primera vez te guía para instalar el motor local (Ollama)."],
  ["03", "INNIA descarga el modelo adecuado a tu equipo, con barra de progreso."],
  ["04", "Listo: empieza a consultar. A partir de aquí funciona sin internet."],
];

export default function Descargar() {
  return (
    <div className="wrap py-24">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
      <FadeUp>
        <span className="kicker">Descargar</span>
        <h1 className="display-xl text-4xl md:text-6xl mt-5">INNIA para Windows</h1>
        <p className="mt-6 text-white/65 text-lg max-w-2xl leading-relaxed">
          Gratuito y privado. El motor de IA se instala y corre en tu propio equipo.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          {DOWNLOAD_URL ? (
            <Magnetic>
              <a
                href={DOWNLOAD_URL}
                className="inline-block rounded-full px-8 py-4 font-medium text-[#0a0e1a] bg-gradient-to-r from-[#6ea8fe] to-[#a78bfa] hover:brightness-110 transition"
              >
                Descargar para Windows (.zip)
              </a>
            </Magnetic>
          ) : (
            <span className="text-amber-200/90 text-sm border-b border-amber-400/30 pb-1">
              El enlace de descarga se publicará aquí con la primera versión.
            </span>
          )}
          <span className="text-[13px] text-white/45">
            Al instalar se descarga también el motor local (Ollama) y el modelo de IA.
          </span>
        </div>
      </FadeUp>
        <Parallax amount={24}>
          <AppWindow className="w-full h-auto max-w-md mx-auto" />
        </Parallax>
      </div>

      {/* Requisitos */}
      <FadeUp>
        <div className="mt-24 pt-14 hairline grid lg:grid-cols-[1fr_0.6fr] gap-10 items-center">
          <div>
          <span className="kicker">Requisitos</span>
          <dl className="mt-8">
            {REQUISITOS.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[7rem_1fr] md:grid-cols-[10rem_1fr] gap-4 py-5 ${i > 0 ? "hairline" : ""}`}>
                <dt className="text-white/50">{k}</dt>
                <dd className="text-white/85">{v}</dd>
              </div>
            ))}
          </dl>
          </div>
          <Parallax amount={22}>
            <DeviceLocal className="w-full h-auto max-w-xs mx-auto" />
          </Parallax>
        </div>
      </FadeUp>

      {/* Instalación */}
      <div className="mt-24 pt-14 hairline">
        <FadeUp>
          <span className="kicker">Instalación</span>
          <h2 className="display-xl text-2xl md:text-4xl mt-5 mb-10">En cuatro pasos</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          {PASOS.map(([n, t]) => (
            <Item key={n}>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-4xl text-spectrum shrink-0">{n}</span>
                <p className="text-white/80 text-lg leading-relaxed">{t}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
