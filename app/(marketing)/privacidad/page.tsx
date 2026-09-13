import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PrivacidadContent from "@/components/sections/legal/PrivacidadContent";

export const metadata: Metadata = buildMetadata({
  title:       "Política de Tratamiento de Datos Personales",
  description: "Cómo ACM Hogares e Inversiones recolecta, usa y protege tus datos personales, en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.",
  path:        "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <main id="main-content">
      <PrivacidadContent />
    </main>
  );
}
