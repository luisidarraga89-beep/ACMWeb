import type { Metadata } from "next";
import InversionesClient from "@/components/sections/inversiones/InversionesClient";

export const metadata: Metadata = {
  title: "Inversiones · Invierte con criterio, construye patrimonio",
  description:
    "Te ayudamos a encontrar, analizar y gestionar oportunidades inmobiliarias en Bogotá y todo Cundinamarca, desde tu primera inversión hasta la gestión de alquileres en cualquier parte del país.",
  alternates: { canonical: "https://acminhogares.com/inversiones" },
};

export default function InversionesPage() {
  return (
    <main id="main-content">
      <InversionesClient />
    </main>
  );
}
