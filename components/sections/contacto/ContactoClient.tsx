"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { TS, LH, LS, SP, EASE } from "@/lib/design-tokens";
import { siteConfig, whatsappUrl } from "@/lib/config";

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.95, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

const INTENTS: { value: ContactFormValues["intent"]; label: string }[] = [
  { value: "hogar",         label: "Comprar vivienda" },
  { value: "inversion",     label: "Invertir" },
  { value: "arrendamiento", label: "Arrendar" },
  { value: "otro",          label: "Otro" },
];

const INTENT_TEXT: Record<ContactFormValues["intent"], string> = {
  hogar:         "comprar vivienda",
  inversion:     "invertir en finca raíz",
  arrendamiento: "arrendar",
  otro:          "hablar de otro tema",
};

function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { intent: "hogar" },
  });

  const intent = watch("intent");

  const onSubmit = (data: ContactFormValues) => {
    const lines = [
      `Hola, soy ${data.name}.`,
      `Me gustaría ${INTENT_TEXT[data.intent]}.`,
      `Teléfono de contacto: ${data.phone}`,
      data.email ? `Correo: ${data.email}` : null,
      data.message ? `Mensaje: ${data.message}` : null,
    ].filter(Boolean);

    setSent(true);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-5">
        <label htmlFor="name" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>
          Nombre completo
        </label>
        <input id="name" type="text" placeholder="¿Cómo te llamas?" className="input-acm" {...register("name")} />
        {errors.name && <p className="font-sans text-orange-acm mt-1.5" style={{ fontSize: TS.caption }}>{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="phone" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>
            Teléfono / WhatsApp
          </label>
          <input id="phone" type="tel" placeholder="300 000 0000" className="input-acm" {...register("phone")} />
          {errors.phone && <p className="font-sans text-orange-acm mt-1.5" style={{ fontSize: TS.caption }}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>
            Correo <span className="text-graphite/50">(opcional)</span>
          </label>
          <input id="email" type="email" placeholder="tucorreo@ejemplo.com" className="input-acm" {...register("email")} />
          {errors.email && <p className="font-sans text-orange-acm mt-1.5" style={{ fontSize: TS.caption }}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="mb-5">
        <span className="block font-sans font-medium text-navy-deep mb-2.5" style={{ fontSize: TS.bodySm }}>
          ¿Qué estás buscando?
        </span>
        <div className="flex flex-wrap gap-2.5">
          {INTENTS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue("intent", value, { shouldValidate: true })}
              className="font-sans font-medium rounded-full transition-all duration-200"
              style={{
                fontSize: TS.caption,
                letterSpacing: LS.label,
                padding: "0.5rem 1.125rem",
                border: intent === value ? "1.5px solid #E8820C" : "1.5px solid rgba(15,32,68,0.15)",
                background: intent === value ? "rgba(232,130,12,0.08)" : "transparent",
                color: intent === value ? "#E8820C" : "rgba(15,32,68,0.6)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>
          Mensaje <span className="text-graphite/50">(opcional)</span>
        </label>
        <textarea id="message" rows={4} placeholder="Cuéntanos con más detalle qué necesitas…" className="input-acm" style={{ resize: "vertical" }} {...register("message")} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Enviar por WhatsApp
      </button>

      <p className="font-sans text-graphite/55 text-center mt-4" style={{ fontSize: TS.caption }}>
        Al enviar, se abre WhatsApp con tu mensaje listo para confirmar y enviar.
      </p>

      {sent && (
        <p className="font-sans text-navy-deep text-center mt-3 font-medium" style={{ fontSize: TS.bodySm }}>
          Abrimos WhatsApp en una nueva pestaña. Si no se abrió, revisa el bloqueador de ventanas emergentes.
        </p>
      )}
    </form>
  );
}

export default function ContactoClient() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Contacto</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "20ch" }}>
              Hablemos, sin compromiso.
            </h1>
            <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "48ch" }}>
              Cuéntanos qué buscas y te contactamos en minutos. Sin formularios eternos ni respuestas automáticas: hablas directo con alguien que conoce el mercado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Info + Form */}
      <section className="bg-cream" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-16 gap-y-14">

            {/* Left: info + image */}
            <Reveal>
              <p className="font-sans font-semibold text-orange-acm uppercase mb-4" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Escríbenos</p>
              <ul className="space-y-5 mb-10">
                <li className="flex items-start gap-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-acm shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.17 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-sans text-navy-deep hover:text-orange-acm transition-colors duration-200" style={{ fontSize: TS.bodyLg }}>{siteConfig.contact.phone}</a>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-acm shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-sans text-navy-deep hover:text-orange-acm transition-colors duration-200 break-all" style={{ fontSize: TS.bodyLg }}>{siteConfig.contact.email}</a>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-acm shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="font-sans text-navy-deep" style={{ fontSize: TS.bodyLg }}>{siteConfig.contact.address}</span>
                </li>
              </ul>

              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex gap-2.5 mb-10" style={{ fontSize: TS.bodySm, padding: "0.875rem 1.625rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Escribir por WhatsApp
              </a>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.08}>
              <div className="bg-white border border-graphite/10 rounded-lg p-6 md:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
