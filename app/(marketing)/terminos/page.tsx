import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import TerminosContent from "@/components/sections/legal/TerminosContent";

export const metadata: Metadata = buildMetadata({
  title:       "Términos y Condiciones de Uso",
  description: "Condiciones que rigen el uso del sitio web de ACM Hogares e Inversiones y de la información publicada sobre nuestras propiedades y servicios.",
  path:        "/terminos",
});

export default function TerminosPage() {
  return (
    <main id="main-content">
      <TerminosContent />
    </main>
  );
}
