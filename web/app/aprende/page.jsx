import Link from "next/link";
import { getFichas, getEstrategias } from "../../lib/content.js";
import AprendeFiltro from "../../components/AprendeFiltro.jsx";

export const metadata = { title: "Aprende · INNIA" };

export default async function Aprende() {
  const fichas = await getFichas();
  const estrategias = getEstrategias();

  return (
    <div className="wrap py-12">
      <h1 className="font-display text-4xl">Aprende</h1>
      <p className="text-white/65 mt-2 max-w-2xl">
        Información educativa sobre TDAH y TEA en el aula, y estrategias por área. Material
        educativo con fuentes públicas — no reemplaza el criterio de un profesional.
      </p>

      <h2 className="font-display text-2xl mt-10 mb-3">Fichas</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {fichas.map((f) => (
          <Link key={f.id} href={`/aprende/${f.id}`} className="glass glass-hover rounded-2xl p-5 block">
            <div className="text-[12px] text-innia-accent">{f.condicion}</div>
            <div className="font-display text-xl mt-1">{f.titulo}</div>
            <div className="text-[13px] text-white/55 mt-1">Leer ficha →</div>
          </Link>
        ))}
      </div>

      <h2 className="font-display text-2xl mt-12 mb-4">Estrategias por área</h2>
      <AprendeFiltro estrategias={estrategias} />
    </div>
  );
}
