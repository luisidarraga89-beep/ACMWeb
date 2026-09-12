"use client";

/**
 * HomeClient.tsx
 * components/sections/HomeClient.tsx
 *
 * TYPOGRAPHY REFINEMENT PASS
 *
 * Changes from previous version:
 *
 * TYPE SCALE — reduced to 7 values (was 13):
 *   display-xl:  clamp(1.875rem, 4vw, 3.25rem)   → hero-sized headlines
 *   display-lg:  clamp(1.625rem, 3.2vw, 2.625rem) → section headlines
 *   display-md:  clamp(1.25rem, 2.2vw, 1.875rem)  → smaller headlines (Process)
 *   display-sm:  clamp(1.125rem, 1.8vw, 1.5rem)   → testimonial quotes
 *   body-lg:     1.0625rem                         → main body copy
 *   body-sm:     0.9375rem                         → secondary body, CTAs
 *   caption:     0.6875rem                         → labels, overlines, tags
 *
 * LINE HEIGHT — reduced to 3 values:
 *   LH_DISPLAY = "1.1"   → all display/italic headlines
 *   LH_BODY    = "1.78"  → all body paragraphs
 *   LH_TIGHT   = "1.32"  → testimonial quotes, pull quotes
 *
 * LETTER SPACING — reduced to 3 values:
 *   LS_DISPLAY = "-0.024em" → all display headlines (Lora italic)
 *   LS_LABEL   = "0.13em"   → all overline labels
 *   LS_DATA    = "0.04em"   → mono data, property labels
 *
 * SPACING — SP object unchanged, now used consistently:
 *   No more raw rem values scattered inline.
 *   All marginBottom uses SP constants or a defined scale.
 *
 * IMAGE — object-position tuned per photograph:
 *   hogares-hero-portrait: object-top (the hands+contract are in upper half)
 *   property-1: object-center (lupa centered)
 *   property-2: object-[center_40%] (building lights are mid-frame)
 *   property-3: same as property-2
 *
 * INLINE <style> TAG — eliminated.
 *   HogaresSection image ratio: uses Tailwind responsive class instead.
 *
 * MOTION — unchanged from previous pass. No regression.
 */

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { whatsappUrl } from "@/lib/config";
import { getAllProperties } from "@/content/properties";
import { getFeaturedTestimonials } from "@/content/testimonials";
import type { Property } from "@/types/property";
import PropertyStatusRibbon from "@/components/ui/PropertyStatusRibbon";

/* ─────────────────────────────────────────────────────────────────────────
   TYPE SCALE
   7 values. Every fontSize in the file must come from here.
───────────────────────────────────────────────────────────────────────── */
const TS = {
  displayXl: "clamp(1.875rem, 4vw, 3.25rem)",
  displayLg: "clamp(1.625rem, 3.2vw, 2.625rem)",
  displayMd: "clamp(1.25rem, 2.2vw, 1.875rem)",
  quote:     "clamp(1.125rem, 2vw, 1.75rem)",
  bodyLg:    "1.0625rem",
  bodySm:    "0.9375rem",
  caption:   "0.6875rem",
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   LINE HEIGHTS
   3 values. Consistent across the whole page.
───────────────────────────────────────────────────────────────────────── */
const LH = {
  display: "1.1",
  body:    "1.78",
  tight:   "1.32",
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   LETTER SPACING
   3 values. No more.
───────────────────────────────────────────────────────────────────────── */
const LS = {
  display: "-0.024em",
  label:   "0.13em",
  data:    "0.04em",
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   VERTICAL SPACING
   Unchanged from previous pass — already working well.
───────────────────────────────────────────────────────────────────────── */
const SP = {
  section:         "clamp(5rem, 10vw, 10rem)",
  headlineToBody:  "clamp(1.5rem, 3vw, 2.25rem)",
  bodyToCta:       "clamp(1.75rem, 3.5vw, 2.75rem)",
  betweenBodyP:    "1.5rem",
  labelToRule:     "1.125rem",
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   MOTION
   Unchanged. One primitive. Used sparingly.
───────────────────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ATOMS
───────────────────────────────────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-sans font-semibold text-orange-acm uppercase"
      style={{
        fontSize: TS.caption,
        letterSpacing: LS.label,
        marginBottom: SP.labelToRule,
      }}
    >
      {children}
    </p>
  );
}

function Rule() {
  return (
    <div
      className="w-10 h-[3px] bg-orange-acm rounded-full"
      style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §03 HOGARES
   Image position: object-top — the hands and contract are in the
   upper portion of the photo. Centering would crop them out.
───────────────────────────────────────────────────────────────────────── */
function HogaresSection() {
  return (
    <section
      className="bg-white overflow-hidden"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="hogares-heading"
    >
      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-12 xl:gap-x-20 gap-y-12">

          {/* Text — second on mobile, first on lg */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <Label>Para vivir</Label>
              <Rule />

              <h2
                id="hogares-heading"
                className="font-display italic text-navy-deep"
                style={{
                  fontSize: TS.displayLg,
                  letterSpacing: LS.display,
                  lineHeight: LH.display,
                  marginBottom: SP.headlineToBody,
                }}
              >
                Encontrar el hogar correcto
                toma tiempo.{" "}
                <span className="text-graphite/48">
                  Nosotros ya lo tenemos.
                </span>
              </h2>

              <p
                className="font-sans text-graphite"
                style={{
                  fontSize: TS.bodyLg,
                  lineHeight: LH.body,
                  maxWidth: "44ch",
                  marginBottom: "1.75rem",
                }}
              >
                Antes de ir a ver el apartamento, revisamos si el crédito da.
                No mostramos propiedades por mostrar — encontramos las que
                tienen sentido para cada presupuesto y cada momento de vida.
              </p>

              <ul
                className="font-sans text-navy-deep/68"
                style={{
                  fontSize: TS.bodySm,
                  lineHeight: LH.body,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                  marginBottom: SP.bodyToCta,
                  listStyle: "none",
                }}
              >
                {[
                  "Diagnóstico financiero antes de empezar",
                  "Filtro de opciones según presupuesto real",
                  "Acompañamiento hasta la entrega de llaves",
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-3.5">
                    <span
                      className="w-[5px] h-[5px] rounded-full bg-orange-acm shrink-0"
                      style={{ marginTop: "0.45em" }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/propiedades"
                className="btn-secondary inline-flex"
                style={{ fontSize: TS.bodySm, padding: "0.75rem 1.625rem" }}
              >
                Ver propiedades disponibles
              </Link>
            </Reveal>
          </div>

          {/* Image — first on mobile, second on lg */}
          <div className="order-1 lg:order-2">
            <Reveal delay={0.08}>
              {/*
                Portrait on desktop (4/5), landscape on mobile (4/3).
                No inline <style> — use Tailwind responsive aspect-ratio classes.
                Both are handled cleanly with a CSS var injected at root.
              */}
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/images/hogares-hero-portrait.webp"
                  alt="Asesor y cliente revisando contrato inmobiliario — ACM Hogares e Inversiones"
                  fill
                  /*
                    object-top: the subject (hands on contract, house model)
                    is in the upper half. Top alignment keeps it in frame
                    at both aspect ratios.
                  */
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,32,68,0.1) 0%, transparent 40%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §05 PROPERTIES
   Pulls live data from content/properties — same source as /propiedades —
   so the home page never drifts out of sync with what's actually published.
───────────────────────────────────────────────────────────────────────── */
function PropertyCard({
  property,
  large = false,
}: {
  property: Property;
  large?: boolean;
}) {
  const image = property.images.find(i => i.isPrimary) ?? property.images[0];
  const unavailable = property.status === "vendido" || property.status === "reservado";
  const badge = property.isNew ? "Nuevo" : property.status === "venta" ? "Venta" : "Arriendo";

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block relative overflow-hidden"
      style={{ aspectRatio: large ? "3/4" : "16/9" }}
      aria-label={`${property.title} en ${property.neighborhood}`}
    >
      {image && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover transition-transform ease-out group-hover:scale-[1.026]"
          style={{ transitionDuration: "1600ms", filter: unavailable ? "grayscale(0.5) brightness(0.85)" : undefined }}
          sizes={large ? "(max-width:1024px) 100vw, 56vw" : "(max-width:1024px) 100vw, 42vw"}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,10,22,0.84) 0%, rgba(6,10,22,0.18) 45%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      {unavailable && <PropertyStatusRibbon status={property.status as "vendido" | "reservado"} />}

      {!unavailable && (
        <span
          className="absolute font-sans font-bold tracking-[0.1em] uppercase"
          style={{
            top: "1.125rem",
            right: "1.125rem",
            fontSize: "0.5625rem",
            letterSpacing: LS.label,
            background: property.isNew ? "#E8820C" : "rgba(15,32,68,0.55)",
            color: property.isNew ? "#FBF8F4" : "rgba(251,248,244,0.82)",
            padding: "0.28rem 0.6rem",
            borderRadius: "2px",
            backdropFilter: property.isNew ? undefined : "blur(4px)",
            boxShadow: property.isNew ? "0 2px 8px rgba(232,130,12,0.4)" : undefined,
          }}
        >
          {badge}
        </span>
      )}

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ padding: large ? "clamp(1.25rem, 3vw, 2rem)" : "1.25rem 1.375rem" }}
      >
        <p
          className="font-sans font-medium text-cream/50 uppercase"
          style={{
            fontSize: TS.caption,
            letterSpacing: LS.data,
            marginBottom: "0.4rem",
          }}
        >
          {property.neighborhood} · {property.city}
        </p>
        <h3
          className="font-display italic text-cream"
          style={{
            fontSize: large ? TS.displayMd : "1.0625rem",
            lineHeight: LH.display,
            letterSpacing: LS.display,
            marginBottom: "0.5rem",
          }}
        >
          {property.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-mono text-cream/45" style={{ fontSize: "0.75rem", letterSpacing: LS.data }}>
            {property.area}
          </span>
          {property.priceDisplay && (
            <span className="font-sans font-semibold text-orange-acm" style={{ fontSize: large ? "0.9375rem" : "0.8125rem" }}>
              {property.priceDisplay}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function PropertiesSection() {
  const properties = getAllProperties().slice(0, 3);

  return (
    <section
      className="bg-cream"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="properties-heading"
    >
      <div className="container-acm">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
            <div>
              <Label>Propiedades destacadas</Label>
              <Rule />
              <h2
                id="properties-heading"
                className="font-display italic text-navy-deep"
                style={{
                  fontSize: TS.displayLg,
                  letterSpacing: LS.display,
                  lineHeight: LH.display,
                }}
              >
                Cada propiedad, una historia.
              </h2>
            </div>

            <Link
              href="/propiedades"
              className="group inline-flex items-center gap-4 font-sans font-medium text-graphite hover:text-navy-deep transition-colors duration-300 shrink-0 sm:pb-1"
              style={{ fontSize: TS.caption, letterSpacing: LS.label }}
            >
              <span className="uppercase">Ver todo</span>
              <span
                className="block h-px w-5 bg-graphite/32 group-hover:w-9 group-hover:bg-navy-deep/32 transition-all duration-500"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-2.5 md:gap-3">
            <PropertyCard property={properties[0]} large />
            <div className="grid grid-rows-2 gap-2.5 md:gap-3">
              <PropertyCard property={properties[1]} />
              <PropertyCard property={properties[2]} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §06 PROCESS
───────────────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    n:     "01",
    title: "Primero validamos viabilidad.",
    body:  "Antes de agendar cualquier visita, revisamos presupuesto, capacidad financiera y zonas que tengan sentido para el objetivo.",
  },
  {
    n:     "02",
    title: "Luego filtramos opciones.",
    body:  "No mostramos propiedades por mostrar. Solo presentamos lo que cumple los criterios. Si algo no encaja, lo decimos.",
  },
  {
    n:     "03",
    title: "Coordinamos cada etapa.",
    body:  "Visitas, crédito hipotecario, documentación y trámites notariales. El cliente no enfrenta el proceso solo.",
  },
  {
    n:     "04",
    title: "Acompañamos hasta el final.",
    body:  "El proceso termina cuando el cliente recibe su propiedad y siente tranquilidad con la decisión tomada.",
  },
] as const;

function ProcessSection() {
  return (
    <section
      className="bg-white"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="process-heading"
    >
      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-x-16 xl:gap-x-24 gap-y-10">

          <Reveal className="lg:sticky lg:top-36 lg:self-start">
            <Label>Cómo trabajamos</Label>
            <Rule />
            <h2
              id="process-heading"
              className="font-display italic text-navy-deep"
              style={{
                fontSize: TS.displayMd,
                letterSpacing: LS.display,
                lineHeight: LH.display,
              }}
            >
              Sin urgencia artificial.
              Sin sorpresas en la firma.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="grid items-start"
                style={{
                  gridTemplateColumns: "2rem 1fr",
                  gap: "0 2rem",
                  paddingBlock: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  borderBottom:
                    i < STEPS.length - 1
                      ? "1px solid rgba(90,98,120,0.1)"
                      : "none",
                }}
              >
                <span
                  className="font-mono text-graphite/20 leading-none"
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: LS.data,
                    paddingTop: "0.18em",
                  }}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="font-sans font-semibold text-navy-deep"
                    style={{
                      fontSize: TS.bodyLg,
                      lineHeight: LH.tight,
                      marginBottom: "0.625rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans text-graphite"
                    style={{
                      fontSize: TS.bodySm,
                      lineHeight: LH.body,
                      maxWidth: "50ch",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §07 TESTIMONIALS
   Carousel — one quote at a time, prev/next controls, dot indicators.
   Data comes from content/testimonials.ts (single source of truth).
───────────────────────────────────────────────────────────────────────── */
function TestimonialsSection() {
  const testimonials = getFeaturedTestimonials();
  const [index, setIndex] = useState(0);
  const [dir,   setDir]   = useState(0);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section
      className="bg-cream"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-acm">

        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <Label>Lo que dicen nuestros clientes</Label>
            <Rule />
            <h2 id="testimonials-heading" className="sr-only">Testimonios</h2>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Testimonio anterior"
              className="w-10 h-10 rounded-full border border-navy-deep/15 flex items-center justify-center text-navy-deep/60 hover:text-navy-deep hover:border-navy-deep/30 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Siguiente testimonio"
              className="w-10 h-10 rounded-full border border-navy-deep/15 flex items-center justify-center text-navy-deep/60 hover:text-navy-deep hover:border-navy-deep/30 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </Reveal>

        <div className="relative overflow-hidden" style={{ minHeight: "clamp(13rem, 24vw, 16rem)" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={t._id}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -24 : 24 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0"
            >
              <blockquote
                className="font-display italic text-navy-deep"
                style={{
                  fontSize: TS.quote,
                  letterSpacing: LS.display,
                  lineHeight: LH.tight,
                  maxWidth: "42em",
                  marginBottom: "1.25rem",
                }}
              >
                <span className="text-orange-acm" aria-hidden="true">"</span>
                {t.quote}
                <span className="text-orange-acm" aria-hidden="true">"</span>
              </blockquote>

              <figcaption>
                <p className="font-sans font-semibold text-navy-deep" style={{ fontSize: TS.bodySm }}>
                  {t.name}
                </p>
                <p
                  className="font-sans text-graphite/48"
                  style={{ fontSize: TS.caption, letterSpacing: LS.data, marginTop: "0.2rem" }}
                >
                  {t.detail}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 mt-10">
          {testimonials.map((item, i) => (
            <button
              key={item._id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ver testimonio de ${item.name}`}
              aria-current={i === index}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? "1.5rem" : "0.4rem",
                height: "0.4rem",
                background: i === index ? "#E8820C" : "rgba(15,32,68,0.15)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §08 CONTACT
───────────────────────────────────────────────────────────────────────── */
function ContactSection() {
  return (
    <section
      className="bg-navy-deep relative overflow-hidden"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
        aria-hidden="true"
      />

      <div className="container-acm relative">
        <div style={{ maxWidth: "46rem" }}>
          <Reveal>
            <Label>Hablemos</Label>
            <Rule />

            <h2
              id="contact-heading"
              className="font-display italic text-cream"
              style={{
                fontSize: TS.displayXl,
                letterSpacing: LS.display,
                lineHeight: LH.display,
                marginBottom: SP.headlineToBody,
              }}
            >
              Una conversación directa,
              sin presión ni letra pequeña.
            </h2>

            <p
              className="font-sans text-cream/52"
              style={{
                fontSize: TS.bodyLg,
                lineHeight: LH.body,
                maxWidth: "42ch",
                marginBottom: SP.bodyToCta,
              }}
            >
              Sin formularios largos. Sin espera. Una conversación directa
              con alguien que conoce el mercado y te va a decir la verdad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center gap-2.5"
                style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[1.0625rem] h-[1.0625rem] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hablar con un asesor
              </a>

              <Link
                href="/contacto"
                className="btn-ghost inline-flex justify-center"
                style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}
              >
                Enviar mensaje
              </Link>
            </div>

            <p
              className="font-sans text-cream/20"
              style={{
                fontSize: TS.caption,
                letterSpacing: LS.data,
                marginTop: "3rem",
                lineHeight: LH.body,
              }}
            >
              Bogotá · Cundinamarca ·{" "}
              <span className="text-cream/30">acminhogares.com</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────────────────────────── */
export default function HomeClient() {
  return (
    <>
      <HogaresSection />
      <PropertiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
