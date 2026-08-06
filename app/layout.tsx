import type { Metadata, Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* ─── GOOGLE FONTS ───────────────────────────────────────────────────────
   Manual de Identidad v1.0:
   · Display / claims:  Lora (Google Fonts)
   · Body / UI:         Plus Jakarta Sans (Google Fonts)
   · Datos técnicos:    Monospace (system) — sin carga de red
   ─────────────────────────────────────────────────────────────────────── */

const loraFont = Lora({
  subsets:  ["latin"],
  weight:   ["400", "500", "600"],
  style:    ["normal", "italic"],
  variable: "--font-lora",
  display:  "swap",
  preload:  true,
});

const jakartaFont = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700", "800"],
  style:    ["normal"],
  variable: "--font-jakarta",
  display:  "swap",
  preload:  true,
});

/* ─── SEO METADATA ───────────────────────────────────────────────────────
   Structured for Colombia real estate + local SEO in Bogotá & Sabana.
   Open Graph optimized for WhatsApp shares (common in Colombian market).
   ─────────────────────────────────────────────────────────────────────── */

const siteConfig = {
  name:        "ACM Hogares e Inversiones",
  tagline:     "Certeza en cada metro cuadrado.",
  url:         "https://acminhogares.com",
  locale:      "es_CO",
  description: "Asesoría inmobiliaria honesta en Bogotá y la Sabana de Cundinamarca. Acompañamos a familias e inversionistas a tomar decisiones inmobiliarias con claridad, seguridad y respaldo real.",
  keywords: [
    "inmobiliaria bogotá",
    "comprar apartamento bogotá",
    "inversión finca raíz colombia",
    "asesoría inmobiliaria bogotá",
    "propiedades sabana cundinamarca",
    "cajicá chía cota inmuebles",
    "crédito hipotecario colombia",
    "ACM Hogares",
    "comprar vivienda bogotá",
    "inmobiliaria cundinamarca",
    "invertir en finca raíz bogotá",
    "asesor inmobiliario bogotá",
  ],
  authors: [
    { name: "ACM Hogares e Inversiones", url: "https://acminhogares.com" },
  ],
  creator:  "ACM Hogares e Inversiones",
  publisher: "ACM Hogares e Inversiones",
};

export const metadata: Metadata = {
  // ── Base ──────────────────────────────────────────────────────────────
  metadataBase: new URL(siteConfig.url),
  title: {
    default:  `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords:    siteConfig.keywords,
  authors:     siteConfig.authors,
  creator:     siteConfig.creator,
  publisher:   siteConfig.publisher,

  // ── Robots ────────────────────────────────────────────────────────────
  robots: {
    index:          true,
    follow:         true,
    nocache:        false,
    googleBot: {
      index:           true,
      follow:          true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":   -1,
    },
  },

  // ── Open Graph (Facebook, WhatsApp, LinkedIn) ─────────────────────────
  openGraph: {
    type:        "website",
    locale:      siteConfig.locale,
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    title:       `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url:    "/og/og-default.jpg", // 1200×630 navy background + logo
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    site:        "@acminhogares",
    creator:     "@acminhogares",
    title:       `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images:      ["/og/og-default.jpg"],
  },

  // ── Verification (agregar cuando se tengan las cuentas) ───────────────
  // verification: {
  //   google: "GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },

  // ── Alternate languages ───────────────────────────────────────────────
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "es-CO": siteConfig.url,
    },
  },

  // ── App / PWA manifest ────────────────────────────────────────────────
  manifest: "/manifest.json",

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple:   [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg", color: "#0F2044" },
    ],
  },

  // ── Category ─────────────────────────────────────────────────────────
  category: "real estate",
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F2044" },
    { media: "(prefers-color-scheme: dark)",  color: "#0F2044" },
  ],
};

/* ─── STRUCTURED DATA (JSON-LD) ──────────────────────────────────────────
   LocalBusiness schema: mejora visibilidad en Google Maps / Knowledge Graph
   y en búsquedas locales "inmobiliaria bogotá".
   ─────────────────────────────────────────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id":   `${siteConfig.url}/#organization`,
  name:    siteConfig.name,
  alternateName: "ACM",
  slogan:  siteConfig.tagline,
  description: siteConfig.description,
  url:     siteConfig.url,
  logo: {
    "@type":       "ImageObject",
    url:           `${siteConfig.url}/images/acm-logo.png`,
    width:         280,
    height:        280,
  },
  image: `${siteConfig.url}/og/og-default.jpg`,
  address: {
    "@type":           "PostalAddress",
    addressLocality:   "Bogotá",
    addressRegion:     "Cundinamarca",
    addressCountry:    "CO",
    postalCode:        "110111",
  },
  geo: {
    "@type":    "GeoCoordinates",
    latitude:   4.7110,
    longitude:  -74.0721,
  },
  areaServed: [
    { "@type": "City", name: "Bogotá" },
    { "@type": "AdministrativeArea", name: "Cundinamarca" },
    { "@type": "Place", name: "Sabana de Bogotá" },
    { "@type": "City", name: "Cajicá" },
    { "@type": "City", name: "Chía" },
    { "@type": "City", name: "Cota" },
  ],
  serviceType: [
    "Compraventa de vivienda",
    "Asesoría inmobiliaria",
    "Inversión en finca raíz",
    "Crédito hipotecario",
    "Gestión documental notarial",
  ],
  knowsLanguage: ["es"],
  foundingDate: "2026",
  sameAs: [
    "https://www.instagram.com/acminhogares",
    "https://www.facebook.com/acminhogares",
    "https://wa.me/573001234567",
  ],
};

/* ─── ROOT LAYOUT ────────────────────────────────────────────────────────── */

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es-CO"
      className={`${loraFont.variable} ${jakartaFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to Google Fonts (ya manejado por next/font, pero seguro) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch para recursos externos frecuentes */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body
        className="bg-cream text-navy-deep antialiased"
        suppressHydrationWarning
      >
        {/* Skip to main content — accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-orange-acm focus:text-white focus:rounded focus:font-semibold"
        >
          Ir al contenido principal
        </a>

        {/* Layout principal — Navbar + main + Footer se inyectan aquí */}
        <div id="root" className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
