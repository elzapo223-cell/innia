// Iconos de línea para la app (mismo lenguaje visual que el sitio).
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconBook(p) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M20 18H6.5A2.5 2.5 0 0 0 4 20.5" />
    </svg>
  );
}
export function IconChat(p) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5h16v11H8l-4 3z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}
export function IconPuzzle(p) {
  return (
    <svg {...base} {...p}>
      <path d="M10 4a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H7v-3a2 2 0 1 1 0-4V4z" />
    </svg>
  );
}
export function IconSparkles(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" />
      <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </svg>
  );
}
export function IconAlert(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17.5v.5" />
    </svg>
  );
}

export const MODE_ICONS = {
  aprende: IconBook,
  consulta: IconChat,
  adapta: IconPuzzle,
  crea: IconSparkles,
  "que-hago": IconAlert,
};
