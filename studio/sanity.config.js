import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index.js";

// Rellena projectId con el de tu proyecto Sanity (o vía SANITY_STUDIO_PROJECT_ID).
export default defineConfig({
  name: "innia",
  title: "INNIA — Contenido",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "lx7wxlcd",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
