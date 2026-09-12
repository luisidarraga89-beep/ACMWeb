import type { Metadata } from "next";
import ContactoClient from "@/components/sections/contacto/ContactoClient";

export const metadata: Metadata = {
  title: "Contacto · Hablemos de tu próximo paso",
  description:
    "Escríbenos por WhatsApp, correo o llena el formulario. Te contactamos en minutos para ayudarte a comprar, invertir o arrendar en Bogotá y todo Cundinamarca.",
  alternates: { canonical: "https://acminhogares.com/contacto" },
};

export default function ContactoPage() {
  return (
    <main id="main-content">
      <ContactoClient />
    </main>
  );
}
