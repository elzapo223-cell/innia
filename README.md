# INNIA

Asistente pedagógico para docentes que atienden a estudiantes con **TDAH** y **TEA**.
De *"no sé cómo manejar esto"* a *"tengo varias estrategias que puedo aplicar."*

Monorepo con tres piezas que comparten una base de conocimiento curada:

| Carpeta     | Pieza                                              | Stack                          |
|-------------|----------------------------------------------------|--------------------------------|
| `desktop/`  | App de escritorio (solo Windows), 100% local       | Electron + React + Ollama      |
| `web/`      | Sitio hub: presenta, distribuye y publica contenido| Next.js + Vercel               |
| `studio/`   | CMS del contenido educativo                         | Sanity                         |
| `research/` | Fase 0: investigación → base curada + fuentes       | —                              |
| `docs/`     | Spec y plan de implementación                       | —                              |

## Reglas de diseño (no opcionales)
- **Cero datos de estudiantes.** Solo situaciones anónimas y generales.
- **No diagnostica, no etiqueta, no receta.** Función solo educativa.
- **Fuentes públicas citadas.** Contenido educativo, no clínico.
- **Privacidad por arquitectura.** El motor corre local (Ollama); funciona offline.

Ver el diseño completo en [`docs/superpowers/specs/2026-09-09-innia-design.md`](docs/superpowers/specs/2026-09-09-innia-design.md).
