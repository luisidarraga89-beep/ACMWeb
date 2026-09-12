/**
 * lib/validations.ts
 * Zod schemas — single source of truth for form validation.
 * Types in types/forms.ts are derived from these.
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  name:    z.string().trim().min(2, "Cuéntanos tu nombre completo."),
  phone:   z.string().trim().min(7, "Ingresa un número de contacto válido."),
  email:   z.union([z.string().trim().email("Ingresa un correo válido."), z.literal("")]).optional(),
  intent:  z.enum(["hogar", "inversion", "arrendamiento", "otro"]),
  message: z.string().trim().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
