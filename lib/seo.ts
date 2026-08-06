/**
 * lib/seo.ts
 *
 * Shared metadata factory. Every page calls buildMetadata().
 * Ensures consistent OG, Twitter card, canonical, and robots across all routes.
 */

import type { Metadata } from "next";
import { siteConfig } from "./config";

interface PageSeoProps {
  title:        string;
  description:  string;
  path:         string;
  image?:       string;
  noIndex?:     boolean;
  type?:        "website" | "article";
  publishedAt?: string;
  author?:      string;
}

export function buildMetadata({
  title,
  description,
  path,
  image     = "/og/og-default.jpg",
  noIndex   = false,
  type      = "website",
  publishedAt,
  author,
}: PageSeoProps): Metadata {
  const fullTitle = `${title} · ${siteConfig.name}`;
  const url       = `${siteConfig.url}${path}`;

  return {
    title:            fullTitle,
    description,
    metadataBase:     new URL(siteConfig.url),
    alternates:       { canonical: url },
    robots:           noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },

    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale:   siteConfig.locale,
      type,
      images:   [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(author      && { authors: [author] }),
    },

    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [image],
    },
  };
}

/** Local SEO keyword sets — use in page-level keyword metadata */
export const localKeywords = {
  bogota:    ["inmobiliaria bogotá", "comprar apartamento bogotá", "asesor inmobiliario bogotá"],
  sabana:    ["propiedades sabana cundinamarca", "cajicá chía cota inmuebles"],
  inversion: ["inversión finca raíz colombia", "rentabilidad finca raíz bogotá"],
  hogares:   ["comprar vivienda bogotá", "crédito hipotecario colombia"],
  blog:      ["mercado inmobiliario colombia", "consejos compra vivienda"],
} as const;
