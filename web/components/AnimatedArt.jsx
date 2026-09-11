"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Wrapper de parallax sutil al hacer scroll (sin barras, solo desplazamiento). */
export function Parallax({ children, amount = 36, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ============================================================
   HÉROE ANIMADO E INTERACTIVO
   - Parallax con el mouse (capas a distinta profundidad)
   - Dibujo de trazos (arco + constelación) al entrar
   - Órbes flotando y destellos titilando (CSS ambiental)
   ============================================================ */
export function HeroSceneAnimated({ className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.4 });

  const bgX = useTransform(sx, (v) => v * 8);
  const bgY = useTransform(sy, (v) => v * 8);
  const midX = useTransform(sx, (v) => v * 18);
  const midY = useTransform(sy, (v) => v * 18);
  const frX = useTransform(sx, (v) => v * 30);
  const frY = useTransform(sy, (v) => v * 30);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    my.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const drawn = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.6, ease: EASE, delay },
  });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={className}>
      <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración animada: asistente que conecta ideas y estrategias">
        <defs>
          <linearGradient id="ha_spec" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6ea8fe" />
            <stop offset="0.55" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#f0abfc" />
          </linearGradient>
          <radialGradient id="ha_glow" cx="0.5" cy="0.42" r="0.6">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ha_glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Capa de fondo (parallax lento) */}
        <motion.g style={{ x: bgX, y: bgY }}>
          <circle cx="280" cy="205" r="210" fill="url(#ha_glow)" />
          <motion.path d="M70 300 A 210 210 0 0 1 490 300" stroke="url(#ha_spec)" strokeWidth="3" {...drawn(0.1)} />
          <motion.path d="M110 300 A 170 170 0 0 1 450 300" stroke="url(#ha_spec)" strokeWidth="2" opacity="0.4" {...drawn(0.25)} />
        </motion.g>

        {/* Capa media (constelación conectada — estructura, no partículas) */}
        <motion.g style={{ x: midX, y: midY }}>
          <motion.path d="M150 150 L 250 110 L 355 140 L 430 200" stroke="url(#ha_spec)" strokeWidth="1.6" {...drawn(0.35)} />
          <motion.path d="M250 110 L 300 205 L 355 140" stroke="url(#ha_spec)" strokeWidth="1.6" {...drawn(0.5)} />
          {[[150,150,5],[250,110,7],[355,140,5],[430,200,4],[300,205,6]].map(([x,y,r],i)=>(
            <circle key={i} cx={x} cy={y} r={r} fill="url(#ha_spec)" opacity="0.9" />
          ))}
        </motion.g>

        {/* Capa frontal (tarjetas de vidrio, estáticas — la vida la dan el dibujo y el parallax) */}
        <motion.g style={{ x: frX, y: frY }}>
          <g transform="rotate(-8 205 300)">
            <rect x="120" y="255" width="170" height="112" rx="16" fill="url(#ha_glass)" stroke="url(#ha_spec)" strokeWidth="1.5" />
            <rect x="138" y="278" width="80" height="9" rx="4.5" fill="url(#ha_spec)" opacity="0.7" />
            <rect x="138" y="298" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.22" />
            <rect x="138" y="313" width="104" height="7" rx="3.5" fill="#ffffff" opacity="0.18" />
            <rect x="138" y="335" width="66" height="14" rx="7" fill="url(#ha_spec)" opacity="0.35" />
          </g>
          <g transform="rotate(6 360 320)">
            <rect x="285" y="270" width="185" height="128" rx="18" fill="url(#ha_glass)" stroke="url(#ha_spec)" strokeWidth="1.6" />
            <circle cx="308" cy="296" r="7" fill="url(#ha_spec)" />
            <rect x="324" y="291" width="120" height="9" rx="4.5" fill="#ffffff" opacity="0.28" />
            <rect x="305" y="318" width="140" height="7" rx="3.5" fill="#ffffff" opacity="0.2" />
            <rect x="305" y="333" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.16" />
            <rect x="305" y="356" width="150" height="7" rx="3.5" fill="#ffffff" opacity="0.16" />
            <rect x="305" y="372" width="70" height="10" rx="5" fill="url(#ha_spec)" opacity="0.5" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
