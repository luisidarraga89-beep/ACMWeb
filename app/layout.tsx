import type { Metadata, Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

const loraFont = Lora({ subsets: ["latin"], weight: ["400","500","600"], style: ["normal","italic"], variable: "--font-lora", display: "swap" });
const jakartaFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300","400","500","600","700","800"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://acminhogares.com"),
  title: { default: "ACM Hogares e Inversiones · Certeza en cada metro cuadrado.", template: "%s · ACM Hogares e Inversiones" },
  description: "Asesoría inmobiliaria honesta en Bogotá y la Sabana de Cundinamarca.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0F2044" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${loraFont.variable} ${jakartaFont.variable}`} suppressHydrationWarning>
      <head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /></head>
      <body className="bg-cream text-navy-deep antialiased" suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-orange-acm focus:text-white focus:rounded focus:font-semibold">Ir al contenido principal</a>
        <Navbar />
        <div className="flex flex-col min-h-screen">{children}</div>
        <Footer />
        <WhatsAppFAB delaySeconds={8} />
      </body>
    </html>
  );
}
