/**
 * content/properties/index.ts
 *
 * Property data access layer.
 * Pre-CMS: reads from static TypeScript files in this directory.
 * Post-CMS: replace function bodies with Sanity GROQ queries.
 * Component API remains identical — zero component changes on migration.
 */

import { Property } from "@/types/property";

const properties: Property[] = [
  {
    _id:          "p1",
    slug:         "apartamento-chico-norte",
    title:        "Penthouse con terrazas",
    excerpt:      "Dos terrazas privadas con vista panorámica sobre Chicó Norte. 186 m² de espacios generosos y acabados de alto estándar.",
    description:  "Penthouse en piso 18 con acceso privado. Diseño contemporáneo, dos terrazas con orientación norte y sur, cocina abierta de concepto europeo, tres habitaciones en suite.",
    status:       "venta",
    type:         "penthouse",
    zone:         "bogota",
    neighborhood: "Chicó Norte",
    city:         "Bogotá",
    area:         "186 m²",
    bedrooms:     3,
    bathrooms:    3,
    parking:      2,
    floor:        18,
    priceDisplay: "Consultar",
    images:       [{ url: "/images/property-1.webp", alt: "Penthouse Chicó Norte", width: 900, height: 1200, isPrimary: true }],
    featured:     true, featuredOrder: 1, investment: false,
    tags:         ["penthouse", "terraza", "chico"],
    publishedAt:  "2025-01-15T00:00:00Z", updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    _id:          "p2",
    slug:         "casa-chia-sabana",
    title:        "Casa campestre con jardín",
    excerpt:      "Casa de tres plantas en condominio privado de Chía. Jardín propio de 180 m², piscina comunitaria y seguridad 24 horas.",
    description:  "Casa campestre en conjunto cerrado con alta valorización proyectada sobre la vía Bogotá-Chía.",
    status:       "venta",
    type:         "casa",
    zone:         "chia",
    neighborhood: "Condominio El Bosque",
    city:         "Chía",
    area:         "312 m²",
    bedrooms:     4, bathrooms: 4, parking: 2,
    priceDisplay: "Consultar",
    images:       [{ url: "/images/property-2.webp", alt: "Casa campestre Chía", width: 1200, height: 750, isPrimary: true }],
    featured:     true, featuredOrder: 2, investment: true,
    tags:         ["casa", "chia", "sabana", "inversion"],
    publishedAt:  "2025-02-01T00:00:00Z", updatedAt: "2025-02-01T00:00:00Z",
  },
  {
    _id:          "p3",
    slug:         "apartamento-rosales",
    title:        "Apartamento en piso 18",
    excerpt:      "Apartamento reformado en Rosales con vista despejada. Cocina de diseño, acabados premium, edificio con portería 24 horas.",
    description:  "Apartamento en una de las zonas más consolidadas de Bogotá, reformado integralmente en 2023.",
    status:       "venta",
    type:         "apartamento",
    zone:         "bogota",
    neighborhood: "Rosales",
    city:         "Bogotá",
    area:         "124 m²",
    bedrooms:     2, bathrooms: 2, parking: 1, floor: 18,
    priceDisplay: "Consultar",
    images:       [{ url: "/images/property-3.webp", alt: "Apartamento Rosales", width: 1200, height: 750, isPrimary: true }],
    featured:     true, featuredOrder: 3, investment: true,
    tags:         ["apartamento", "rosales", "inversion"],
    publishedAt:  "2025-02-15T00:00:00Z", updatedAt: "2025-02-15T00:00:00Z",
  },
];

export const getAllProperties  = ()              => [...properties].sort((a,b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
export const getFeaturedProperties = ()         => properties.filter(p => p.featured).sort((a,b) => (a.featuredOrder??99)-(b.featuredOrder??99));
export const getPropertyBySlug = (slug: string) => properties.find(p => p.slug === slug);
export const getInvestmentProperties = ()       => properties.filter(p => p.investment);
export const getPropertiesByZone = (zone: Property["zone"]) => properties.filter(p => p.zone === zone);
