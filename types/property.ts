export type PropertyStatus = "venta" | "arriendo" | "vendido" | "reservado";
export type PropertyType   = "apartamento" | "casa" | "penthouse" | "duplex" | "lote" | "oficina" | "local";
export type PropertyZone   = "bogota" | "chia" | "cajica" | "cota" | "sabana" | "zipaquira" | "otro";

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
  neighborhood: string;
  city:         string;
  area:         string;
  bedrooms?:    number;
  bathrooms?:   number;
  parking?:     number;
  floor?:       number;
  price?:       number;
  priceDisplay?:string;
  images:       PropertyImage[];
  featured:     boolean;
  featuredOrder?:number;
  investment:   boolean;
  acmSelection: boolean;     // Selección ACM — marcado por Christian o Juan Pablo
  tags:         string[];
  publishedAt:  string;
  updatedAt:    string;
}
