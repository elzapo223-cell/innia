# INNIA — Diseño (spec)

**Fecha:** 2026-09-09
**Estado:** Aprobado para implementación
**Nombre del producto:** INNIA

---

## 1. Resumen

INNIA es un **asistente pedagógico** para docentes que atienden a estudiantes con
**TDAH** (Trastorno por Déficit de Atención e Hiperactividad) y **TEA** (Trastorno del
Espectro Autista). Ayuda al docente a pasar de *"no sé cómo manejar esto"* a *"tengo
varias estrategias que puedo aplicar"*, promoviendo una educación más inclusiva.

El producto tiene **tres piezas** que comparten un mismo insumo (una base de conocimiento
curada):

1. **App de escritorio (solo Windows)** — el asistente en sí, 100% local con Ollama.
2. **Sitio web / hub (Next.js + Vercel + Sanity)** — presenta, distribuye y publica
   contenido educativo.
3. **Base de conocimiento curada** — construida en una fase de investigación previa;
   alimenta a la vez el RAG de la app y el contenido del sitio.

## 2. Objetivo y usuarios

- **Usuario:** docente de aula, con poca o ninguna formación específica en TDAH/TEA.
- **Objetivo:** darle estrategias prácticas, adaptaciones y orientación inmediata ante
  situaciones reales de aula, con contenido confiable y anclado en fuentes.
- **Contexto:** Colombia / español. Equipos de cómputo modestos son comunes.

## 3. Reglas de diseño (transversales, NO opcionales)

Estas reglas gobiernan cada pieza y cada respuesta del asistente:

1. **Cero datos de estudiantes.** INNIA nunca solicita, almacena ni procesa datos
   personales o identificables (nombres, documentos, fotos, historias clínicas,
   diagnósticos detallados). Trabaja solo con situaciones educativas generales y
   anónimas. Aviso visible al usuario.
2. **No diagnostica, no etiqueta, no receta tratamientos.** Función exclusivamente
   educativa y pedagógica. Guardarraíl reforzado en el system prompt + disclaimer
   permanente en la interfaz.
3. **Contenido educativo, no clínico.** Todo el material se presenta como orientación
   pedagógica con **fuentes públicas reputadas citadas**, no como consejo médico.
4. **Privacidad por arquitectura.** En la app de escritorio, el motor corre local
   (Ollama): ningún dato sale del equipo del docente. Funciona offline tras instalar.

## 4. Arquitectura general

```
                 ┌──────────────────────────┐
                 │  FASE 0: Investigación    │
                 │  → base curada (fuentes)  │
                 └───────────┬──────────────┘
                             │ (mismo insumo)
              ┌──────────────┴───────────────┐
              ▼                              ▼
   ┌────────────────────┐        ┌────────────────────────┐
   │  App escritorio     │        │  Sitio hub              │
   │  (Electron+Ollama)  │        │  (Next.js+Vercel+Sanity)│
   │  RAG local (SQLite) │        │  Aprende + Blog + Descar│
   └────────────────────┘        └────────────────────────┘
```

## 5. Pieza A — App de escritorio (solo Windows)

### 5.1 Stack
- **Shell:** Electron.
- **UI:** React + Vite + Tailwind (estética coherente con el sitio; liquid glass).
- **Motor IA:** Ollama corriendo local en `http://localhost:11434`.
- **RAG local:** embeddings con `nomic-embed-text` (vía Ollama) + índice vectorial en
  **SQLite** (better-sqlite3 con extensión de vectores, o índice en memoria cargado
  desde archivo si resulta más simple y confiable en v1).

### 5.2 Gestión de Ollama (primer arranque)
1. La app detecta si Ollama está instalado y corriendo (`GET /api/tags`).
2. Si falta, guía la instalación (descarga del instalador oficial de Ollama) con
   barra de progreso y estado claro.
3. Detecta RAM disponible y elige el modelo por defecto:
   - **≥ 16 GB:** Qwen2.5 7B o Llama 3.1 8B (calidad).
   - **8–16 GB:** modelo 7B cuantizado.
   - **< 8 GB:** fallback a Llama 3.2 3B (o similar 1–3B).
4. Descarga el modelo elegido + `nomic-embed-text` con progreso.
5. Construye/carga el índice RAG a partir de la base curada empaquetada.

### 5.3 Motor: un core, cinco modos
Todas las secciones usan el mismo pipeline (recuperación RAG → prompt con contexto →
Ollama), variando **system prompt** y **subconjunto de la base**:

- **📚 Aprende** — fichas navegables (no solo chat) sobre TDAH/TEA en contexto educativo;
  permite preguntas.
- **💬 Consulta** — el docente describe una situación general → estrategias organizadas en
  *qué hacer / qué evitar / cómo comunicar / cómo adaptar*.
- **🧩 Adapta** — el docente pega una actividad, instrucción o evaluación → INNIA la ajusta
  manteniendo el objetivo de aprendizaje y reduciendo barreras.
- **✨ Crea** — genera actividades inclusivas por tema/materia: dividida en pasos, con
  apoyos visuales sugeridos, instrucciones sencillas y formas de participación.
- **🚨 ¿Qué hago?** — atajos a situaciones frecuentes del aula → orientación inmediata.

### 5.4 Funciones de apoyo
- **Copiar** respuesta al portapapeles.
- **Imprimir / exportar a PDF** una actividad o estrategia.
- **Historial local opcional** del propio docente (guardado en disco local, sin datos de
  estudiantes). Se puede borrar.

### 5.5 Distribución
- Instalador `.exe` (electron-builder, target NSIS).
- Binario alojado en **GitHub Releases** (no en Vercel).
- **Auto-update** con electron-updater leyendo de Releases.

## 6. Pieza B — Sitio hub

### 6.1 Stack
- **Next.js** (App Router) desplegado en **Vercel**.
- **CMS:** **Sanity** (headless) — contenido editable sin tocar código.
- **Estética:** liquid glass, accesible (alto contraste, tipografía legible), responsive.

### 6.2 Contenido gestionado en Sanity
Tipos de documento (schemas):
- `fichaAprende` — ficha educativa (condición: TDAH/TEA; área: atención, comunicación,
  interacción social, regulación emocional, instrucciones, aprendizaje; cuerpo en
  Portable Text; fuentes citadas).
- `estrategia` — estrategia de aula reutilizable (situación, qué hacer, qué evitar,
  adaptaciones, fuentes).
- `articuloBlog` — blog / novedades / notas de versión.
- `fuente` — referencia bibliográfica pública (para citar en fichas/estrategias).
- `paginaLegal` — privacidad, disclaimer, sobre INNIA.

### 6.3 Páginas
- **Inicio / Hero** — qué es, para quién, ángulo de privacidad, CTA Descargar.
- **Cómo funciona** — los 5 modos con ejemplos reales.
- **Descargar** — botón Windows `.exe`, versión, tamaño, **requisitos (RAM)**, pasos de
  instalación, aviso de primer arranque (instala Ollama + baja modelo).
- **Aprende** — contenido curado público navegable por condición/área (desde Sanity).
- **Blog / Novedades** — artículos y notas de versión (desde Sanity).
- **Confianza / Privacidad / Fuentes** — reglas de diseño explicadas al público.
- **FAQ** — gratis, internet, datos, requisitos de equipo.

### 6.4 Relación app ↔ base curada
La base curada se produce en la Fase 0 como datos estructurados (JSON/Markdown). De ahí:
- Se **importa a Sanity** (seed) para el sitio.
- Se **empaqueta con la app** (archivos + índice RAG).
Un único origen de verdad para el contenido; el formato se deriva a cada destino.

## 7. Pieza C / Fase 0 — Investigación y base curada

Investigación profunda (estilo del trabajo previo en Ladera), apoyada en búsqueda web y
subagentes especializados. Produce la base curada:

- Por **condición** (TDAH, TEA) y por **área**: atención, comunicación, interacción social,
  regulación emocional, seguimiento de instrucciones, aprendizaje, trabajo en grupo,
  frustración/abandono de tareas.
- Cada entrada: descripción en contexto educativo, dificultades típicas, **estrategias
  concretas de aula**, qué evitar, cómo adaptar/comunicar, y **fuentes públicas citadas**.
- Fuentes: guías y organizaciones reputadas (p. ej. lineamientos oficiales de educación,
  CDC, organizaciones de TDAH/TEA reconocidas). Solo material público; se cita.
- Entregable: `research/` con la base estructurada + un documento de fuentes, revisado
  antes de codificar el motor.

## 8. Alcance

### v1 (incluye)
- Fase 0 + base curada.
- App Windows: gestión de Ollama, 5 modos sobre core de chat, RAG local, guardarraíles,
  copiar/imprimir, historial local opcional.
- Sitio hub: todas las páginas, Sanity con los schemas, contenido "Aprende" y blog.
- Distribución vía GitHub Releases + auto-update.

### Fuera de v1
- macOS y móvil (iOS/Android).
- Cuentas de usuario / colegios / multi-tenant.
- Sincronización en la nube.
- Multiidioma (v1 es español).

## 9. Manejo de errores (puntos clave)
- **Ollama no instalado / no corriendo:** UI clara con pasos de recuperación; nunca un
  error crudo.
- **Equipo por debajo del mínimo de RAM:** aviso honesto + oferta del modelo pequeño.
- **Descarga de modelo interrumpida:** reintento reanudable.
- **RAG sin resultados relevantes:** el modelo responde con cautela y recuerda su límite
  (no inventar, no diagnosticar).
- **Sitio sin conexión a Sanity:** páginas estáticas/ISR con último contenido; degradar
  con elegancia.

## 10. Pruebas
- **RAG:** recupera los fragmentos correctos por tema/condición/área.
- **Guardarraíles:** rechaza solicitudes de datos de estudiantes y de diagnóstico;
  mantiene el encuadre educativo.
- **Arranque:** detecta/instala Ollama; aplica fallback de modelo por RAM.
- **Contenido:** set de situaciones de ejemplo (las provistas por el cliente) con
  respuestas revisadas.
- **Sitio:** render de fichas/blog desde Sanity; accesibilidad básica; descarga apunta a
  la release correcta.

## 11. Dependencias que requieren al usuario (fuera del alcance automatizable)
- Crear el proyecto en **Sanity** y autenticar (login/token).
- Crear repo en **GitHub** + publicar la Release con el `.exe`.
- **Deploy a Vercel** (cuenta/tokens).
- **Probar el instalador** en un Windows real con Ollama.

## 12. Nombre e identidad
- Producto: **INNIA**.
- Tono: cálido, práctico, respetuoso; nunca alarmista ni clínico.
