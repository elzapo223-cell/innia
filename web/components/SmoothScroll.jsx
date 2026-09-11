"use client";
import { useEffect } from "react";

// Scroll suave premium con Lenis (sobre el scroll nativo, sin barras).
// Se desactiva si el usuario prefiere movimiento reducido.
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lenis;
    let rafId;
    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1 });
      const loop = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      try {
        lenis && lenis.destroy();
      } catch {
        /* noop */
      }
    };
  }, []);

  return null;
}
