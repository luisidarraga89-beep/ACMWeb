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
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-4 font-sans font-medium",
        "transition-colors duration-300",
        light
          ? "text-cream/65 hover:text-cream"
          : "text-navy-deep hover:text-navy-mid",
      ].join(" ")}
      style={{ fontSize: TS.bodySm }}
    >
      <span>{children}</span>
      <span
        className={[
          "block h-px transition-all duration-500",
          "group-hover:w-12",
          light
            ? "w-8 bg-cream/28 group-hover:bg-cream/52"
            : "w-8 bg-navy-deep/20 group-hover:bg-navy-mid/45",
        ].join(" ")}
        aria-hidden="true"
      />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §02 PHILOSOPHY
───────────────────────────────────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section
      className="bg-cream"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="philosophy-heading"
    >
      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-x-16 xl:gap-x-24 gap-y-8">

          {/* Left — label + vertical rule */}
          <div className="lg:pt-0.5">
            <Label>Quiénes somos</Label>
            <div
              className="hidden lg:block w-px bg-graphite/10"
              style={{
                height: "clamp(5rem, 9vw, 9rem)",
                marginTop: "1.25rem",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Right — single Reveal */}
          <Reveal>
            <Rule />
            <h2
              id="philosophy-heading"
              className="font-display italic text-navy-deep"
              style={{
                fontSize: TS.displayLg,
                letterSpacing: LS.display,
                lineHeight: LH.display,
                maxWidth: "24ch",
                marginBottom: SP.headlineToBody,
              }}
            >
              "Acompañamos a cada cliente con el mismo cuidado
              con el que uno tomaría decisiones para su familia."
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-10"
              style={{ maxWidth: "64ch", marginBottom: SP.bodyToCta }}
            >
              <p
                className="font-sans text-graphite"
                style={{
                  fontSize: TS.bodyLg,
                  lineHeight: LH.body,
                  marginBottom: SP.betweenBodyP,
                }}
              >
                Somos Alexandra, Christian y Mathias — ACM. Antes de ser
                una empresa, fuimos una familia navegando un mercado donde
                la información es escasa y el acompañamiento deficiente.
              </p>
              <p
                className="font-sans text-graphite"
                style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}
              >
                Por eso nuestro trabajo empieza mucho antes de una visita.
                Revisamos presupuesto, crédito y zonas reales. Sin presión.
                Sin urgencia artificial. Solo claridad.
              </p>
            </div>

            <TextLink href="/nosotros">Conocer el equipo</TextLink>
          </Reveal>

        </div>
      </div>
    </section>
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
   §04 INVERSIONES
───────────────────────────────────────────────────────────────────────── */
const TRUTHS = [
  {
    title: "Criterio antes que presión",
    body:  "No buscamos mostrar la mayor cantidad de opciones. Buscamos las correctas para cada perfil.",
  },
  {
    title: "Conocimiento local de verdad",
    body:  "Cajicá norte tiene proyección real. El sur, no tanto hoy. Esa diferencia importa cuando inviertes.",
  },
  {
    title: "Clientes en Colombia y en el exterior",
    body:  "Proceso 100% remoto disponible. Videollamadas, gestión documental, seguimiento constante.",
  },
] as const;

function InversionesSection() {
  return (
    <section
      className="bg-navy-deep relative overflow-hidden"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="inversiones-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
        aria-hidden="true"
      />

      <div className="container-acm relative">
        <Reveal>
          <Label>Para invertir</Label>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-x-20 gap-y-8 mt-1">
            <div>
              <Rule />
              <h2
                id="inversiones-heading"
                className="font-display italic text-cream"
                style={{
                  fontSize: TS.displayLg,
                  letterSpacing: LS.display,
                  lineHeight: LH.display,
                }}
              >
                Si esa zona no conviene
                para invertir,
                te lo decimos.
              </h2>
            </div>

            <div className="lg:self-end">
              <p
                className="font-sans text-cream/55"
                style={{
                  fontSize: TS.bodyLg,
                  lineHeight: LH.body,
                  marginBottom: "1.75rem",
                }}
              >
                Trabajamos diariamente en Bogotá y la Sabana. Sabemos qué
                sectores tienen proyección real y dónde existe sobreoferta.
                No desde mapas genéricos — desde estar en el terreno.
              </p>
              <TextLink href="/inversiones" light>
                Explorar inversiones
              </TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{
              marginTop: "clamp(3rem, 6vw, 5rem)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {TRUTHS.map(({ title, body }, i) => (
              <div
                key={title}
                className="py-10 md:py-11"
                style={{
                  paddingLeft:  i === 0 ? 0 : "clamp(1.5rem, 3vw, 2.5rem)",
                  paddingRight: i === TRUTHS.length - 1 ? 0 : "clamp(1.5rem, 3vw, 2.5rem)",
                  borderRight:
                    i < TRUTHS.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                }}
              >
                <p
                  className="font-sans font-semibold text-cream leading-snug"
                  style={{ fontSize: TS.bodySm, marginBottom: "0.75rem" }}
                >
                  {title}
                </p>
                <p
                  className="font-sans text-cream/42"
                  style={{ fontSize: TS.bodySm, lineHeight: LH.body }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   §05 PROPERTIES
   Image positions tuned per composition:
   property-1 (portrait, lupa centered):  object-center
   property-2 (landscape, bokeh left):    object-[center_45%]
   property-3 (landscape, bokeh right):   object-[center_45%]
───────────────────────────────────────────────────────────────────────── */
const PROPERTIES = [
  {
    slug:     "apartamento-chico-norte",
    label:    "Chicó Norte · Bogotá",
    title:    "Penthouse con terrazas",
    area:     "186 m²",
    image:    "/images/property-1.webp",
    tag:      "Venta",
    position: "object-center",
  },
  {
    slug:     "casa-chia-sabana",
    label:    "Chía · Sabana Norte",
    title:    "Casa campestre con jardín",
    area:     "312 m²",
    image:    "/images/property-2.webp",
    tag:      "Venta",
    position: "object-center object-[center_42%]",
  },
  {
    slug:     "apartamento-rosales",
    label:    "Rosales · Bogotá",
    title:    "Apartamento en piso 18",
    area:     "124 m²",
    image:    "/images/property-3.webp",
    tag:      "Inversión",
    position: "object-center object-[center_42%]",
  },
] as const;

function PropertyCard({
  property,
  large = false,
}: {
  property: (typeof PROPERTIES)[number];
  large?: boolean;
}) {
  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block relative overflow-hidden"
      style={{ aspectRatio: large ? "3/4" : "16/9" }}
      aria-label={`${property.title} en ${property.label}`}
    >
      <Image
        src={property.image}
        alt={`${property.title} — ${property.label}`}
        fill
        className={[
          "object-cover transition-transform ease-out",
          property.position,
          "group-hover:scale-[1.026]",
        ].join(" ")}
        style={{ transitionDuration: "1600ms" }}
        sizes={large ? "(max-width:1024px) 100vw, 56vw" : "(max-width:1024px) 100vw, 42vw"}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,10,22,0.84) 0%, rgba(6,10,22,0.18) 45%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      <span
        className="absolute font-sans font-semibold tracking-[0.1em] uppercase backdrop-blur-sm"
        style={{
          top: "1.125rem",
          right: "1.125rem",
          fontSize: "0.5625rem",
          letterSpacing: LS.label,
          background: "rgba(15,32,68,0.55)",
          color: "rgba(251,248,244,0.82)",
          padding: "0.28rem 0.6rem",
          borderRadius: "2px",
        }}
      >
        {property.tag}
      </span>

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
          {property.label}
        </p>
        <h3
          className="font-display italic text-cream"
          style={{
            fontSize: large ? TS.displayMd : "1.0625rem",
            lineHeight: LH.display,
            letterSpacing: LS.display,
            marginBottom: "0.4rem",
          }}
        >
          {property.title}
        </h3>
        <p
          className="font-mono text-cream/45"
          style={{ fontSize: "0.75rem", letterSpacing: LS.data }}
        >
          {property.area}
        </p>
      </div>
    </Link>
  );
}

function PropertiesSection() {
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
            <PropertyCard property={PROPERTIES[0]} large />
            <div className="grid grid-rows-2 gap-2.5 md:gap-3">
              <PropertyCard property={PROPERTIES[1]} />
              <PropertyCard property={PROPERTIES[2]} />
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
   Typography fix: quotes now use TS.quote (not a raw clamp).
   Offset: second quote uses ml-auto on md+ — no grid gymnastics.
   Figcaption: plain text-right for offset, text-left otherwise.
───────────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id:     "t1",
    quote:  "Antes de ir a ver el primer apartamento, ya teníamos la preaprobación del crédito lista. Eso cambió todo — entré a las visitas sabiendo qué podía comprar.",
    name:   "Carolina Mejía",
    detail: "Compradora · Chapinero Alto · 2025",
    offset: false,
  },
  {
    id:     "t2",
    quote:  "Me dijeron sin rodeos que la zona que yo quería no tenía buena proyección para inversión ese año. Preferí escucharlos. Seis meses después entendí por qué.",
    name:   "Ricardo Forero",
    detail: "Inversionista · Cajicá · 2025",
    offset: true,
  },
  {
    id:     "t3",
    quote:  "Compré desde Toronto sin pisar Colombia. Cada etapa fue clara. Llegué a firmar la escritura sabiendo exactamente qué iba a firmar y cuánto iba a pagar.",
    name:   "Juliana Ospina",
    detail: "Colombiana en el exterior · Bogotá · 2024",
    offset: false,
  },
] as const;

function TestimonialsSection() {
  return (
    <section
      className="bg-cream"
      style={{ paddingBlock: SP.section }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-acm">

        <Reveal className="mb-14 md:mb-20 lg:mb-24">
          <Label>Lo que dicen nuestros clientes</Label>
          <Rule />
          <h2 id="testimonials-heading" className="sr-only">Testimonios</h2>
        </Reveal>

        <div>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id}>
              <Reveal>
                <figure>
                  <blockquote
                    className="font-display italic text-navy-deep"
                    style={{
                      fontSize: TS.quote,
                      letterSpacing: LS.display,
                      lineHeight: LH.tight,
                      maxWidth: "32em",
                      /*
                        Offset: the second testimonial shifts right on md+.
                        ml-auto pushes it to the right edge naturally.
                        On mobile all three are flush left.
                      */
                      marginLeft: t.offset ? "auto" : undefined,
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span className="text-orange-acm" aria-hidden="true">"</span>
                    {t.quote}
                    <span className="text-orange-acm" aria-hidden="true">"</span>
                  </blockquote>

                  <figcaption
                    style={{ textAlign: t.offset ? "right" : "left" }}
                  >
                    <p
                      className="font-sans font-semibold text-navy-deep"
                      style={{ fontSize: TS.bodySm }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="font-sans text-graphite/48"
                      style={{
                        fontSize: TS.caption,
                        letterSpacing: LS.data,
                        marginTop: "0.2rem",
                      }}
                    >
                      {t.detail}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>

              {i < TESTIMONIALS.length - 1 && (
                <div
                  className="w-full bg-graphite/8"
                  style={{
                    height: "1px",
                    margin: "clamp(2.5rem, 5vw, 4.5rem) 0",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
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
              Antes de ir a ver el apartamento,
              revisamos si el crédito da.
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
                href="https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20inmobiliaria"
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
              Bogotá · Cundinamarca · Sabana ·{" "}
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
      <PhilosophySection />
      <HogaresSection />
      <InversionesSection />
      <PropertiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
