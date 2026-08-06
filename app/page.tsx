/**
 * ACM Hogares e Inversiones — Homepage
 * app/page.tsx
 *
 * Server Component root — metadata + layout shell.
 * All animated/interactive sections are in HomeClient.tsx.
 */

import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import HomeClient from "@/components/sections/HomeClient";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

export const metadata: Metadata = {
  title: "ACM Hogares e Inversiones · Certeza en cada metro cuadrado.",
  description:
    "Asesoría inmobiliaria honesta en Bogotá y la Sabana de Cundinamarca. Acompañamos a familias e inversionistas a tomar decisiones con claridad y respaldo real.",
  alternates: { canonical: "https://acminhogares.com" },
  openGraph: {
    title: "ACM Hogares e Inversiones · Certeza en cada metro cuadrado.",
    description:
      "Asesoría inmobiliaria honesta en Bogotá y la Sabana de Cundinamarca.",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection
          videoSrc="/video/hero.mp4"
          imageSrc="/images/hero-mobile.jpg"
          imageAlt="Arquitectura contemporánea en Bogotá — ACM Hogares e Inversiones"
        />
        <HomeClient />
      </main>
      <Footer />
      <WhatsAppFAB delaySeconds={8} />
    </>
  );
}
