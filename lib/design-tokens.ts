/**
 * lib/design-tokens.ts
 *
 * Single source of truth for all typographic and spacing constants.
 * Import from any component that needs them.
 * DO NOT redefine these locally — that was the problem we fixed.
 *
 * These values are frozen after the homepage design approval.
 * Changes here cascade to every page.
 */

/** Typography scale — 7 values, covers all hierarchy levels */
export const TS = {
  displayXl: "clamp(1.875rem, 4vw, 3.25rem)",      // Contact headline, hero
  displayLg: "clamp(1.625rem, 3.2vw, 2.625rem)",   // Section headlines
  displayMd: "clamp(1.25rem, 2.2vw, 1.875rem)",    // Process headline, smaller h2
  quote:     "clamp(1.125rem, 2vw, 1.75rem)",      // Testimonial quotes
  bodyLg:    "1.0625rem",                           // Primary body text
  bodySm:    "0.9375rem",                           // Secondary body, CTAs, lists
  caption:   "0.6875rem",                           // Labels, overlines, tags, metadata
} as const;

/** Line heights — 3 values only */
export const LH = {
  display: "1.1",   // All Lora italic headlines
  body:    "1.78",  // All body paragraphs
  tight:   "1.32",  // Pull quotes, attribution lines
} as const;

/** Letter spacing — 3 values only */
export const LS = {
  display: "-0.024em",  // All display headlines (Lora italic)
  label:   "0.13em",   // Overline labels, tags
  data:    "0.04em",   // Mono data: m², prices, metadata
} as const;

/** Section spacing — all sections use the same vertical rhythm */
export const SP = {
  section:        "clamp(5rem, 10vw, 10rem)",      // Section paddingBlock
  headlineToBody: "clamp(1.5rem, 3vw, 2.25rem)",  // h2 → first paragraph
  bodyToCta:      "clamp(1.75rem, 3.5vw, 2.75rem)", // last paragraph → CTA
  betweenBodyP:   "1.5rem",                        // paragraph → paragraph
  labelToRule:    "1.125rem",                      // overline label → orange rule
} as const;

/** Framer Motion easing — expo-out, used on all Reveal animations */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
