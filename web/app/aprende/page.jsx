import Link from "next/link";
import { getFichas, getEstrategias } from "../../lib/content.js";
import AprendeFiltro from "../../components/AprendeFiltro.jsx";
import { FadeUp, Stagger, Item } from "../../components/Anim.jsx";
import { MOTIF_BY_CONDICION, LearnScene, StrategiesScene } from "../../components/Art.jsx";
import { Parallax } from "../../components/AnimatedArt.jsx";

export const metadata = { title: "Aprende · INNIA" };

export default async function Aprende() {
  const fichas = await getFichas();
  const estrategias = getEstrategias();

  return (
    <div className="wrap py-24">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <FadeUp>
          <span className="kicker">Contenido educativo</span>
          <h1 className="display-xl text-4xl md:text-6xl mt-5">Aprende sobre TDAH y TEA</h1>
          <p className="mt-6 text-white/65 text-lg max-w-2xl leading-relaxed">
            Información educativa sobre TDAH y TEA en el aula, y estrategias por área. Material
            educativo con fuentes públicas — no reemplaza el criterio de un profesional.
          </p>
        </FadeUp>
        <Parallax amount={22}>
          <LearnScene className="w-full h-auto max-w-md mx-auto" />
        </Parallax>
      </div>

      {/* Fichas */}
      <div className="mt-20">
        <FadeUp>
          <span className="kicker">Fichas</span>
        </FadeUp>
        <Stagger className="mt-6">
          {fichas.map((f) => {
            const Motif = MOTIF_BY_CONDICION[f.condicion] || MOTIF_BY_CONDICION.ambos;
            return (
              <Item key={f.id}>
                <Link href={`/aprende/${f.id}`} className="group flex items-center gap-5 py-5 hairline">
                  <span className="w-24 md:w-28 shrink-0 rounded-xl overflow-hidden glass">
                    <Motif className="w-full h-auto block" />
                  </span>
                  <span className="text-innia-accent text-[12px] uppercase tracking-widest w-16 shrink-0 hidden sm:block">
                    {f.condicion}
                  </span>
                  <span className="font-display text-2xl md:text-3xl text-white/85 group-hover:text-white transition flex-1">
                    {f.titulo}
                  </span>
                  <span className="text-white/40 group-hover:text-innia-accent transition shrink-0" aria-hidden>→</span>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </div>

      {/* Estrategias con filtro */}
      <div className="mt-24 pt-14 hairline">
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-10 items-center mb-10">
          <FadeUp>
            <span className="kicker">Estrategias por área</span>
            <h2 className="display-xl text-2xl md:text-4xl mt-5">Filtra por condición y área</h2>
            <p className="text-white/60 mt-3 max-w-md">
              Explora estrategias concretas por condición y por área del aula, con sus fuentes.
            </p>
          </FadeUp>
          <Parallax amount={20}>
            <StrategiesScene className="w-full h-auto max-w-sm mx-auto" />
          </Parallax>
        </div>
        <AprendeFiltro estrategias={estrategias} />
      </div>
    </div>
  );
}
