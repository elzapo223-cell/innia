export const MODOS = [
  {
    id: "aprende",
    emoji: "📚",
    nombre: "Aprende",
    tagline: "Información sencilla sobre TDAH y TEA",
    descripcion:
      "Consulta qué son el TDAH y el TEA en el contexto del aula, sus características y qué estrategias usar.",
    placeholder: "Ej.: ¿Qué características del TEA puedo ver en el aula?",
    tipo: "chat",
  },
  {
    id: "consulta",
    emoji: "💬",
    nombre: "Consulta",
    tagline: "Plantea una situación y recibe estrategias",
    descripcion:
      "Describe una situación general del aula (anónima) y recibe estrategias prácticas: qué hacer, qué evitar, cómo adaptar y comunicar.",
    placeholder: "Ej.: El estudiante se distrae constantemente durante la actividad.",
    tipo: "chat",
  },
  {
    id: "adapta",
    emoji: "🧩",
    nombre: "Adapta",
    tagline: "Modifica actividades, instrucciones o evaluaciones",
    descripcion:
      "Pega una actividad, instrucción o evaluación y INNIA la adapta manteniendo el objetivo de aprendizaje.",
    placeholder: "Pega aquí la actividad, instrucción o evaluación a adaptar…",
    tipo: "chat",
  },
  {
    id: "crea",
    emoji: "✨",
    nombre: "Crea",
    tagline: "Genera actividades y estrategias inclusivas",
    descripcion:
      "Pide una actividad por tema o materia y INNIA propone una versión dinámica, en pasos y con apoyos visuales.",
    placeholder: "Ej.: Necesito una actividad de matemáticas sobre fracciones, dinámica y en pasos.",
    tipo: "chat",
  },
  {
    id: "que-hago",
    emoji: "🚨",
    nombre: "¿Qué hago?",
    tagline: "Orientación rápida ante situaciones comunes",
    descripcion: "Respuestas breves e inmediatas para situaciones frecuentes del aula.",
    placeholder: "Ej.: Se frustró y no quiere continuar.",
    tipo: "chat",
    atajos: [
      "El estudiante no quiere realizar la actividad.",
      "No comprende las instrucciones.",
      "Se distrae constantemente.",
      "Se frustró y no quiere continuar.",
      "Tiene dificultad para trabajar en grupo.",
    ],
  },
];

export const CONDICIONES = [
  { id: null, nombre: "General" },
  { id: "TDAH", nombre: "TDAH" },
  { id: "TEA", nombre: "TEA" },
];
