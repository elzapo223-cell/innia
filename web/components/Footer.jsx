import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 py-8 mt-12">
      <div className="glass rounded-2xl max-w-6xl mx-auto px-6 py-6 text-sm text-white/60">
        <div className="flex flex-wrap gap-6 justify-between">
          <div className="max-w-sm">
            <div className="text-lg font-bold text-white/90">
              INN<span className="text-innia-accent">IA</span>
            </div>
            <p className="mt-1 text-[13px]">
              Asistente pedagógico para docentes que atienden a estudiantes con TDAH y TEA.
              Herramienta educativa — no diagnostica ni reemplaza a un profesional.
            </p>
          </div>
          <div className="flex gap-10 text-[13px]">
            <div className="space-y-1">
              <div className="text-white/80 font-medium">Producto</div>
              <Link className="block glass-hover rounded px-1" href="/descargar">Descargar</Link>
              <Link className="block glass-hover rounded px-1" href="/como-funciona">Cómo funciona</Link>
              <Link className="block glass-hover rounded px-1" href="/aprende">Aprende</Link>
            </div>
            <div className="space-y-1">
              <div className="text-white/80 font-medium">Información</div>
              <Link className="block glass-hover rounded px-1" href="/confianza">Confianza y privacidad</Link>
              <Link className="block glass-hover rounded px-1" href="/faq">Preguntas frecuentes</Link>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-[12px] text-white/40">
          © {new Date().getFullYear()} INNIA · Contenido educativo con fuentes públicas citadas ·
          No solicita ni almacena datos de estudiantes.
        </div>
      </div>
    </footer>
  );
}
