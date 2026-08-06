/**
 * types/forms.ts
 * Form data types derived from Zod schemas in lib/validations.ts
 */

export type ContactIntent = "hogar" | "inversion" | "arrendamiento" | "otro";

export interface ContactFormData {
  name:     string;
  phone:    string;
  email?:   string;
  intent:   ContactIntent;
  message?: string;
}

/** Shape sent to HubSpot API */
export interface HubSpotContact {
  firstname:    string;
  phone:        string;
  email?:       string;
  hs_lead_status: "NEW";
  acm_intent:   ContactIntent;     // custom HubSpot property
  acm_source:   "website_form" | "whatsapp";
}
