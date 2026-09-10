export default {
  name: "paginaLegal",
  title: "Página (legal / informativa)",
  type: "document",
  fields: [
    { name: "titulo", title: "Título", type: "string", validation: (r) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titulo", maxLength: 96 },
      validation: (r) => r.required(),
    },
    { name: "bodyText", title: "Contenido (Markdown)", type: "text", rows: 20 },
  ],
  preview: { select: { title: "titulo", subtitle: "slug.current" } },
};
