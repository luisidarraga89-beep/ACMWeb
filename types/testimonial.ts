/**
 * types/testimonial.ts
 */

export type TestimonialType = "hogar" | "inversion" | "exterior";

export interface Testimonial {
  _id:     string;
  quote:   string;
  name:    string;
  detail:  string;        // "Compradora · Chapinero Alto · 2025"
  type:    TestimonialType;
  featured:boolean;
  order:   number;        // display order — even = left, odd = right offset
}
