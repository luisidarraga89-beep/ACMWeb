import { ComponentType } from "react";
import CreditoHipotecarioColombia from "./credito-hipotecario-colombia";
import ComoSaberSiUnaPropiedadEsBuenaInversion from "./como-saber-si-una-propiedad-es-buena-inversion";
import ComoSaberCuantoValeMiVivienda from "./como-saber-cuanto-vale-mi-vivienda";
import GestionarAlquilerPropiedad from "./gestionar-alquiler-propiedad";

export const BLOG_BODY_REGISTRY: Record<string, ComponentType> = {
  "credito-hipotecario-colombia":                     CreditoHipotecarioColombia,
  "como-saber-si-una-propiedad-es-buena-inversion":   ComoSaberSiUnaPropiedadEsBuenaInversion,
  "como-saber-cuanto-vale-mi-vivienda":                ComoSaberCuantoValeMiVivienda,
  "gestionar-alquiler-propiedad":                      GestionarAlquilerPropiedad,
};
