// Capa de contenido: usa Sanity si está configurado; si no, el respaldo generado
// desde la base curada (research/). Así el sitio funciona antes y después de Sanity.
import fallback from "./content.generated.json";
import { sanity, sanityConfigurado } from "./sanity.js";

export async function getFichas() {
  if (sanityConfigurado) {
    const q = `*[_type == "fichaAprende"]{ "id": slug.current, titulo, condicion, "body": bodyText }|order(titulo asc)`;
    try {
      const r = await sanity.fetch(q);
      if (r?.length) return r;
    } catch {
      /* cae al respaldo */
    }
  }
  return fallback.fichas;
}

export async function getFicha(id) {
  const fichas = await getFichas();
  return fichas.find((f) => f.id === id) || null;
}

export async function getArticulos() {
  if (sanityConfigurado) {
    const q = `*[_type == "articuloBlog"]{ "id": slug.current, titulo, resumen, fecha, "body": bodyText }|order(fecha desc)`;
    try {
      return await sanity.fetch(q);
    } catch {
      return [];
    }
  }
  return []; // Sin blog hasta que se configure Sanity.
}

export async function getArticulo(id) {
  const arts = await getArticulos();
  return arts.find((a) => a.id === id) || null;
}

export function getEstrategias() {
  return fallback.entradas;
}

export function getFuentes() {
  return fallback.fuentes;
}
