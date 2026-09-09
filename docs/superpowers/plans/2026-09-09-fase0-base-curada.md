# Plan 0 — Fase de investigación y base curada de INNIA

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Producir una base de conocimiento curada, estructurada y con fuentes públicas citadas, sobre estrategias de aula para estudiantes con TDAH y TEA, que alimente a la vez el RAG de la app de escritorio y el contenido del sitio (Sanity).

**Architecture:** Investigación por condición (TDAH/TEA) y por área pedagógica. Cada hallazgo se registra como una **entrada estructurada** (JSON) que referencia **fuentes** (JSON). Un único origen de verdad en `research/base/` y `research/fuentes/`, del que luego se derivan el índice RAG (app) y el seed de Sanity (sitio).

**Tech Stack:** Investigación con búsqueda web; salida en JSON validado contra un JSON Schema; validador en Node (script) para garantizar integridad referencial (cada entrada cita fuentes existentes) y cobertura.

## Global Constraints

- **Idioma:** todo el contenido en **español** (Colombia).
- **Cero datos de estudiantes:** el contenido es general y anónimo; nunca incluye casos identificables.
- **No clínico:** el material es orientación **pedagógica**, no diagnóstico ni tratamiento. Cada entrada debe poder leerse sin etiquetar ni patologizar al estudiante.
- **Fuentes obligatorias:** toda entrada cita al menos **1 fuente pública reputada** existente en `research/fuentes/`.
- **Áreas canónicas** (enum fijo): `atencion`, `comunicacion`, `interaccion-social`, `regulacion-emocional`, `instrucciones`, `aprendizaje`, `trabajo-en-grupo`, `motivacion-tareas`, `sensorial`.
- **Condiciones** (enum fijo): `TDAH`, `TEA`, `ambos`.

---

## Contrato de datos (interfaz compartida — la definen las Tasks 1–2)

**Fuente** (`research/fuentes/*.json`, una por archivo o un arreglo en `fuentes.json`):
```json
{
  "id": "cdc-adhd-classroom",
  "titulo": "...",
  "organizacion": "CDC",
  "tipo": "guia-oficial | organizacion | articulo-academico | ministerio",
  "url": "https://...",
  "idiomaOriginal": "es | en",
  "consultado": "2026-09-09"
}
```

**Entrada de la base** (`research/base/*.json`):
```json
{
  "id": "tdah-atencion-transiciones",
  "condicion": "TDAH",
  "area": "atencion",
  "titulo": "Sostener la atención en cambios de actividad",
  "contextoEducativo": "Cómo se manifiesta en el aula (2-4 frases, sin etiquetar).",
  "dificultadesTipicas": ["...", "..."],
  "estrategias": [
    { "que": "Anticipar las transiciones", "como": "Avisar 5 y 2 min antes con apoyo visual/temporizador", "ejemplo": "..." }
  ],
  "queEvitar": ["..."],
  "comoAdaptar": ["..."],
  "comoComunicar": ["..."],
  "situacionesRapidas": ["Se distrae constantemente", "No termina la actividad"],
  "fuentes": ["cdc-adhd-classroom"]
}
```

- `situacionesRapidas`: strings en lenguaje natural que alimentan el modo **🚨 ¿Qué hago?** y mejoran el recall del RAG. Deben cubrir las situaciones de ejemplo del cliente.

**Situaciones de ejemplo del cliente (cobertura obligatoria):** "no quiere realizar la actividad", "no comprende las instrucciones", "se distrae constantemente", "se frustró y no quiere continuar", "dificultad para trabajar en grupo", "cómo explicar la actividad de otra manera".

---

## File Structure

- `research/schema/fuente.schema.json` — JSON Schema de una fuente.
- `research/schema/entrada.schema.json` — JSON Schema de una entrada.
- `research/fuentes/fuentes.json` — arreglo de fuentes.
- `research/base/<area>-<condicion>.json` — entradas agrupadas por archivo (arreglos).
- `research/scripts/validate.mjs` — validador (integridad referencial + cobertura + enums).
- `research/README.md` — cómo está organizada la base y cómo se deriva a app/sitio.
- `research/COBERTURA.md` — matriz condición×área y checklist de situaciones del cliente.

---

### Task 1: Esquemas JSON y validador

**Files:**
- Create: `research/schema/fuente.schema.json`
- Create: `research/schema/entrada.schema.json`
- Create: `research/scripts/validate.mjs`
- Create: `research/package.json` (deps: `ajv`, `ajv-formats`, `glob`)

**Interfaces:**
- Produces: los dos JSON Schema (contrato de datos de arriba) y `node research/scripts/validate.mjs` que valida todos los `research/fuentes/*.json` y `research/base/*.json`, verifica enums, integridad referencial (`entrada.fuentes[]` existen), y reporta cobertura de situaciones del cliente. Sale con código ≠0 si algo falla.

- [ ] **Step 1:** Escribir `fuente.schema.json` y `entrada.schema.json` con los campos y enums del contrato (áreas, condiciones, tipos de fuente).
- [ ] **Step 2:** Escribir `research/package.json` con `"type": "module"` y dependencias `ajv`, `ajv-formats`, `glob`. Ejecutar `npm install` en `research/`.
- [ ] **Step 3:** Escribir `validate.mjs`: carga schemas, valida cada archivo, chequea que cada `id` sea único, que cada `fuentes[]` referencie una fuente existente, y que las 6 situaciones del cliente aparezcan en al menos una `situacionesRapidas`. Imprime resumen de cobertura por condición×área.
- [ ] **Step 4:** Crear un `research/fuentes/fuentes.json` mínimo (1 fuente) y una entrada de prueba, correr `node research/scripts/validate.mjs`. Esperado: PASS con reporte de cobertura mostrando huecos.
- [ ] **Step 5:** Commit: `git add research && git commit -m "chore(research): esquemas y validador de la base curada"`.

---

### Task 2: Fuentes públicas reputadas

**Files:**
- Modify: `research/fuentes/fuentes.json`
- Create: `research/COBERTURA.md`

**Interfaces:**
- Consumes: esquema de fuente (Task 1).
- Produces: `fuentes.json` poblado con fuentes reputadas (organizaciones, guías oficiales, ministerios, material académico accesible) que respaldarán las entradas; `COBERTURA.md` con la matriz condición×área vacía para ir marcando.

- [ ] **Step 1:** Investigar y registrar ≥ 10 fuentes públicas reputadas sobre TDAH/TEA en contexto educativo (mezcla ES/EN), con URL y organización. Priorizar guías de aula y material para docentes.
- [ ] **Step 2:** Escribir `COBERTURA.md` con una tabla condición×área (9 áreas × 3 condiciones) y el checklist de las 6 situaciones del cliente.
- [ ] **Step 3:** `node research/scripts/validate.mjs` → PASS (fuentes válidas).
- [ ] **Step 4:** Commit: `git add research && git commit -m "research: fuentes publicas reputadas + matriz de cobertura"`.

---

### Task 3: Entradas TDAH (todas las áreas)

**Files:**
- Create: `research/base/atencion-tdah.json`, `motivacion-tareas-tdah.json`, `instrucciones-tdah.json`, `regulacion-emocional-tdah.json`, `trabajo-en-grupo-tdah.json`, `aprendizaje-tdah.json` (arreglos de entradas)

**Interfaces:**
- Consumes: esquema de entrada (Task 1), fuentes (Task 2).
- Produces: entradas TDAH que cubren las áreas relevantes y las situaciones del cliente aplicables.

- [ ] **Step 1:** Redactar entradas TDAH por área (mín. 2 por área relevante), cada una con estrategias concretas, qué evitar, cómo adaptar/comunicar, `situacionesRapidas` y `fuentes[]` reales.
- [ ] **Step 2:** Marcar avance en `COBERTURA.md`.
- [ ] **Step 3:** `node research/scripts/validate.mjs` → PASS; revisar reporte de cobertura.
- [ ] **Step 4:** Commit: `git add research && git commit -m "research: entradas TDAH por area"`.

---

### Task 4: Entradas TEA (todas las áreas)

**Files:**
- Create: `research/base/comunicacion-tea.json`, `interaccion-social-tea.json`, `regulacion-emocional-tea.json`, `sensorial-tea.json`, `instrucciones-tea.json`, `aprendizaje-tea.json`, `trabajo-en-grupo-tea.json` (arreglos)

**Interfaces:**
- Consumes: esquema de entrada (Task 1), fuentes (Task 2).
- Produces: entradas TEA que cubren las áreas relevantes y las situaciones del cliente aplicables.

- [ ] **Step 1:** Redactar entradas TEA por área (mín. 2 por área relevante), con el mismo rigor de la Task 3.
- [ ] **Step 2:** Marcar avance en `COBERTURA.md`.
- [ ] **Step 3:** `node research/scripts/validate.mjs` → PASS.
- [ ] **Step 4:** Commit: `git add research && git commit -m "research: entradas TEA por area"`.

---

### Task 5: Entradas transversales ("ambos") + cierre de cobertura

**Files:**
- Create: `research/base/instrucciones-ambos.json`, `aprendizaje-ambos.json`
- Modify: `research/COBERTURA.md`
- Create: `research/README.md`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: entradas aplicables a ambas condiciones (p. ej. dar instrucciones claras, universal design for learning), cobertura completa de las 6 situaciones del cliente, y `README.md` que explica cómo se deriva la base a app (RAG) y sitio (Sanity).

- [ ] **Step 1:** Redactar entradas transversales que refuercen las situaciones del cliente aún no cubiertas al 100%.
- [ ] **Step 2:** Completar `COBERTURA.md` (toda situación del cliente con ≥1 entrada) y escribir `README.md`.
- [ ] **Step 3:** `node research/scripts/validate.mjs` → PASS con **cobertura de situaciones del cliente = 6/6**.
- [ ] **Step 4:** Commit: `git add research && git commit -m "research: entradas transversales + cobertura completa"`.

---

## Self-Review (cobertura del spec)

- Spec §7 (Fase 0 base curada): Tasks 1–5. ✔
- Spec §3 reglas (anónimo, no clínico, fuentes): Global Constraints + validador. ✔
- Spec situaciones de ejemplo del cliente: validador exige 6/6. ✔
- Interfaz compartida app↔sitio: contrato de datos + `README.md` (Task 5). ✔

## Execution Handoff

Al terminar este plan, la base curada queda lista y se escriben el **Plan A (app escritorio)** y el **Plan B (sitio + Sanity)** ya informados por el esquema real de datos.
