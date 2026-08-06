/**
 * content/testimonials.ts
 * Moved out of HomeClient.tsx — single source of truth for testimonial data.
 * Shape is Sanity-compatible: when CMS goes live, replace this file
 * with a GROQ query that returns the same Testimonial[] type.
 */

import { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    _id:      "t1",
    quote:    "Antes de ir a ver el primer apartamento, ya teníamos la preaprobación del crédito lista. Eso cambió todo — entré a las visitas sabiendo qué podía comprar.",
    name:     "Carolina Mejía",
    detail:   "Compradora · Chapinero Alto · 2025",
    type:     "hogar",
    featured: true,
    order:    1,
  },
  {
    _id:      "t2",
    quote:    "Me dijeron sin rodeos que la zona que yo quería no tenía buena proyección para inversión ese año. Preferí escucharlos. Seis meses después entendí por qué.",
    name:     "Ricardo Forero",
    detail:   "Inversionista · Cajicá · 2025",
    type:     "inversion",
    featured: true,
    order:    2,
  },
  {
    _id:      "t3",
    quote:    "Compré desde Toronto sin pisar Colombia. Cada etapa fue clara. Llegué a firmar la escritura sabiendo exactamente qué iba a firmar y cuánto iba a pagar.",
    name:     "Juliana Ospina",
    detail:   "Colombiana en el exterior · Bogotá · 2024",
    type:     "exterior",
    featured: true,
    order:    3,
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials
    .filter(t => t.featured)
    .sort((a, b) => a.order - b.order);
}

export function getTestimonialsByType(type: Testimonial["type"]): Testimonial[] {
  return testimonials.filter(t => t.type === type);
}
