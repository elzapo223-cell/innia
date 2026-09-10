import Link from "next/link";
import { notFound } from "next/navigation";
import { getFicha, getFichas } from "../../../lib/content.js";
import { renderMarkdown } from "../../../lib/markdown.js";

export async function generateStaticParams() {
  const fichas = await getFichas();
  return fichas.map((f) => ({ slug: f.id }));
}

export async function generateMetadata({ params }) {
  const f = await getFicha(params.slug);
  return { title: f ? `${f.titulo} · INNIA` : "Ficha · INNIA" };
}

export default async function FichaPage({ params }) {
  const ficha = await getFicha(params.slug);
  if (!ficha) notFound();
  return (
    <article className="wrap-narrow py-24">
      <Link href="/aprende" className="link-arrow text-[13px] text-white/50">
        <span aria-hidden>←</span> Aprende
      </Link>
      <div className="mt-8 pb-8 hairline" style={{ borderTop: "none", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <span className="text-[12px] uppercase tracking-widest text-innia-accent">{ficha.condicion}</span>
        <h1 className="display-xl text-3xl md:text-5xl mt-3">{ficha.titulo}</h1>
      </div>
      <div
        className="prose-innia mt-8 text-white/85 text-[15.5px]"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(ficha.body) }}
      />
    </article>
  );
}
