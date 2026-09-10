export default {
  name: "fichaAprende",
  title: "Ficha (Aprende)",
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
    {
      name: "condicion",
      title: "Condición",
      type: "string",
      options: { list: ["TDAH", "TEA", "ambos"] },
    },
    {
      name: "bodyText",
      title: "Contenido (Markdown)",
      type: "text",
      rows: 20,
      description: "Material educativo. No incluir datos de estudiantes ni contenido diagnóstico.",
    },
    {
      name: "fuentes",
      title: "Fuentes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "fuente" }] }],
    },
  ],
  preview: { select: { title: "titulo", subtitle: "condicion" } },
};
