import Link from "next/link";
import { getFichas, getEstrategias } from "../../lib/content.js";
import AprendeFiltro from "../../components/AprendeFiltro.jsx";
import { FadeUp, Stagger, Item } from "../../components/Anim.jsx";

export const metadata = { title: "Aprende · INNIA" };

export default async function Aprende() {
  const fichas = await getFichas();
  const estrategias = getEstrategias();

  return (
    <div className="wrap py-24">
      <FadeUp>
        <span className="kicker">Contenido educativo</span>
        <h1 className="display-xl text-4xl md:text-6xl mt-5 max-w-3xl">Aprende sobre TDAH y TEA</h1>
        <p className="mt-6 text-white/65 text-lg max-w-2xl leading-relaxed">
          Información educativa sobre TDAH y TEA en el aula, y estrategias por área. Material
          educativo con fuentes públicas — no reemplaza el criterio de un profesional.
        </p>
      </FadeUp>

      {/* Fichas */}
      <div className="mt-20">
        <FadeUp>
          <span className="kicker">Fichas</span>
        </FadeUp>
        <Stagger className="mt-6">
          {fichas.map((f) => (
            <Item key={f.id}>
              <Link href={`/aprende/${f.id}`} className="group flex items-baseline gap-5 py-6 hairline">
                <span className="text-innia-accent text-[12px] uppercase tracking-widest w-16 shrink-0">
                  {f.condicion}
                </span>
                <span className="font-display text-2xl md:text-3xl text-white/85 group-hover:text-white transition flex-1">
                  {f.titulo}
                </span>
                <span className="text-white/40 group-hover:text-innia-accent transition shrink-0" aria-hidden>→</span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>

      {/* Estrategias con filtro */}
      <div className="mt-24 pt-14 hairline">
        <FadeUp>
          <span className="kicker">Estrategias por área</span>
          <h2 className="display-xl text-2xl md:text-4xl mt-5 mb-10">Filtra por condición y área</h2>
        </FadeUp>
        <AprendeFiltro estrategias={estrategias} />
      </div>
    </div>
  );
}
