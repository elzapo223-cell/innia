import Link from "next/link";
import Reveal from "../components/Reveal.jsx";
import Probador from "../components/Probador.jsx";
import ModosTabs from "../components/ModosTabs.jsx";
import { getFuentes, getFichas } from "../lib/content.js";

const PILARES = [
  { icon: "🔒", t: "100% en tu computador", d: "El motor de IA funciona local. Ningún dato sale de tu equipo y trabaja sin internet." },
  { icon: "🙈", t: "Sin datos de estudiantes", d: "INNIA jamás pide nombres, diagnósticos ni información personal. Solo situaciones anónimas." },
  { icon: "🧭", t: "No diagnostica", d: "Es una herramienta pedagógica: da estrategias, no etiqueta ni receta tratamientos." },
  { icon: "📖", t: "Con fuentes", d: "Fundamentado en guías educativas y clínicas reputadas, citadas y verificables." },
];

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
      <section className="wrap pt-12 pb-8 grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 chip-spectrum rounded-full px-3.5 py-1.5 text-[12.5px] text-white/75">
            <span className="ribbon w-6" /> Educación inclusiva · TDAH y TEA
          </div>
          <h1 className="font-display font-semibold tracking-tight mt-4 text-4xl md:text-5xl leading-[1.08]">
            De <span className="text-white/55">“no sé cómo manejar esto”</span> a{" "}
            <span className="text-spectrum">“tengo estrategias que aplicar”</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl">
            INNIA es un asistente pedagógico para docentes. Estrategias prácticas para estudiantes con
            TDAH y TEA, funcionando <strong className="text-white/90">100% en tu computador</strong> y
            sin usar datos de tus estudiantes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-white/45">
            <span>Gratis</span> · <span>Privado</span> · <span>Funciona sin internet</span> ·{" "}
            <span>No diagnostica</span>
          </div>
        </div>

        <Reveal>
          <Probador />
        </Reveal>
      </section>

      {/* ---------- DEL PROBLEMA A LA ESTRATEGIA ---------- */}
      <section className="wrap py-14">
        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-10 text-center">
            <div className="ribbon w-12 mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl">
              El aula no espera. Tú tampoco deberías quedarte sin recursos.
            </h2>
            <p className="text-white/65 mt-3 max-w-2xl mx-auto">
              Muchos docentes no recibieron formación específica para acompañar a estudiantes con TDAH
              o TEA. INNIA convierte una situación cotidiana en estrategias concretas, en segundos, con
              respaldo de fuentes reputadas.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- MODOS ---------- */}
      <section className="wrap py-6">
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl">Cinco formas de ayudarte</h2>
            <p className="text-white/60 mt-2">Un mismo asistente, cinco maneras de acompañar tu clase.</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ModosTabs />
        </Reveal>
      </section>

      {/* ---------- PILARES ---------- */}
      <section className="wrap py-14">
        <Reveal>
          <h2 className="font-display text-3xl text-center mb-8">Diseñado para que confíes</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PILARES.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <div className="glass glass-hover rounded-2xl p-5 h-full">
                <div className="text-2xl">{p.icon}</div>
                <div className="font-semibold text-white/90 mt-2">{p.t}</div>
                <div className="text-[13.5px] text-white/60 mt-1">{p.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FUNDAMENTADO EN ---------- */}
      <section className="wrap py-8">
        <Reveal>
          <div className="glass rounded-3xl p-6 md:p-7 text-center">
            <div className="text-[12px] uppercase tracking-widest text-white/45">Fundamentado en</div>
            <div className="mt-4 flex flex-wrap gap-2.5 justify-center">
              {FUENTES_CLAVE.map((f) => (
                <span key={f} className="glass rounded-full px-4 py-1.5 text-[13px] text-white/80">
                  {f}
                </span>
              ))}
            </div>
            <p className="text-[12.5px] text-white/45 mt-4">
              Referencias educativas y clínicas usadas para fundamentar —no para diagnosticar.{" "}
              <Link href="/confianza" className="text-innia-accent hover:underline">
                Ver todas las fuentes
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- CÓMO EMPEZAR ---------- */}
      <section className="wrap py-14">
        <Reveal>
          <h2 className="font-display text-3xl text-center mb-8">Empezar toma minutos</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-3">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 80}>
              <div className="glass rounded-2xl p-6 h-full">
                <div className="font-display text-3xl text-spectrum">{p.n}</div>
                <div className="font-semibold mt-2">{p.t}</div>
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
            <h2 className="font-display text-3xl">Aprende sobre TDAH y TEA</h2>
            <Link href="/aprende" className="text-sm text-innia-accent hover:underline">
              Ver todo →
            </Link>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-3">
          {fichas.map((f, i) => (
            <Reveal key={f.id} delay={i * 80}>
              <Link href={`/aprende/${f.id}`} className="glass glass-hover rounded-2xl p-6 block h-full">
                <div className="text-[12px] text-innia-accent">{f.condicion}</div>
                <div className="font-display text-xl mt-1">{f.titulo}</div>
                <div className="text-[13.5px] text-white/55 mt-2">Leer ficha →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="wrap py-16">
        <Reveal>
          <div className="glass rounded-3xl p-10 text-center overflow-hidden relative">
            <div className="ribbon w-16 mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl">Empieza hoy a incluir mejor</h2>
            <p className="text-white/65 mt-3 max-w-xl mx-auto">
              Gratuito, privado y pensado para el aula real. Descárgalo e instálalo en minutos.
            </p>
            <Link
              href="/descargar"
              className="inline-block mt-6 rounded-xl px-7 py-3.5 font-medium bg-innia-accent/25 border border-innia-accent/40 hover:bg-innia-accent/35 transition"
            >
              Descargar INNIA
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
