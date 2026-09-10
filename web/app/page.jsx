import Link from "next/link";
import Reveal from "../components/Reveal.jsx";
import Probador from "../components/Probador.jsx";
import ModosTabs from "../components/ModosTabs.jsx";
import { IconLock, IconShield, IconCompass, IconBook, IconWifiOff } from "../components/Icons.jsx";
import { getFichas } from "../lib/content.js";

const PASOS = [
  { n: "01", t: "Descarga e instala", d: "Un instalador para Windows. Doble clic y listo." },
  { n: "02", t: "Prepara el motor local", d: "La primera vez, INNIA instala Ollama y baja el modelo con una barra de progreso." },
  { n: "03", t: "Consulta sin límites", d: "Escribe una situación del aula y recibe estrategias. Desde aquí, funciona sin internet." },
];

const FUENTES_CLAVE = ["DUA · CAST", "CDC", "NICE", "DSM-5-TR", "CIE-11", "Autismo España"];

export default async function Home() {
  const fichas = await getFichas();

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="wrap pt-12 pb-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div>
          <span className="eyebrow">Educación inclusiva · TDAH y TEA</span>
          <h1 className="font-display font-semibold tracking-tight mt-4 text-4xl md:text-[3.4rem] leading-[1.05]">
            De <span className="text-white/55">“no sé cómo manejar esto”</span> a{" "}
            <span className="text-spectrum">“tengo estrategias que aplicar”</span>
          </h1>
          <p className="mt-5 text-white/70 text-lg max-w-xl">
            INNIA es un asistente pedagógico para docentes. Estrategias prácticas para estudiantes con
            TDAH y TEA, funcionando <strong className="text-white/90">100% en tu computador</strong> y
            sin usar datos de tus estudiantes.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/descargar"
              className="rounded-xl px-6 py-3 font-medium bg-innia-accent/25 border border-innia-accent/40 hover:bg-innia-accent/35 transition"
            >
              Descargar para Windows
            </Link>
            <Link href="/como-funciona" className="rounded-xl px-6 py-3 font-medium glass glass-hover">
              Cómo funciona
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[12.5px] text-white/45">
            <span>Gratis</span> · <span>Privado</span> · <span>Funciona sin internet</span> ·{" "}
            <span>No diagnostica</span>
          </div>
        </div>

        <Reveal>
          <Probador />
        </Reveal>
      </section>

      {/* ---------- PROBLEMA → ESTRATEGIA (asimétrico) ---------- */}
      <section className="wrap py-14">
        <Reveal>
          <div className="card-spectrum p-8 md:p-10 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div>
              <span className="eyebrow">El día a día del aula</span>
              <h2 className="font-display text-2xl md:text-[2rem] leading-tight mt-4">
                El aula no espera. Tú tampoco deberías quedarte sin recursos.
              </h2>
              <p className="text-white/65 mt-3">
                Muchos docentes no recibieron formación específica para acompañar a estudiantes con
                TDAH o TEA. INNIA convierte una situación cotidiana en estrategias concretas, en
                segundos, con respaldo de fuentes reputadas.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 text-white/60">
                “No sé cómo manejar esto.”
              </div>
              <div className="self-center text-spectrum text-2xl">↓</div>
              <div className="card-spectrum px-4 py-3 text-white/90 font-medium">
                “Tengo varias estrategias que puedo aplicar hoy.”
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- MODOS ---------- */}
      <section className="wrap py-6">
        <Reveal>
          <div className="text-center mb-8">
            <span className="eyebrow">Un asistente, cinco modos</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">Cinco formas de ayudarte</h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ModosTabs />
        </Reveal>
      </section>

      {/* ---------- PILARES (bento) ---------- */}
      <section className="wrap py-16">
        <Reveal>
          <div className="text-center mb-8">
            <span className="eyebrow">Por qué confiar</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">Diseñado para que confíes</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-3 auto-rows-fr">
          {/* Tile grande: privado/local */}
          <Reveal className="md:col-span-2">
            <div className="card-spectrum p-7 h-full flex flex-col justify-between glow">
              <div>
                <span className="icon-tile"><IconLock /></span>
                <h3 className="font-display text-2xl mt-4">Privado por diseño: 100% en tu computador</h3>
                <p className="text-white/65 mt-2 max-w-lg">
                  El motor de IA funciona localmente con Ollama. Ningún dato sale de tu equipo y, una
                  vez instalado, INNIA trabaja sin conexión a internet.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2 text-[13px] text-white/55">
                <IconWifiOff width={18} height={18} /> Funciona sin internet
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="glass glass-hover rounded-2xl p-6 h-full">
              <span className="icon-tile"><IconShield /></span>
              <h3 className="font-semibold text-white/90 mt-4">Sin datos de estudiantes</h3>
              <p className="text-[13.5px] text-white/60 mt-1">
                Nunca pide nombres, diagnósticos ni información personal. Solo situaciones anónimas.
              </p>
            </div>
          </Reveal>

          <Reveal delay={40}>
            <div className="glass glass-hover rounded-2xl p-6 h-full">
              <span className="icon-tile"><IconCompass /></span>
              <h3 className="font-semibold text-white/90 mt-4">No diagnostica</h3>
              <p className="text-[13.5px] text-white/60 mt-1">
                Es una herramienta pedagógica: da estrategias, no etiqueta ni receta tratamientos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="glass glass-hover rounded-2xl p-6 h-full md:col-span-2">
              <span className="icon-tile"><IconBook /></span>
              <h3 className="font-semibold text-white/90 mt-4">Fundamentado y verificable</h3>
              <p className="text-[13.5px] text-white/60 mt-1">
                Cada estrategia se apoya en guías educativas y clínicas reputadas, citadas y abiertas
                a consulta.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FUNDAMENTADO EN ---------- */}
      <section className="wrap py-6">
        <Reveal>
          <div className="glass rounded-3xl p-7 md:p-8 text-center">
            <span className="eyebrow">Fundamentado en</span>
            <div className="mt-5 flex flex-wrap gap-2.5 justify-center">
              {FUENTES_CLAVE.map((f) => (
                <span key={f} className="chip-spectrum rounded-full px-4 py-1.5 text-[13px] text-white/85">
                  {f}
                </span>
              ))}
            </div>
            <p className="text-[12.5px] text-white/45 mt-5">
              Referencias educativas y clínicas usadas para fundamentar —no para diagnosticar.{" "}
              <Link href="/confianza" className="text-innia-accent hover:underline">
                Ver todas las fuentes
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- CÓMO EMPEZAR (secuencia conectada) ---------- */}
      <section className="wrap py-16">
        <Reveal>
          <div className="text-center mb-10">
            <span className="eyebrow">En minutos</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">Empezar es simple</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4 steps-line">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <div className="text-center px-2">
                <div className="mx-auto w-[52px] h-[52px] rounded-2xl grid place-items-center card-spectrum font-display text-xl text-spectrum">
                  {p.n}
                </div>
                <div className="font-semibold mt-4">{p.t}</div>
                <div className="text-[13.5px] text-white/60 mt-1">{p.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- APRENDE PREVIEW ---------- */}
      <section className="wrap py-6">
        <Reveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="eyebrow">Contenido educativo</span>
              <h2 className="font-display text-3xl md:text-4xl mt-3">Aprende sobre TDAH y TEA</h2>
            </div>
            <Link href="/aprende" className="text-sm text-innia-accent hover:underline shrink-0">
              Ver todo →
            </Link>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-3">
          {fichas.map((f, i) => (
            <Reveal key={f.id} delay={i * 80}>
              <Link href={`/aprende/${f.id}`} className="card-spectrum p-6 block h-full glass-hover">
                <div className="flex items-center gap-3">
                  <span className="icon-tile !w-9 !h-9 !rounded-xl"><IconBook width={18} height={18} /></span>
                  <div className="text-[12px] text-innia-accent">{f.condicion}</div>
                </div>
                <div className="font-display text-xl mt-3">{f.titulo}</div>
                <div className="text-[13.5px] text-white/55 mt-2">Leer ficha →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="wrap py-16">
        <Reveal>
          <div className="card-spectrum glow p-10 md:p-12 text-center">
            <div className="ribbon w-16 mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight">
              Empieza hoy a incluir mejor
            </h2>
            <p className="text-white/65 mt-3 max-w-xl mx-auto">
              Gratuito, privado y pensado para el aula real. Descárgalo e instálalo en minutos.
            </p>
            <Link
              href="/descargar"
              className="inline-block mt-7 rounded-xl px-8 py-3.5 font-medium bg-innia-accent/25 border border-innia-accent/40 hover:bg-innia-accent/35 transition"
            >
              Descargar INNIA
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
