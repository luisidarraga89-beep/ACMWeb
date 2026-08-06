export const siteConfig = {
  url:     process.env.NEXT_PUBLIC_SITE_URL ?? "https://acminhogares.com",
  name:    "ACM Hogares e Inversiones",
  tagline: "Certeza en cada metro cuadrado.",
  locale:  "es-CO",

  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573227340446",
    email:    process.env.NEXT_PUBLIC_CONTACT_EMAIL   ?? "christian@acminhogares.com",
    phone:    process.env.NEXT_PUBLIC_PHONE           ?? "+57 322 734 0446",
    city:     "Bogotá, Colombia",
  },

  social: {
    instagram: "https://www.instagram.com/acmproperty12",
    facebook:  "https://www.facebook.com/profile.php?id=61552925627486",
    linkedin:  "https://www.linkedin.com/company/acminhogares",
    whatsapp:  "https://wa.me/573227340446",
  },

  analytics: {
    ga4Id:       process.env.NEXT_PUBLIC_GA4_ID        ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
} as const;

export function whatsappUrl(message?: string): string {
  const number = siteConfig.contact.whatsapp;
  const text   = encodeURIComponent(
    message ?? "Hola, me gustaría recibir asesoría inmobiliaria"
  );
  return `https://wa.me/${number}?text=${text}`;
}
