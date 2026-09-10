const AREAS = [
  "atencion",
  "comunicacion",
  "interaccion-social",
  "regulacion-emocional",
  "instrucciones",
  "aprendizaje",
  "trabajo-en-grupo",
  "motivacion-tareas",
  "sensorial",
];

export default {
  name: "estrategia",
  title: "Estrategia de aula",
  type: "document",
  fields: [
    { name: "idRef", title: "ID (kebab-case)", type: "string", validation: (r) => r.required() },
    { name: "titulo", title: "Título", type: "string", validation: (r) => r.required() },
    { name: "condicion", title: "Condición", type: "string", options: { list: ["TDAH", "TEA", "ambos"] } },
    { name: "area", title: "Área", type: "string", options: { list: AREAS } },
    { name: "contextoEducativo", title: "Contexto educativo", type: "text", rows: 3 },
    { name: "dificultadesTipicas", title: "Dificultades típicas", type: "array", of: [{ type: "string" }] },
    {
      name: "estrategias",
      title: "Estrategias",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "que", title: "Qué", type: "string" },
            { name: "como", title: "Cómo", type: "text", rows: 2 },
            { name: "ejemplo", title: "Ejemplo", type: "string" },
          ],
          preview: { select: { title: "que", subtitle: "como" } },
        },
      ],
    },
    { name: "queEvitar", title: "Qué evitar", type: "array", of: [{ type: "string" }] },
    { name: "comoAdaptar", title: "Cómo adaptar", type: "array", of: [{ type: "string" }] },
    { name: "comoComunicar", title: "Cómo comunicar", type: "array", of: [{ type: "string" }] },
    { name: "situacionesRapidas", title: "Situaciones rápidas", type: "array", of: [{ type: "string" }] },
    { name: "fuentes", title: "Fuentes", type: "array", of: [{ type: "reference", to: [{ type: "fuente" }] }] },
  ],
  preview: { select: { title: "titulo", subtitle: "condicion" } },
};
