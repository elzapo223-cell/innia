# Base curada de INNIA (Fase 0)

Conocimiento pedagógico estructurado sobre TDAH y TEA en el aula. Es el **origen de
verdad** del que se derivan el RAG de la app de escritorio y el contenido del sitio.

## Estructura

```
research/
├─ schema/            JSON Schema de fuentes y entradas
│  ├─ fuente.schema.json
│  └─ entrada.schema.json
├─ fuentes/
│  └─ fuentes.json    Fuentes públicas reputadas + clínicas de autoridad (DSM-5-TR, CIE-11, NICE)
├─ base/
│  └─ <area>-<condicion>.json   Entradas de estrategias (arreglos), validadas contra el schema
├─ aprende/
│  └─ *.md            Fichas informativas ("¿Qué es TDAH/TEA?") para la sección Aprende
├─ scripts/
│  └─ validate.mjs    Validación + reporte de cobertura
├─ COBERTURA.md       Matriz condición×área y checklist de situaciones del cliente
└─ README.md
```

## Modelo de datos

- **Fuente** (`fuentes/fuentes.json`): referencia citable (id, título, organización, tipo,
  url). Incluye fuentes clínicas de autoridad **solo para fundamentar** características en
  contexto educativo — nunca para diagnosticar.
- **Entrada** (`base/*.json`): unidad de estrategia por `condicion` × `area`, con
  `contextoEducativo`, `dificultadesTipicas`, `estrategias`, `queEvitar`, `comoAdaptar`,
  `comoComunicar`, `situacionesRapidas` y `fuentes[]`. Ver el contrato en el plan
  `docs/superpowers/plans/2026-09-09-fase0-base-curada.md`.
- **Ficha Aprende** (`aprende/*.md`): contenido informativo con frontmatter; parafrasea
  fuentes clínicas (sin reproducir texto con derechos de autor) y lleva disclaimer
  educativo/no clínico.

## Regla ética (no negociable)

Todo el contenido es **educativo, no clínico**. INNIA **no diagnostica, no etiqueta y no
receta**. Las fuentes clínicas (DSM-5-TR, CIE-11, NICE) se usan para dar rigor a las
descripciones y estrategias, no para clasificar a un estudiante. No se incluyen datos
personales de estudiantes.

## Validación

```bash
cd research
npm install
node scripts/validate.mjs          # valida + reporte de cobertura (situaciones = advertencia)
node scripts/validate.mjs --strict # exige 6/6 situaciones del cliente (usar al cierre)
```

## Cómo se deriva

- **App (RAG):** `base/*.json` → embeddings (`nomic-embed-text`) → índice SQLite. Cada
  respuesta cita las `fuentes[]` de las entradas recuperadas.
- **Sitio (Sanity):** `base/*.json` → seed de documentos `estrategia`; `aprende/*.md` →
  documentos `fichaAprende`; `fuentes.json` → documentos `fuente`.

Un solo insumo, dos destinos: la calidad del contenido vive aquí.
