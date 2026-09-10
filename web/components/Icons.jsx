// Iconos de línea propios (stroke), tono claro; van dentro de .icon-tile.
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconLock(p) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1.2" />
    </svg>
  );
}
export function IconShield(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
export function IconCompass(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </svg>
  );
}
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
export function IconWifiOff(p) {
  return (
    <svg {...base} {...p}>
      <path d="M3 4l18 18" />
      <path d="M8.5 11.5a7 7 0 0 1 7-1M5 8.5a11 11 0 0 1 5-2.4M12 18.5h.01" />
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
