# INNIA — Guía de despliegue

Pasos que dependen de tus cuentas (yo dejo todo el código y la configuración listos;
estos clics/credenciales son tuyos). Rutas relativas a `D:\proyectos\INNIA`.

---

## 1. App de escritorio — instalador `.exe`

**Construir el instalador (local, no necesita cuenta):**
```bash
cd D:\proyectos\INNIA\desktop
npm install        # solo la primera vez
npm run build:app  # genera el instalador con electron-builder
```
El instalador queda en `desktop/release/INNIA-Setup-0.1.0.exe`.

**Publicarlo para que otros lo descarguen (GitHub Releases — recomendado):**
1. Crea un repo en GitHub (p. ej. `innia`) y sube el proyecto.
2. En GitHub → **Releases** → *Draft a new release* → sube el `.exe` como asset y publica.
3. Copia el enlace directo del `.exe` (termina en `.exe`).
4. En el sitio, define la variable `NEXT_PUBLIC_DOWNLOAD_URL` con ese enlace (ver §2) para
   activar el botón de descarga.

**Auto-actualización (opcional, fase posterior):** electron-updater leyendo de GitHub
Releases. Requiere configurar `publish` en `electron-builder` y un token; se deja para v1.1.

> Nota: el instalador no está firmado. Windows SmartScreen mostrará un aviso de
> "editor desconocido" la primera vez (Más info → Ejecutar de todos modos). Firmarlo
> requiere un certificado de code signing (costo anual); opcional para v1.

---

## 2. Sitio web — Vercel

**Desplegar:**
1. Sube el repo a GitHub (el mismo o uno aparte para `web/`).
2. En Vercel → *New Project* → importa el repo. Root directory: `web`.
3. Framework: Next.js (autodetectado). Deploy.

**Variables de entorno (Vercel → Project → Settings → Environment Variables):**
```
NEXT_PUBLIC_DOWNLOAD_URL      = <enlace directo al .exe en GitHub Releases>   # opcional
NEXT_PUBLIC_SANITY_PROJECT_ID = <tu project id de Sanity>                     # opcional
NEXT_PUBLIC_SANITY_DATASET    = production                                    # opcional
```
Sin las variables de Sanity, el sitio funciona con el **contenido de respaldo** generado
desde `research/` (no queda vacío). Con ellas, lee el contenido en vivo desde Sanity.

> El error `EISDIR: readlink` que aparece en `next build` **en Windows** es un bug local
> de webpack+Node 22; en Vercel (Linux) el build corre sin problema. No requiere acción.

---

## 3. Contenido — Sanity (CMS)

Ver también `studio/README.md`.

1. Crea un proyecto en https://www.sanity.io/manage y anota el **Project ID**.
2. En `studio/`, copia `.env.example` a `.env` y completa:
   ```
   SANITY_STUDIO_PROJECT_ID=<tu project id>
   SANITY_STUDIO_DATASET=production
   SANITY_WRITE_TOKEN=<token de escritura, para el seed>
   ```
   Actualiza también `projectId` en `studio/sanity.config.js` (o usa las variables).
3. Instala y arranca el Studio:
   ```bash
   cd D:\proyectos\INNIA\studio
   npm install
   npm run dev        # edita contenido en http://localhost:3333
   ```
4. Carga el contenido inicial desde la base curada:
   ```bash
   npm run seed       # importa fuentes, estrategias y fichas de research/
   ```
5. Conecta el sitio poniendo `NEXT_PUBLIC_SANITY_PROJECT_ID` en `web/.env.local` (local) y
   en Vercel (producción).

---

## 4. Motor de IA local (lo hace el docente al instalar, no tú)

La app instala/gestiona **Ollama** en el primer arranque y descarga el modelo según la RAM
del equipo. No hay nada que desplegar del lado servidor: el motor vive en el computador
del docente. Requisitos y pasos están en la página **Descargar** del sitio.

---

## Resumen de qué falta (tuyo)
- [ ] Crear repo en GitHub y subir el proyecto.
- [ ] Publicar el `.exe` en GitHub Releases y copiar su enlace.
- [ ] Crear proyecto en Sanity + `.env` + `npm run seed`.
- [ ] Deploy del sitio en Vercel con las variables de entorno.
- [ ] Probar el instalador en un Windows real con Ollama.
