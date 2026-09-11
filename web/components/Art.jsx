// Ilustraciones SVG propias en la paleta del espectro (azul→violeta→rosa).
// Abstractas, atmosféricas y a juego con la identidad; sin fotos ni rostros.

function Grad({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#6ea8fe" />
      <stop offset="0.55" stopColor="#a78bfa" />
      <stop offset="1" stopColor="#f0abfc" />
    </linearGradient>
  );
}

/* ============================================================
   HERO — escena atmosférica: arco del espectro, tarjetas de vidrio
   flotando (los "modos"), constelación de nodos y orbes de ideas.
   ============================================================ */
export function HeroScene({ className = "" }) {
  return (
    <svg viewBox="0 0 560 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: asistente que conecta ideas y estrategias">
      <defs>
        <Grad id="h_spec" />
        <radialGradient id="h_glow" cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.35" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="h_glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* halo */}
      <circle cx="280" cy="205" r="210" fill="url(#h_glow)" />

      {/* gran arco del espectro (inclusión / espectro) */}
      <path d="M70 300 A 210 210 0 0 1 490 300" stroke="url(#h_spec)" strokeWidth="3" opacity="0.85" />
      <path d="M110 300 A 170 170 0 0 1 450 300" stroke="url(#h_spec)" strokeWidth="2" opacity="0.4" />

      {/* constelación de nodos conectados */}
      <g opacity="0.7">
        <path d="M150 150 L 250 110 L 355 140 L 430 200" stroke="url(#h_spec)" strokeWidth="1.6" strokeDasharray="2 7" />
        <path d="M250 110 L 300 205 L 355 140" stroke="url(#h_spec)" strokeWidth="1.6" strokeDasharray="2 7" />
        {[[150,150,5],[250,110,7],[355,140,5],[430,200,4],[300,205,6]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="url(#h_spec)" />
        ))}
      </g>

      {/* orbes de ideas flotando */}
      <circle cx="120" cy="235" r="10" fill="url(#h_spec)" opacity="0.55" />
      <circle cx="455" cy="255" r="14" fill="url(#h_spec)" opacity="0.5" />
      <circle cx="205" cy="255" r="6" fill="url(#h_spec)" opacity="0.7" />

      {/* tarjeta de vidrio 1 — chat (modo Consulta) */}
      <g transform="rotate(-8 205 300)">
        <rect x="120" y="255" width="170" height="112" rx="16" fill="url(#h_glass)" stroke="url(#h_spec)" strokeWidth="1.5" />
        <rect x="138" y="278" width="80" height="9" rx="4.5" fill="url(#h_spec)" opacity="0.7" />
        <rect x="138" y="298" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.22" />
        <rect x="138" y="313" width="104" height="7" rx="3.5" fill="#ffffff" opacity="0.18" />
        <rect x="138" y="335" width="66" height="14" rx="7" fill="url(#h_spec)" opacity="0.35" />
      </g>

      {/* tarjeta de vidrio 2 — al frente (respuesta) */}
      <g transform="rotate(6 360 320)">
        <rect x="285" y="270" width="185" height="128" rx="18" fill="url(#h_glass)" stroke="url(#h_spec)" strokeWidth="1.6" />
        <circle cx="308" cy="296" r="7" fill="url(#h_spec)" />
        <rect x="324" y="291" width="120" height="9" rx="4.5" fill="#ffffff" opacity="0.28" />
        <rect x="305" y="318" width="140" height="7" rx="3.5" fill="#ffffff" opacity="0.2" />
        <rect x="305" y="333" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.16" />
        <rect x="305" y="356" width="150" height="7" rx="3.5" fill="#ffffff" opacity="0.16" />
        <rect x="305" y="372" width="70" height="10" rx="5" fill="url(#h_spec)" opacity="0.5" />
      </g>

      {/* destellos */}
      <path d="M95 120 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="url(#h_spec)" opacity="0.7" />
      <path d="M470 130 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="url(#h_spec)" opacity="0.6" />
    </svg>
  );
}

/* ============================================================
   TDAH — foco en medio del ruido: partículas dispersas con estelas
   de movimiento que convergen hacia un foco nítido.
   ============================================================ */
export function MotifTDAH({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración TDAH: atención y energía">
      <defs><Grad id="t_spec" /><radialGradient id="t_glow" cx="0.72" cy="0.4" r="0.5"><stop offset="0" stopColor="#6ea8fe" stopOpacity="0.3"/><stop offset="1" stopColor="#6ea8fe" stopOpacity="0"/></radialGradient></defs>
      <rect width="400" height="300" fill="url(#t_spec)" opacity="0.05" />
      <circle cx="290" cy="120" r="120" fill="url(#t_glow)" />
      {/* estelas de movimiento */}
      <path d="M30 230 C 120 90, 180 250, 290 120" stroke="url(#t_spec)" strokeWidth="2.5" strokeDasharray="4 10" opacity="0.55" />
      <path d="M50 150 C 150 200, 200 70, 290 120" stroke="url(#t_spec)" strokeWidth="2" strokeDasharray="3 9" opacity="0.4" />
      <path d="M70 260 C 160 230, 210 180, 288 130" stroke="url(#t_spec)" strokeWidth="1.6" strokeDasharray="2 8" opacity="0.3" />
      {/* partículas dispersas */}
      {[[70,110,10],[120,200,6],[160,90,5],[200,175,8],[95,255,4],[240,70,4],[180,240,5],[130,140,3],[50,190,4],[215,225,6]].map(([x,y,r],i)=>(
        <circle key={i} className={i % 2 ? "a-float" : "a-float2"} style={{ animationDelay: `${i * 0.35}s` }} cx={x} cy={y} r={r} fill="url(#t_spec)" opacity={0.3 + (i%3)*0.18} />
      ))}
      {/* foco nítido */}
      <circle className="a-pulse" cx="290" cy="120" r="34" stroke="url(#t_spec)" strokeWidth="3" />
      <circle cx="290" cy="120" r="20" stroke="url(#t_spec)" strokeWidth="1.6" opacity="0.6" />
      <circle className="a-twinkle" cx="290" cy="120" r="9" fill="url(#t_spec)" />
    </svg>
  );
}

/* ============================================================
   TEA — patrones y estructura: retícula ordenada, arcos concéntricos
   y un camino estructurado resaltado.
   ============================================================ */
export function MotifTEA({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración TEA: patrones y estructura">
      <defs><Grad id="e_spec" /><radialGradient id="e_glow" cx="0.5" cy="0.9" r="0.6"><stop offset="0" stopColor="#a78bfa" stopOpacity="0.3"/><stop offset="1" stopColor="#a78bfa" stopOpacity="0"/></radialGradient></defs>
      <rect width="400" height="300" fill="url(#e_spec)" opacity="0.05" />
      <circle cx="200" cy="280" r="150" fill="url(#e_glow)" />
      {/* arcos concéntricos (previsibilidad) */}
      <path d="M40 250 A 160 160 0 0 1 360 250" stroke="url(#e_spec)" strokeWidth="3" opacity="0.75" />
      <path d="M80 250 A 120 120 0 0 1 320 250" stroke="url(#e_spec)" strokeWidth="2" opacity="0.45" />
      <path d="M120 250 A 80 80 0 0 1 280 250" stroke="url(#e_spec)" strokeWidth="1.6" opacity="0.3" />
      {/* retícula ordenada */}
      {Array.from({ length: 5 }).flatMap((_, r) =>
        Array.from({ length: 9 }).map((_, c) => {
          const x = 60 + c * 35;
          const y = 55 + r * 30;
          const on = (r + c) % 3 === 0;
          return <circle key={`${r}-${c}`} className={on ? "a-twinkle" : undefined} style={on ? { animationDelay: `${(r + c) * 0.25}s` } : undefined} cx={x} cy={y} r={on ? 6 : 3} fill="url(#e_spec)" opacity={on ? 0.9 : 0.28} />;
        })
      )}
      {/* camino estructurado resaltado */}
      <path d="M60 55 L 95 85 L 130 55 L 165 85 L 200 55" stroke="url(#e_spec)" strokeWidth="2.5" opacity="0.85" />
    </svg>
  );
}

/* Ambos / general: dos círculos que se integran (inclusión). */
export function MotifAmbos({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración: inclusión">
      <defs><Grad id="a_spec" /></defs>
      <rect width="400" height="300" fill="url(#a_spec)" opacity="0.05" />
      <circle cx="165" cy="150" r="85" stroke="url(#a_spec)" strokeWidth="3" opacity="0.75" />
      <circle cx="245" cy="150" r="85" stroke="url(#a_spec)" strokeWidth="3" opacity="0.75" />
      <path d="M205 78 A 85 85 0 0 1 205 222 A 85 85 0 0 1 205 78 Z" fill="url(#a_spec)" opacity="0.2" />
      {[[165,150],[245,150],[205,150]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r={5} fill="url(#a_spec)" />))}
    </svg>
  );
}

/* Laptop con aura del espectro + candado: motor local y privado. */
export function DeviceLocal({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: motor local y privado">
      <defs><Grad id="d_spec" /><radialGradient id="d_glow" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stopColor="#6ea8fe" stopOpacity="0.28"/><stop offset="1" stopColor="#6ea8fe" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="200" cy="150" rx="160" ry="110" fill="url(#d_glow)" />
      {/* órbitas de datos que se quedan dentro */}
      <ellipse className="a-spin-slow" cx="200" cy="150" rx="150" ry="70" stroke="url(#d_spec)" strokeWidth="1.4" strokeDasharray="3 9" opacity="0.4" />
      <rect x="108" y="78" width="184" height="120" rx="10" stroke="url(#d_spec)" strokeWidth="2.5" fill="#ffffff" fillOpacity="0.03" />
      <path d="M84 214 L 316 214 L 298 198 L 102 198 Z" stroke="url(#d_spec)" strokeWidth="2.5" strokeLinejoin="round" fill="#ffffff" fillOpacity="0.03" />
      {/* candado */}
      <rect x="170" y="120" width="60" height="46" rx="9" stroke="url(#d_spec)" strokeWidth="2.4" />
      <path d="M180 120 v-9 a20 20 0 0 1 40 0 v9" stroke="url(#d_spec)" strokeWidth="2.4" />
      <circle cx="200" cy="140" r="5" fill="url(#d_spec)" />
      <path d="M200 145 v10" stroke="url(#d_spec)" strokeWidth="2.4" />
    </svg>
  );
}

/* Escudo con corazón: confianza y cuidado (para Confianza). */
export function ShieldCare({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: confianza y cuidado">
      <defs><Grad id="s_spec" /><radialGradient id="s_glow" cx="0.5" cy="0.4" r="0.55"><stop offset="0" stopColor="#5eead4" stopOpacity="0.22"/><stop offset="1" stopColor="#5eead4" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="140" r="130" fill="url(#s_glow)" />
      <path d="M200 45 L 300 82 v70 c0 66 -46 100 -100 128 c -54 -28 -100 -62 -100 -128 v-70 z" stroke="url(#s_spec)" strokeWidth="2.6" fill="#ffffff" fillOpacity="0.03" />
      <path className="a-pulse" d="M200 205 c -40 -26 -58 -50 -58 -78 a 26 26 0 0 1 58 -12 a 26 26 0 0 1 58 12 c 0 28 -18 52 -58 78 z" fill="url(#s_spec)" opacity="0.75" />
    </svg>
  );
}

/* Onda del espectro: banda decorativa que llena cualquier ancho. */
export function SpectrumWave({ className = "" }) {
  return (
    <svg viewBox="0 0 600 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
      <defs><Grad id="w_spec" /></defs>
      <path d="M0 70 C 120 20, 200 110, 320 60 S 520 10, 600 60" stroke="url(#w_spec)" strokeWidth="2" opacity="0.6" />
      <path d="M0 90 C 130 50, 220 120, 340 80 S 520 40, 600 84" stroke="url(#w_spec)" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

export const MOTIF_BY_CONDICION = {
  TDAH: MotifTDAH,
  TEA: MotifTEA,
  ambos: MotifAmbos,
};
