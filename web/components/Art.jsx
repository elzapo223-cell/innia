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
      {/* estelas de movimiento — corriente que fluye hacia el foco */}
      <path className="a-flow" d="M30 230 C 120 90, 180 250, 290 120" stroke="url(#t_spec)" strokeWidth="2.5" strokeDasharray="4 10" opacity="0.55" />
      <path className="a-flow" style={{ animationDelay: "0.6s" }} d="M50 150 C 150 200, 200 70, 290 120" stroke="url(#t_spec)" strokeWidth="2" strokeDasharray="3 9" opacity="0.4" />
      <path className="a-flow" style={{ animationDelay: "1.1s" }} d="M70 260 C 160 230, 210 180, 288 130" stroke="url(#t_spec)" strokeWidth="1.6" strokeDasharray="2 8" opacity="0.3" />
      {/* nodos (estáticos, parte de la composición) */}
      {[[70,110,10],[120,200,6],[160,90,5],[200,175,8],[95,255,4],[240,70,4],[180,240,5],[130,140,3],[50,190,4],[215,225,6]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="url(#t_spec)" opacity={0.3 + (i%3)*0.18} />
      ))}
      {/* foco nítido (respira suave) */}
      <circle className="a-pulse" cx="290" cy="120" r="34" stroke="url(#t_spec)" strokeWidth="3" />
      <circle cx="290" cy="120" r="20" stroke="url(#t_spec)" strokeWidth="1.6" opacity="0.6" />
      <circle cx="290" cy="120" r="9" fill="url(#t_spec)" />
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
          return <circle key={`${r}-${c}`} cx={x} cy={y} r={on ? 6 : 3} fill="url(#e_spec)" opacity={on ? 0.9 : 0.28} />;
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

/* Descargar — ventana de la app con flecha de descarga y aura del espectro. */
export function AppWindow({ className = "" }) {
  return (
    <svg viewBox="0 0 400 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: descargar la app">
      <defs><Grad id="aw_spec" /><radialGradient id="aw_glow" cx="0.5" cy="0.4" r="0.6"><stop offset="0" stopColor="#6ea8fe" stopOpacity="0.28"/><stop offset="1" stopColor="#6ea8fe" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="200" cy="150" rx="170" ry="120" fill="url(#aw_glow)" />
      <rect x="70" y="70" width="260" height="176" rx="16" fill="#ffffff" fillOpacity="0.03" stroke="url(#aw_spec)" strokeWidth="2.2" />
      <path d="M70 100 H 330" stroke="url(#aw_spec)" strokeWidth="1.6" opacity="0.5" />
      <circle cx="90" cy="85" r="4" fill="url(#aw_spec)" />
      <circle cx="106" cy="85" r="4" fill="#ffffff" opacity="0.4" />
      <circle cx="122" cy="85" r="4" fill="#ffffff" opacity="0.3" />
      {/* flecha de descarga (respira suave) */}
      <g className="a-breathe">
        <circle className="a-pulse" cx="200" cy="168" r="46" stroke="url(#aw_spec)" strokeWidth="2.4" fill="#ffffff" fillOpacity="0.03" />
        <path d="M200 146 v34 M186 168 l14 14 14 -14" stroke="url(#aw_spec)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="150" y="224" width="100" height="4" rx="2" fill="url(#aw_spec)" opacity="0.4" />
    </svg>
  );
}

/* FAQ — burbujas de pregunta y respuesta con signo del espectro. */
export function QuestionScene({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: preguntas frecuentes">
      <defs><Grad id="q_spec" /><radialGradient id="q_glow" cx="0.5" cy="0.45" r="0.6"><stop offset="0" stopColor="#a78bfa" stopOpacity="0.26"/><stop offset="1" stopColor="#a78bfa" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="150" r="140" fill="url(#q_glow)" />
      <g>
        <rect x="70" y="80" width="150" height="96" rx="18" fill="#ffffff" fillOpacity="0.04" stroke="url(#q_spec)" strokeWidth="2" />
        <path d="M100 176 l0 22 22 -22 z" fill="#ffffff" fillOpacity="0.04" stroke="url(#q_spec)" strokeWidth="2" />
        <path d="M120 118 a 22 22 0 1 1 25 22 v 8" stroke="url(#q_spec)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="145" cy="158" r="3.5" fill="url(#q_spec)" />
      </g>
      <g className="a-breathe">
        <rect x="200" y="150" width="150" height="86" rx="18" fill="#ffffff" fillOpacity="0.04" stroke="url(#q_spec)" strokeWidth="2" />
        <path d="M320 236 l0 20 -22 -20 z" fill="#ffffff" fillOpacity="0.04" stroke="url(#q_spec)" strokeWidth="2" />
        <rect x="220" y="176" width="90" height="8" rx="4" fill="url(#q_spec)" opacity="0.6" />
        <rect x="220" y="196" width="110" height="6" rx="3" fill="#ffffff" opacity="0.2" />
        <rect x="220" y="210" width="80" height="6" rx="3" fill="#ffffff" opacity="0.16" />
      </g>
    </svg>
  );
}

/* Blog — páginas apiladas con destello (contenido por venir). */
export function BlogScene({ className = "" }) {
  return (
    <svg viewBox="0 0 400 260" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: blog y novedades">
      <defs><Grad id="b_spec" /><radialGradient id="b_glow" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stopColor="#f0abfc" stopOpacity="0.22"/><stop offset="1" stopColor="#f0abfc" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="130" r="120" fill="url(#b_glow)" />
      <g transform="rotate(-6 200 130)">
        <rect x="120" y="60" width="160" height="150" rx="12" fill="#ffffff" fillOpacity="0.03" stroke="url(#b_spec)" strokeWidth="2" opacity="0.5" />
      </g>
      <g className="a-float" transform="rotate(4 200 130)">
        <rect x="130" y="70" width="160" height="150" rx="12" fill="#ffffff" fillOpacity="0.04" stroke="url(#b_spec)" strokeWidth="2.2" />
        <rect x="150" y="96" width="70" height="10" rx="5" fill="url(#b_spec)" opacity="0.7" />
        <rect x="150" y="120" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.2" />
        <rect x="150" y="136" width="110" height="7" rx="3.5" fill="#ffffff" opacity="0.16" />
        <rect x="150" y="152" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.16" />
        <rect x="150" y="180" width="60" height="12" rx="6" fill="url(#b_spec)" opacity="0.4" />
      </g>
      <path className="a-twinkle" d="M312 70 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4 z" fill="url(#b_spec)" />
    </svg>
  );
}

/* Aprende — libro abierto con arcos del espectro (conocimiento que sube). */
export function LearnScene({ className = "" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: aprender">
      <defs><Grad id="l_spec" /><radialGradient id="l_glow" cx="0.5" cy="0.75" r="0.6"><stop offset="0" stopColor="#6ea8fe" stopOpacity="0.26"/><stop offset="1" stopColor="#6ea8fe" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="210" r="140" fill="url(#l_glow)" />
      {/* arcos de conocimiento */}
      <path className="a-flow" d="M120 120 A 90 90 0 0 1 280 120" stroke="url(#l_spec)" strokeWidth="2" strokeDasharray="4 10" opacity="0.6" />
      <path className="a-flow" style={{ animationDelay: "0.8s" }} d="M95 130 A 115 115 0 0 1 305 130" stroke="url(#l_spec)" strokeWidth="1.6" strokeDasharray="3 11" opacity="0.4" />
      {/* libro abierto */}
      <g className="a-breathe">
        <path d="M200 150 C 160 132, 110 132, 78 150 L 78 232 C 110 214, 160 214, 200 232 Z" fill="#ffffff" fillOpacity="0.04" stroke="url(#l_spec)" strokeWidth="2.2" />
        <path d="M200 150 C 240 132, 290 132, 322 150 L 322 232 C 290 214, 240 214, 200 232 Z" fill="#ffffff" fillOpacity="0.04" stroke="url(#l_spec)" strokeWidth="2.2" />
        <path d="M200 150 V 232" stroke="url(#l_spec)" strokeWidth="2.2" />
        <path d="M96 165 C 130 152, 168 152, 190 165 M96 185 C 130 172, 168 172, 190 185" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" />
        <path d="M210 165 C 232 152, 270 152, 304 165 M210 185 C 232 172, 270 172, 304 185" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* Confianza — red de fuentes: nodo central conectado a documentos citados. */
export function SourcesScene({ className = "" }) {
  const nodes = [[70,80],[330,90],[60,210],[340,210],[200,55]];
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: red de fuentes">
      <defs><Grad id="src_spec" /><radialGradient id="src_glow" cx="0.5" cy="0.5" r="0.55"><stop offset="0" stopColor="#a78bfa" stopOpacity="0.24"/><stop offset="1" stopColor="#a78bfa" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="150" r="130" fill="url(#src_glow)" />
      {nodes.map(([x,y],i)=>(
        <path key={"l"+i} className="a-flow" style={{ animationDelay: `${i*0.4}s` }} d={`M200 150 L ${x} ${y}`} stroke="url(#src_spec)" strokeWidth="1.6" strokeDasharray="3 8" opacity="0.5" />
      ))}
      {nodes.map(([x,y],i)=>(
        <g key={"n"+i}>
          <rect x={x-22} y={y-15} width="44" height="30" rx="6" fill="#ffffff" fillOpacity="0.04" stroke="url(#src_spec)" strokeWidth="1.6" />
          <rect x={x-14} y={y-6} width="20" height="3.5" rx="1.75" fill="url(#src_spec)" opacity="0.8" />
          <rect x={x-14} y={y+2} width="28" height="3" rx="1.5" fill="#ffffff" opacity="0.25" />
        </g>
      ))}
      <g className="a-breathe">
        <circle cx="200" cy="150" r="30" fill="#ffffff" fillOpacity="0.05" stroke="url(#src_spec)" strokeWidth="2.4" />
        <path d="M188 150 l8 8 16 -18" stroke="url(#src_spec)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* Aprende/estrategias — un núcleo que se ramifica en enfoques. */
export function StrategiesScene({ className = "" }) {
  const ends = [[70,70],[330,70],[70,230],[330,230]];
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: estrategias">
      <defs><Grad id="st_spec" /><radialGradient id="st_glow" cx="0.5" cy="0.5" r="0.55"><stop offset="0" stopColor="#f0abfc" stopOpacity="0.2"/><stop offset="1" stopColor="#f0abfc" stopOpacity="0"/></radialGradient></defs>
      <circle cx="200" cy="150" r="130" fill="url(#st_glow)" />
      {ends.map(([x,y],i)=>(
        <path key={"b"+i} className="a-flow" style={{ animationDelay: `${i*0.5}s` }} d={`M200 150 C ${(200+x)/2} 150, ${x} ${(150+y)/2}, ${x} ${y}`} stroke="url(#st_spec)" strokeWidth="1.8" strokeDasharray="4 9" opacity="0.55" />
      ))}
      {ends.map(([x,y],i)=>(
        <g key={"c"+i}>
          <rect x={x-30} y={y-18} width="60" height="36" rx="10" fill="#ffffff" fillOpacity="0.04" stroke="url(#st_spec)" strokeWidth="1.6" />
          <rect x={x-18} y={y-4} width="36" height="4" rx="2" fill="url(#st_spec)" opacity="0.7" />
        </g>
      ))}
      <g className="a-breathe">
        <path d="M200 118 l9 24 24 9 -24 9 -9 24 -9 -24 -24 -9 24 -9 z" fill="url(#st_spec)" />
      </g>
    </svg>
  );
}

export const MOTIF_BY_CONDICION = {
  TDAH: MotifTDAH,
  TEA: MotifTEA,
  ambos: MotifAmbos,
};
