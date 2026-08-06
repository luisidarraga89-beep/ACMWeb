/**
 * lib/config.ts
 *
 * Single source for all runtime configuration.
 * No hardcoded phone numbers, emails, or API IDs anywhere else in the codebase.
 * Update once here — propagates everywhere.
 */

export const siteConfig = {
  url:      process.env.NEXT_PUBLIC_SITE_URL ?? "https://acminhogares.com",
  name:     "ACM Hogares e Inversiones",
  tagline:  "Certeza en cada metro cuadrado.",
  locale:   "es-CO",

  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
    email:    process.env.NEXT_PUBLIC_CONTACT_EMAIL   ?? "contacto@acminhogares.com",
    phone:    process.env.NEXT_PUBLIC_PHONE           ?? "+57 300 123 4567",
    city:     "Bogotá, Colombia",
  },

  social: {
    instagram: "https://www.instagram.com/acminhogares",
    facebook:  "https://www.facebook.com/acminhogares",
    linkedin:  "https://www.linkedin.com/company/acminhogares",
    whatsapp:  "https://wa.me/573001234567",
  },

  analytics: {
    ga4Id:       process.env.NEXT_PUBLIC_GA4_ID        ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    gtmId:       process.env.NEXT_PUBLIC_GTM_ID        ?? "",
  },

  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production",
    apiVersion:"2024-01-01",
  },
} as const;

/**
 * Build a WhatsApp deep-link with a pre-filled message.
 * Use this everywhere instead of building the URL inline.
 */
export function whatsappUrl(message?: string): string {
  const number = siteConfig.contact.whatsapp;
  const text   = encodeURIComponent(
    message ?? "Hola, me gustaría recibir asesoría inmobiliaria"
  );
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Typed analytics event dispatcher.
 * Import and call trackEvent() — never call gtag/fbq directly.
 */
export type AnalyticsEvent =
  | { name: "whatsapp_click";      intent?: string }
  | { name: "contact_form_submit"; intent:  string }
  | { name: "property_view";       slug: string; zone: string }
  | { name: "blog_article_view";   slug: string }
  | { name: "cta_click";           label: string; section: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const { name, ...props } = event;
  (window as any).gtag?.("event", name, props);
  (window as any).fbq?.("track", "CustomEvent", { event_name: name, ...props });
}
