# INNIA — Sanity Studio

CMS del contenido educativo de INNIA (fichas, estrategias, blog, fuentes, páginas).

## Puesta en marcha (pasos del usuario)

1. Crea un proyecto en [sanity.io/manage](https://www.sanity.io/manage) y anota el **Project ID**.
2. Copia `.env.example` a `.env` y completa `SANITY_STUDIO_PROJECT_ID` y `SANITY_STUDIO_DATASET`.
   - Actualiza también `projectId` en `sanity.config.js` y `sanity.cli.js` (o usa las variables de entorno).
3. Instala dependencias y arranca el Studio:
   ```bash
   npm install
   npm run dev
   ```
4. Para cargar el contenido inicial desde la base curada (`research/`), crea un **token de
   escritura** en sanity.io/manage → API → Tokens, ponlo en `.env` (`SANITY_WRITE_TOKEN`) y ejecuta:
   ```bash
   npm run seed
   ```
5. Despliega el Studio (opcional): `npm run deploy`.

## Conectar el sitio

En `web/`, crea `.env.local` con:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```
Sin estas variables, el sitio usa el contenido de respaldo generado desde `research/`.

## Regla de contenido

Todo el contenido es **educativo, no clínico**. No incluir datos de estudiantes ni contenido
diagnóstico. Las referencias clínicas se citan y parafrasean; no se copia su texto protegido.
