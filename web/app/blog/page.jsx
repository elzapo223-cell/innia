import Link from "next/link";
import { getArticulos } from "../../lib/content.js";

export const metadata = { title: "Blog y novedades · INNIA" };

export default async function Blog() {
  const articulos = await getArticulos();
  return (
    <div className="wrap py-12">
      <h1 className="font-display text-4xl">Blog y novedades</h1>
      <p className="text-white/65 mt-2 max-w-2xl">
        Artículos, recursos y notas de versión de INNIA.
      </p>

      {articulos.length === 0 ? (
        <div className="glass rounded-2xl p-6 mt-6 text-white/60">
          Aún no hay artículos publicados. El blog se gestiona desde Sanity; cuando se conecte el
          proyecto y se publiquen entradas, aparecerán aquí.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-3 mt-6">
          {articulos.map((a) => (
            <Link key={a.id} href={`/blog/${a.id}`} className="glass glass-hover rounded-2xl p-5 block">
              <div className="text-[12px] text-white/45">{a.fecha}</div>
              <div className="text-lg font-semibold mt-1">{a.titulo}</div>
              <div className="text-[13.5px] text-white/60 mt-1">{a.resumen}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
