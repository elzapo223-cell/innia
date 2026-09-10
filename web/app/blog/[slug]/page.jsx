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
    <article className="wrap-narrow py-12">
      <Link href="/blog" className="text-[13px] text-white/50 hover:text-white/80">
        ← Blog
      </Link>
      <div className="glass rounded-2xl p-6 md:p-8 mt-3">
        <div className="text-[12px] text-white/45">{a.fecha}</div>
        <h1 className="text-2xl md:text-3xl font-bold mt-1">{a.titulo}</h1>
        <div
          className="prose-innia mt-4 text-white/85"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(a.body) }}
        />
      </div>
    </article>
  );
}
