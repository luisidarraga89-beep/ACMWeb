/**
 * lib/utils.ts
 * Pure utility functions used across the application.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. Required for conditional class composition. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format Colombian peso amounts */
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style:    "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format property area */
export function formatArea(m2: number): string {
  return `${m2} m²`;
}

/** Format date in Colombian locale */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric", month: "long", day: "numeric",
  });
}

/** Estimate reading time in minutes from body text */
export function readingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/** Build a safe image path for public/ assets */
export function imagePath(relativePath: string): string {
  return relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
}
