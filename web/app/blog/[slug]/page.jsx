import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticulo, getArticulos } from "../../../lib/content.js";
import { renderMarkdown } from "../../../lib/markdown.js";

export async function generateStaticParams() {
  const arts = await getArticulos();
  return arts.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }) {
  const a = await getArticulo(params.slug);
  return { title: a ? `${a.titulo} · INNIA` : "Artículo · INNIA" };
}

export default async function ArticuloPage({ params }) {
  const a = await getArticulo(params.slug);
  if (!a) notFound();
  return (
    <article className="wrap-narrow py-24">
      <Link href="/blog" className="link-arrow text-[13px] text-white/50">
        <span aria-hidden>←</span> Blog
      </Link>
      <div className="mt-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <span className="text-[12px] text-white/45">{a.fecha}</span>
        <h1 className="display-xl text-3xl md:text-5xl mt-3">{a.titulo}</h1>
      </div>
      <div
        className="prose-innia mt-8 text-white/85 text-[15.5px]"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(a.body) }}
      />
    </article>
  );
}
