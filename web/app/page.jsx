import Link from "next/link";
import Probador from "../components/Probador.jsx";
import ModosTabs from "../components/ModosTabs.jsx";
import { FadeUp, Stagger, Item, Magnetic } from "../components/Anim.jsx";
import { IconLock, IconShield, IconCompass, IconBook } from "../components/Icons.jsx";
import { getFichas, getFuentes } from "../lib/content.js";

const PILARES = [
  { Icon: IconLock, t: "100% local", d: "El motor corre en tu computador. Nada sale de tu equipo y funciona sin internet." },
  { Icon: IconShield, t: "Sin datos de estudiantes", d: "Nunca pide nombres ni diagnósticos. Solo situaciones anónimas." },
  { Icon: IconCompass, t: "No diagnostica", d: "Da estrategias pedagógicas; no etiqueta ni receta tratamientos." },
  { Icon: IconBook, t: "Fundamentado", d: "Cada estrategia se apoya en guías reputadas, citadas y verificables." },
];

const PASOS = [
  { n: "01", t: "Descarga e instala", d: "Un instalador para Windows. Doble clic y listo." },
  { n: "02", t: "Prepara el motor", d: "La primera vez, INNIA instala Ollama y baja el modelo." },
  { n: "03", t: "Consulta sin límites", d: "Escribe una situación y recibe estrategias. Sin internet." },
];

const FUENTES_LABELS = [
  { label: "DUA · CAST", id: "cast-udl-guidelines" },
  { label: "CDC", id: "cdc-adhd-classroom" },
  { label: "NICE", id: "nice-ng87-adhd" },
  { label: "DSM-5-TR", id: "dsm-5-tr-apa" },
  { label: "CIE-11", id: "who-icd-11" },
  { label: "Autismo España", id: "autismo-espana" },
  { label: "Understood", id: "understood-udl" },
  { label: "CHADD", id: "chadd-educators" },
];

export default async function Home() {
  const fichas = await getFichas();
  const fuentesById = Object.fromEntries(getFuentes().map((f) => [f.id, f]));
  const fuentes = FUENTES_LABELS.map((x) => ({ ...x, url: fuentesById[x.id]?.url })).filter((x) => x.url);

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="wrap pt-16 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div>
          <FadeUp>
            <span className="kicker">Educación inclusiva · TDAH y TEA</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="display-xl mt-6 text-[2.7rem] md:text-[4rem]">
              De <span className="text-white/45">“no sé cómo manejar esto”</span>
              <br />a <span className="text-spectrum">“tengo estrategias”</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 text-white/65 text-lg leading-relaxed max-w-xl">
              El asistente pedagógico para docentes. Estrategias prácticas para estudiantes con TDAH y
              TEA, funcionando <span className="text-white/90">en tu computador</span> y sin usar datos
              de tus estudiantes.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/descargar"
                  className="inline-block rounded-full px-7 py-3.5 font-medium text-[#0a0e1a] bg-gradient-to-r from-[#6ea8fe] to-[#a78bfa] hover:brightness-110 transition"
                >
                  Descargar para Windows
                </Link>
              </Magnetic>
              <Link href="/como-funciona" className="link-arrow text-white/80 px-3 py-3.5">
                Cómo funciona <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div className="mt-8 text-[12.5px] text-white/40 tracking-wide">
              Gratis &nbsp;·&nbsp; Privado &nbsp;·&nbsp; Sin internet &nbsp;·&nbsp; No diagnostica
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <Probador />
        </FadeUp>
      </section>

      {/* ---------- TRANSFORMACIÓN (a pantalla, sin caja) ---------- */}
      <section className="wrap py-32 text-center">
        <FadeUp>
          <p className="text-white/40 text-lg md:text-xl">Muchos docentes nunca recibieron formación específica.</p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="display-xl mt-4 text-[2.2rem] md:text-[3.4rem] max-w-4xl mx-auto">
            INNIA convierte una situación del aula en{" "}
            <span className="text-spectrum">estrategias concretas</span>, en segundos.
          </h2>
        </FadeUp>
      </section>

      {/* ---------- MODOS ---------- */}
      <section className="wrap py-24">
        <FadeUp>
          <div className="mb-12">
            <span className="kicker">Un asistente, cinco modos</span>
            <h2 className="display-xl text-3xl md:text-5xl mt-4">Cinco formas de ayudarte</h2>
          </div>
        </FadeUp>
        <ModosTabs />
      </section>

      {/* ---------- PILARES (fila con divisores, sin cajas) ---------- */}
      <section className="wrap py-24">
        <FadeUp>
          <div className="mb-12 max-w-2xl">
            <span className="kicker">Por qué confiar</span>
            <h2 className="display-xl text-3xl md:text-5xl mt-4">Una base de confianza, no de promesas</h2>
          </div>
        </FadeUp>
        <Stagger className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {PILARES.map((p) => (
            <Item key={p.t}>
              <p.Icon width={26} height={26} className="text-innia-accent" />
              <h3 className="font-display text-xl mt-5">{p.t}</h3>
              <p className="text-[13.5px] text-white/55 mt-2 leading-relaxed max-w-[260px]">{p.d}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      {/* ---------- FUNDAMENTADO EN (marquee) ---------- */}
      <section className="py-24">
        <div className="wrap text-center mb-7">
          <span className="kicker" style={{ color: "rgba(255,255,255,0.82)" }}>
            Fundamentado en fuentes reputadas
          </span>
        </div>
        <div className="marquee">
          <div className="marquee__track">
            {[...fuentes, ...fuentes].map((f, i) => (
              <a
                key={i}
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-12 font-display text-2xl md:text-3xl text-white/30 hover:text-white transition-colors"
              >
                {f.label} <span className="text-innia-accent/40 text-base">◆</span>
              </a>
            ))}
          </div>
        </div>
        <div className="wrap text-center mt-7">
          <Link href="/confianza" className="link-arrow text-[13px] text-white/50">
            Ver todas las fuentes <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ---------- PASOS (timeline) ---------- */}
      <section className="wrap py-24">
        <FadeUp>
          <div className="mb-14 text-center">
            <span className="kicker">En minutos</span>
            <h2 className="display-xl text-3xl md:text-5xl mt-4">Empezar es simple</h2>
          </div>
        </FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-y-10">
          {PASOS.map((p) => (
            <Item key={p.n} className="text-center px-4">
              <div className="font-display text-5xl text-spectrum">{p.n}</div>
              <div className="font-display text-xl mt-4">{p.t}</div>
              <div className="text-[13.5px] text-white/55 mt-2 max-w-[260px] mx-auto">{p.d}</div>
            </Item>
          ))}
        </Stagger>
      </section>

      {/* ---------- APRENDE (lista editorial) ---------- */}
      <section className="wrap py-24">
        <FadeUp>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="kicker">Contenido educativo</span>
              <h2 className="display-xl text-3xl md:text-5xl mt-4">Aprende sobre TDAH y TEA</h2>
            </div>
            <Link href="/aprende" className="link-arrow text-sm text-white/60 shrink-0">
              Ver todo <span aria-hidden>→</span>
            </Link>
          </div>
        </FadeUp>
        <Stagger>
          {fichas.map((f) => (
            <Item key={f.id}>
              <Link href={`/aprende/${f.id}`} className="group flex items-baseline gap-5 py-6 hairline">
                <span className="text-innia-accent text-[12px] uppercase tracking-widest w-16 shrink-0">
                  {f.condicion}
                </span>
                <span className="font-display text-2xl md:text-3xl text-white/85 group-hover:text-white transition flex-1">
                  {f.titulo}
                </span>
                <span className="link-arrow text-white/40 group-hover:text-innia-accent" aria-hidden>→</span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="wrap py-32 text-center glow">
        <FadeUp>
          <h2 className="display-xl text-[2.4rem] md:text-[3.6rem] max-w-3xl mx-auto">
            Empieza hoy a <span className="text-spectrum">incluir mejor</span>
          </h2>
          <p className="text-white/60 mt-5 max-w-xl mx-auto text-lg">
            Gratuito, privado y pensado para el aula real.
          </p>
          <div className="mt-9">
            <Magnetic>
              <Link
                href="/descargar"
                className="inline-block rounded-full px-9 py-4 font-medium text-[#0a0e1a] bg-gradient-to-r from-[#6ea8fe] to-[#a78bfa] hover:brightness-110 transition"
              >
                Descargar INNIA
              </Link>
            </Magnetic>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
