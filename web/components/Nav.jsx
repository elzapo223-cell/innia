"use client";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/aprende", label: "Aprende" },
  { href: "/confianza", label: "Confianza" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 sm:px-4 py-3">
      <nav className="glass rounded-2xl max-w-6xl mx-auto px-4 py-2.5">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight" onClick={() => setAbierto(false)}>
            INN<span className="text-innia-accent">IA</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm text-white/70 flex-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="px-3 py-1.5 rounded-lg glass-hover">
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/descargar"
            className="ml-auto rounded-full px-5 py-2 text-sm font-medium text-[#0a0e1a] bg-gradient-to-r from-[#6ea8fe] to-[#a78bfa] hover:brightness-110 transition"
          >
            Descargar
          </Link>
          <button
            aria-label="Abrir menú"
            aria-expanded={abierto}
            onClick={() => setAbierto((v) => !v)}
            className="md:hidden rounded-lg px-3 py-2 glass glass-hover text-lg leading-none"
          >
            {abierto ? "✕" : "☰"}
          </button>
        </div>

        {abierto && (
          <div className="md:hidden mt-2 pt-2 border-t border-white/10 flex flex-col gap-1 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setAbierto(false)}
                className="px-3 py-2 rounded-lg glass-hover"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
