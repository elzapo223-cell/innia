export default {
  name: "articuloBlog",
  title: "Artículo (Blog)",
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
    { name: "fecha", title: "Fecha", type: "date", options: { dateFormat: "YYYY-MM-DD" } },
    { name: "resumen", title: "Resumen", type: "text", rows: 2 },
    { name: "bodyText", title: "Contenido (Markdown)", type: "text", rows: 20 },
  ],
  orderings: [{ title: "Fecha (reciente)", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: { select: { title: "titulo", subtitle: "fecha" } },
};
