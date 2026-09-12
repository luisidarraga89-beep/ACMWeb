import type { Metadata } from "next";
import NosotrosClient from "@/components/sections/nosotros/NosotrosClient";

export const metadata: Metadata = {
  title: "Nosotros · Quiénes somos, historia y valores",
  description:
    "Conoce a ACM Hogares e Inversiones: quiénes somos, nuestra historia, propósito, misión, visión y los valores que guían cada decisión inmobiliaria en Bogotá y todo Cundinamarca.",
  alternates: { canonical: "https://acminhogares.com/nosotros" },
  openGraph: {
    title: "Nosotros · ACM Hogares e Inversiones",
    description:
      "Quiénes somos, nuestra historia, propósito, misión, visión y valores.",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function NosotrosPage() {
  return (
    <main id="main-content">
      <NosotrosClient />
    </main>
  );
}