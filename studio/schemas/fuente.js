export default {
  name: "fuente",
  title: "Fuente",
  type: "document",
  fields: [
    { name: "idRef", title: "ID (kebab-case)", type: "string", validation: (r) => r.required() },
    { name: "titulo", title: "Título", type: "string", validation: (r) => r.required() },
    { name: "organizacion", title: "Organización", type: "string" },
    {
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: ["guia-oficial", "organizacion", "articulo-academico", "ministerio", "libro"],
      },
    },
    { name: "url", title: "URL", type: "url" },
    { name: "idiomaOriginal", title: "Idioma", type: "string", options: { list: ["es", "en"] } },
    { name: "nota", title: "Nota", type: "text", rows: 2 },
  ],
  preview: { select: { title: "titulo", subtitle: "organizacion" } },
};
