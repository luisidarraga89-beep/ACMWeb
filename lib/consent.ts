/**
 * lib/consent.ts
 * Minimal cookie-consent state, shared between the CookieConsent banner
 * and the analytics loader. Stored in localStorage so the choice survives
 * across visits; a custom event lets other components react to changes
 * without prop-drilling.
 */

export type ConsentStatus = "accepted" | "rejected";

const STORAGE_KEY   = "acm-cookie-consent";
const CHANGE_EVENT  = "acm-consent-change";
const OPEN_EVENT    = "acm-open-cookie-settings";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setStoredConsent(status: ConsentStatus): void {
  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: status }));
}

export function onConsentChange(callback: (status: ConsentStatus) => void): () => void {
  const handler = (e: Event) => callback((e as CustomEvent<ConsentStatus>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Re-opens the cookie banner so a visitor can change a previous choice. */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(callback: () => void): () => void {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}
