# INNIA — Sitio web (hub)

Landing + centro de descargas + contenido educativo (Aprende, Blog). Next.js (App Router)
con estética liquid glass. Usa **Sanity** como CMS; si aún no está configurado, cae al
contenido de respaldo generado desde `research/`.

## Desarrollo

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

`npm run dev` regenera antes `lib/content.generated.json` desde `research/` (respaldo).

## Variables de entorno (opcionales)

Crea `web/.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_DOWNLOAD_URL=https://github.com/<owner>/<repo>/releases/latest/download/INNIA-Setup.exe
```

- Sin `NEXT_PUBLIC_SANITY_*`, el sitio usa el contenido de respaldo (funciona igual).
- `NEXT_PUBLIC_DOWNLOAD_URL` activa el botón de descarga (apunta a GitHub Releases).

## Producción

Deploy recomendado en **Vercel** (Linux): `npm run build` compila sin problemas.

> ⚠️ **Nota de build local en Windows:** con Node 22 en Windows, `next build` puede fallar
> con `EISDIR: illegal operation on a directory, readlink ...` — es un bug conocido de webpack
> con esa combinación (no ocurre en Linux/Vercel). Para compilar localmente en Windows, usa
> **Node 20 LTS**. El servidor de desarrollo (`npm run dev`) funciona con cualquiera de las dos.

## Estructura

- `app/` — páginas (Inicio, Cómo funciona, Descargar, Aprende, Blog, Confianza, FAQ).
- `components/` — Nav, Footer, Reveal, Probador (chat demo), ModosTabs, AprendeFiltro.
- `lib/` — capa de contenido (Sanity + respaldo), cliente Sanity, markdown.
- `scripts/gen-content.mjs` — genera el respaldo desde `research/`.
