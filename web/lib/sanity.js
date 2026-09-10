import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Cliente solo si hay proyecto configurado; si no, el sitio usa el contenido de respaldo.
export const sanityConfigurado = Boolean(projectId);

export const sanity = sanityConfigurado
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-09-01",
      useCdn: true,
    })
  : null;
