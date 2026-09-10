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
    <article className="wrap-narrow py-12">
      <Link href="/aprende" className="text-[13px] text-white/50 hover:text-white/80">
        ← Aprende
      </Link>
      <div className="glass rounded-2xl p-6 md:p-8 mt-3">
        <div className="text-[12px] text-innia-accent">{ficha.condicion}</div>
        <h1 className="text-2xl md:text-3xl font-bold mt-1">{ficha.titulo}</h1>
        <div
          className="prose-innia mt-4 text-white/85"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(ficha.body) }}
        />
      </div>
    </article>
  );
}
