export type PropertyStatus = "venta" | "arriendo" | "vendido" | "reservado";

export type PropertyType =
  | "apartamento" | "apartaestudio" | "casa" | "casa-campestre" | "penthouse"
  | "duplex" | "finca" | "lote" | "oficina" | "local" | "bodega"
  | "parqueadero" | "edificio" | "consultorio";

export type PropertyZone   = "bogota" | "chia" | "cajica" | "cota" | "sabana" | "zipaquira" | "otro";

/** Vivienda nueva (obra nueva / sin estrenar) vs. usada (segunda mano). */
export type PropertyCondition = "nueva" | "usada";

export type PropertyAmenity =
  | "balcon" | "terraza" | "garaje" | "piscina" | "ascensor" | "amoblada"
  | "gimnasio" | "zona-social" | "vigilancia" | "deposito"
  | "aire-acondicionado" | "chimenea" | "vista-panoramica" | "zonas-verdes"
  | "cancha" | "bbq";

export interface PropertyImage {
  url:        string;
  alt:        string;
  width:      number;
  height:     number;
  isPrimary?: boolean;
}

export interface Property {
  _id:          string;
  slug:         string;
  headline:     string;      // Editorial concept — "Un hogar pensado para..."
  title:        string;      // Project name — "Alameda San Antonio II"
  excerpt:      string;
  description:  string;
  highlights:   string[];
  zoneText:     string;      // About the zone — SEO local
  status:       PropertyStatus;
  type:         PropertyType;
  zone:         PropertyZone;
  department:   string;        // Departamento de Colombia — "Bogotá D.C.", "Cundinamarca", …
  neighborhood: string;
  city:         string;
  area:         string;
  condition?:   PropertyCondition;
  amenities?:   PropertyAmenity[];
  bedrooms?:    number;
  bathrooms?:   number;
  parking?:     number;
  floor?:       number;
  price?:       number;
  priceDisplay?:string;
  images:       PropertyImage[];
  featured:     boolean;
  featuredOrder?:number;
  isNew?:       boolean;     // Badge "Nuevo" — recién publicado
  investment:   boolean;
  acmSelection: boolean;     // Selección ACM — marcado por Christian o Juan Pablo
  tags:         string[];
  publishedAt:  string;
  updatedAt:    string;
}
