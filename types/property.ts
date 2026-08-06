/**
 * types/property.ts
 * Sanity-compatible shape. When CMS goes live, GROQ queries return this exact shape.
 */

export type PropertyStatus = "venta" | "arriendo" | "vendido" | "reservado";
export type PropertyType   = "apartamento" | "casa" | "oficina" | "lote" | "local" | "penthouse";
export type PropertyZone   = "bogota" | "chia" | "cajica" | "cota" | "sabana" | "otro";

export interface PropertyImage {
  url:    string;
  alt:    string;
  width:  number;
  height: number;
  isPrimary?: boolean;
}

export interface Property {
  _id:          string;
  slug:         string;

  // Display
  title:        string;
  excerpt:      string;       // 1-2 sentences, used in cards and meta
  description:  string;       // Full editorial body, used in detail page

  // Classification
  status:       PropertyStatus;
  type:         PropertyType;
  zone:         PropertyZone;
  neighborhood: string;
  city:         string;

  // Metrics
  area:         string;       // "186 m²"
  bedrooms?:    number;
  bathrooms?:   number;
  parking?:     number;
  floor?:       number;
  totalFloors?: number;
  yearBuilt?:   number;

  // Financials — optional, ACM leads with consultation not price
  price?:        number;      // raw COP value for sorting
  priceDisplay?: string;      // "Consultar" | "Desde $450M"

  // Media
  images:       PropertyImage[];
  videoUrl?:    string;
  virtualTourUrl?: string;

  // Homepage placement
  featured:     boolean;
  featuredOrder?: number;     // 1-based, controls grid order

  // Categorisation
  investment:   boolean;      // Appears on /inversiones
  tags:         string[];

  // SEO
  metaTitle?:       string;
  metaDescription?: string;

  // Timestamps
  publishedAt: string;
  updatedAt:   string;
}
