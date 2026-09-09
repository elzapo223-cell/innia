# Planes A (app de escritorio) y B (sitio hub) — resumen ejecutable

> Estos planes se ejecutan directamente en la sesión (el cliente pidió construcción
> continua). El contrato de datos ya está fijado por la Fase 0
> (`docs/superpowers/plans/2026-09-09-fase0-base-curada.md`).

**Global Constraints (heredadas del spec):** español; cero datos de estudiantes;
no diagnostica/etiqueta/receta; contenido educativo con fuentes citadas; app solo Windows;
motor local (Ollama) en la app; estética liquid glass.

## Plan A — App de escritorio (Electron + Ollama + RAG)

Estado: **andamiaje construido**. Archivos:
- `desktop/electron/prompts.cjs` — reglas no negociables + encuadre por modo.
- `desktop/electron/ollama.cjs` — cliente Ollama (status, pull con progreso, chat streaming, embeddings).
- `desktop/electron/rag.cjs` — RAG híbrido (léxico siempre + embeddings opcional) sobre la base.
- `desktop/electron/main.cjs` + `preload.cjs` — proceso principal, IPC, selección de modelo por RAM.
- `desktop/src/*` — UI React (5 modos, chat streaming, onboarding de Ollama, fuentes, disclaimer).
- `desktop/scripts/bundle-base.mjs` — empaqueta `research/` en `resources/base.bundle.json`.

Tareas restantes:
- [ ] `npm install` + `npm run bundle:base` + `npm run build` sin errores.
- [ ] Probar en Windows real con Ollama (paso del usuario).
- [ ] `electron-builder` → instalador NSIS.
- [ ] Publicar en GitHub Releases + auto-update (paso del usuario).

## Plan B — Sitio hub (Next.js + Vercel + Sanity)

Estructura `web/`:
- `app/` — App Router: Inicio, Cómo funciona, Descargar, Aprende (lista + detalle),
  Blog (lista + detalle), Confianza, FAQ, y `/studio` (Sanity embebido).
- `sanity/` — schemas (`fichaAprende`, `estrategia`, `articuloBlog`, `fuente`, `paginaLegal`),
  config, cliente y queries GROQ.
- `lib/fallback.js` — si no hay proyecto Sanity configurado, el sitio usa el contenido de
  `research/` (bundle) para no quedar vacío en desarrollo.
- `scripts/seed.mjs` — importa `research/` a Sanity (requiere token del usuario).

Tareas restantes:
- [ ] `npm install` + `npm run build` sin errores (con fallback, sin necesitar Sanity).
- [ ] Crear proyecto Sanity + `.env.local` (paso del usuario).
- [ ] `npm run seed` para cargar contenido (paso del usuario).
- [ ] Deploy a Vercel (paso del usuario).

## Puntos que requieren al usuario
Sanity (crear proyecto/login/token), GitHub Releases del `.exe`, deploy a Vercel, y
prueba del instalador en Windows real con Ollama.
