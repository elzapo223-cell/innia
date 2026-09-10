import Link from "next/link";
import { getArticulos } from "../../lib/content.js";
import { FadeUp, Stagger, Item } from "../../components/Anim.jsx";

export const metadata = { title: "Blog y novedades · INNIA" };

export default async function Blog() {
  const articulos = await getArticulos();
  return (
    <div className="wrap py-24">
      <FadeUp>
        <span className="kicker">Blog y novedades</span>
        <h1 className="display-xl text-4xl md:text-6xl mt-5">Artículos y notas de versión</h1>
      </FadeUp>

      {articulos.length === 0 ? (
        <FadeUp>
          <p className="mt-12 text-white/55 max-w-2xl leading-relaxed">
            Aún no hay artículos publicados. El blog se gestiona desde Sanity; cuando se conecte el
            proyecto y se publiquen entradas, aparecerán aquí.
          </p>
        </FadeUp>
      ) : (
        <Stagger className="mt-14">
          {articulos.map((a) => (
            <Item key={a.id}>
              <Link href={`/blog/${a.id}`} className="group block py-7 hairline">
                <div className="text-[12px] text-white/45">{a.fecha}</div>
                <div className="font-display text-2xl md:text-3xl text-white/85 group-hover:text-white transition mt-1">
                  {a.titulo}
                </div>
                <div className="text-white/60 mt-2 max-w-2xl">{a.resumen}</div>
              </Link>
            </Item>
          ))}
        </Stagger>
      )}
    </div>
  );
}
