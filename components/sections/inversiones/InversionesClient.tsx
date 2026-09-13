"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getInvestmentProperties } from "@/content/properties";
import { TS, LH, LS, SP, EASE } from "@/lib/design-tokens";
import { whatsappUrl } from "@/lib/config";
import { PROPERTY_TYPE_LABEL } from "@/lib/property-labels";

/* ─── SHARED PRIMITIVES ──────────────────────────────────────────────────── */

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`font-sans font-semibold uppercase ${light ? "text-orange-acm" : "text-orange-acm"}`} style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.125rem" }}>
      {children}
    </p>
  );
}

function SectionRule({ center = false }: { center?: boolean }) {
  return <div className={`w-10 h-[3px] bg-orange-acm rounded-full mb-8 ${center ? "mx-auto" : ""}`} aria-hidden="true" />;
}

function WhatsAppIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }}
      aria-hidden="true"
    />
  );
}

/* ─── §1 FACTORES DE ANÁLISIS ────────────────────────────────────────────── */
const FACTORES = [
  "Precio de compra", "Ubicación", "Demanda", "Canon de alquiler",
  "Ingresos potenciales", "Gastos", "Rentabilidad bruta", "Rentabilidad neta",
  "Valorización potencial", "Financiación", "Liquidez", "Riesgos", "Horizonte de inversión",
];

function FactoresSection() {
  return (
    <section id="factores" className="bg-white scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <SectionLabel>No todas las propiedades son una buena inversión</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "26ch", marginBottom: SP.headlineToBody }}>
            Ayudarte a decidir es más importante que decirte que sí.
          </h2>
          <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "56ch", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            Nuestro trabajo no es decirte que sí a cualquier oportunidad. Es ayudarte a entender cuándo una propiedad tiene sentido para ti y cuándo no. Antes de recomendarte algo, analizamos:
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-wrap gap-2.5">
            {FACTORES.map((f) => (
              <span key={f} className="font-sans font-medium rounded-full border border-navy-deep/12 text-navy-deep/75" style={{ fontSize: TS.bodySm, padding: "0.625rem 1.25rem" }}>
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §2 CÓMO GENERA VALOR ───────────────────────────────────────────────── */
const VALUE_WAYS = [
  {
    title: "Renta",
    body:  "Ingresos periódicos mediante el alquiler del inmueble.",
    icon:  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    title: "Valorización",
    body:  "Potencial incremento del valor del inmueble con el tiempo.",
    icon:  <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
  },
  {
    title: "Patrimonio",
    body:  "Construcción y consolidación de patrimonio inmobiliario a largo plazo.",
    icon:  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
  },
] as const;

function ValueSection() {
  return (
    <section id="como-genera-valor" className="bg-cream scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <SectionLabel>¿Cómo genera valor una propiedad?</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "28ch", marginBottom: SP.headlineToBody }}>
            Tres formas de generar valor. Ninguna garantizada.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {VALUE_WAYS.map((v, i) => (
            <Reveal key={v.title} delay={0.06 * i}>
              <div className="bg-white border border-graphite/10 rounded-lg p-8 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-acm mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                <h3 className="font-sans font-bold text-navy-deep mb-3" style={{ fontSize: TS.bodyLg }}>{v.title}</h3>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="font-sans text-graphite/60 italic mt-8" style={{ fontSize: TS.bodySm, maxWidth: "56ch" }}>
            La rentabilidad y la valorización dependen del inmueble, la zona y las condiciones del mercado — nunca están garantizadas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §3 DIVERSIFICAR EL PATRIMONIO ──────────────────────────────────────── */
const DIVERSIFY_AXES = [
  "Ubicación", "Tipo de inmueble", "Rango de inversión", "Objetivo",
  "Nivel de renta", "Potencial de valorización", "Horizonte temporal",
];

const PORTFOLIO_EXAMPLE = [
  { pct: 45, label: "Apartamento urbano consolidado", detail: "Bogotá · enfoque en renta estable", color: "#0F2044" },
  { pct: 35, label: "Proyecto en zona de crecimiento", detail: "Sabana · enfoque en valorización", color: "#E8820C" },
  { pct: 20, label: "Inmueble pequeño / local", detail: "Diversificación de tipo de activo", color: "#5A6278" },
] as const;

function DiversifySection() {
  return (
    <section id="diversificar" className="bg-navy-deep relative overflow-hidden scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <DotGrid />
      <div className="container-acm relative">
        <Reveal>
          <SectionLabel>Diversificar el patrimonio</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-cream" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "26ch", marginBottom: SP.headlineToBody }}>
            No se trata de tener más propiedades. Se trata de tener una mejor estrategia.
          </h2>
          <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "56ch", marginBottom: "2.5rem" }}>
            Un inversionista puede diversificar por varios criterios a la vez:
          </p>
          <div className="flex flex-wrap gap-2.5 mb-16">
            {DIVERSIFY_AXES.map((a) => (
              <span key={a} className="font-sans font-medium rounded-full border border-cream/20 text-cream/80" style={{ fontSize: TS.bodySm, padding: "0.625rem 1.25rem" }}>
                {a}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans font-semibold text-cream/70 uppercase mb-5" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
            Ejemplo ilustrativo de una cartera diversificada
          </p>
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-6" role="img" aria-label="Distribución de ejemplo de una cartera diversificada">
            {PORTFOLIO_EXAMPLE.map((p) => (
              <div key={p.label} style={{ width: `${p.pct}%`, background: p.color }} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PORTFOLIO_EXAMPLE.map((p) => (
              <div key={p.label} className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ background: p.color }} aria-hidden="true" />
                <div>
                  <p className="font-sans font-bold text-cream" style={{ fontSize: TS.bodySm }}>{p.pct}% — {p.label}</p>
                  <p className="font-sans text-cream/50" style={{ fontSize: TS.caption, marginTop: "0.2rem" }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-sans text-cream/40 italic mt-8" style={{ fontSize: TS.caption, maxWidth: "56ch" }}>
            Ejemplo puramente ilustrativo. Ninguna ciudad o tipo de propiedad es universalmente mejor — depende de tu perfil, tu capital, tus objetivos y tu tolerancia al riesgo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §4 ¿EN QUÉ MOMENTO ESTÁS? ──────────────────────────────────────────── */
const PROFILES = [
  {
    title: "Estoy empezando",
    body:  "Quiero realizar mi primera inversión y necesito entender cómo funciona.",
    cta:   "Quiero hacer mi primera inversión",
    msg:   "Hola, estoy empezando en inversión inmobiliaria y me gustaría entender cómo funciona.",
  },
  {
    title: "Quiero hacer crecer mi patrimonio",
    body:  "Ya tengo propiedades y quiero diversificar y encontrar nuevas oportunidades.",
    cta:   "Quiero diversificar mi patrimonio",
    msg:   "Hola, ya tengo propiedades y quiero diversificar mi patrimonio con nuevas oportunidades.",
  },
  {
    title: "Soy inversor experimentado",
    body:  "Busco oportunidades concretas, análisis y acompañamiento profesional.",
    cta:   "Quiero ver oportunidades concretas",
    msg:   "Hola, soy un inversionista experimentado y busco oportunidades concretas con análisis y acompañamiento.",
  },
] as const;

function ProfilesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-cream" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <SectionLabel>¿En qué momento estás?</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "24ch", marginBottom: SP.headlineToBody }}>
            Cada etapa necesita un acompañamiento distinto.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROFILES.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="w-full text-left rounded-lg border p-7 h-full transition-all duration-200"
                style={{
                  borderColor: active === i ? "#E8820C" : "rgba(15,32,68,0.1)",
                  background: active === i ? "rgba(232,130,12,0.04)" : "#fff",
                }}
              >
                <h3 className="font-sans font-bold text-navy-deep mb-3" style={{ fontSize: TS.bodyLg }}>{p.title}</h3>
                <p className="font-sans text-graphite mb-6" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>{p.body}</p>
                <a
                  href={whatsappUrl(p.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 font-sans font-semibold text-orange-acm hover:text-orange-acm/70 transition-colors"
                  style={{ fontSize: TS.bodySm }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {p.cta}
                </a>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── §5 NUESTRO PROCESO ─────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  { n: "01", title: "Entendemos tu objetivo", body: "Capital, experiencia, horizonte, liquidez, objetivos y perfil de riesgo." },
  { n: "02", title: "Buscamos oportunidades", body: "Propiedades que puedan encajar con tu estrategia, no cualquier propiedad disponible." },
  { n: "03", title: "Analizamos los números", body: "Precio, alquiler, gastos, rentabilidad, financiación, valorización potencial y flujo de caja." },
  { n: "04", title: "Evaluamos los riesgos", body: "Vacancia, mantenimiento, liquidez, concentración, endeudamiento y condiciones del mercado." },
  { n: "05", title: "Tomas la decisión", body: "ACM asesora y aporta criterio; la decisión siempre es tuya." },
  { n: "06", title: "Seguimos después de la compra", body: "Nos quedamos contigo en la gestión del alquiler de tu propiedad." },
] as const;

function ProcessSection() {
  return (
    <section id="proceso" className="bg-white scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-x-16 xl:gap-x-24 gap-y-10">
          <Reveal className="lg:sticky lg:top-36 lg:self-start">
            <SectionLabel>Nuestro proceso</SectionLabel>
            <SectionRule />
            <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display }}>
              De la idea a la propiedad que trabaja para ti.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.n} className="grid items-start" style={{ gridTemplateColumns: "2.5rem 1fr", gap: "0 2rem", paddingBlock: "clamp(1.75rem, 3.5vw, 2.5rem)", borderBottom: i < PROCESS_STEPS.length - 1 ? "1px solid rgba(90,98,120,0.1)" : "none" }}>
                <span className="font-mono text-graphite/25 leading-none" style={{ fontSize: "0.6875rem", letterSpacing: LS.data, paddingTop: "0.18em" }} aria-hidden="true">{step.n}</span>
                <div>
                  <h3 className="font-sans font-semibold text-navy-deep" style={{ fontSize: TS.bodyLg, lineHeight: LH.tight, marginBottom: "0.5rem" }}>{step.title}</h3>
                  <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body, maxWidth: "52ch" }}>{step.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── §6 EJEMPLO DE INVERSIÓN ─────────────────────────────────────────────── */
function fmtCOP(n: number) {
  return `$${n.toLocaleString("es-CO")}`;
}

function InvestmentExampleSection() {
  const precio        = 320_000_000;
  const canonMensual  = 2_200_000;
  const ingresosAnual = canonMensual * 12;
  const administracion = 280_000 * 12;
  const mantenimiento  = 3_200_000;
  const vacancia       = canonMensual;
  const impuestos      = 1_500_000;
  const gastosTotales  = administracion + mantenimiento + vacancia + impuestos;
  const ingresoNeto    = ingresosAnual - gastosTotales;
  const rentBruta      = (ingresosAnual / precio) * 100;
  const rentNeta       = (ingresoNeto / precio) * 100;
  const flujoMensual   = ingresoNeto / 12;

  const rows = [
    { label: "Precio de compra",              value: fmtCOP(precio) },
    { label: "Canon mensual",                 value: fmtCOP(canonMensual) },
    { label: "Ingresos anuales",              value: fmtCOP(ingresosAnual) },
    { label: "Administración (anual)",        value: `−${fmtCOP(administracion)}` },
    { label: "Mantenimiento (anual, est.)",   value: `−${fmtCOP(mantenimiento)}` },
    { label: "Vacancia (1 mes/año, est.)",    value: `−${fmtCOP(vacancia)}` },
    { label: "Impuestos y otros gastos",      value: `−${fmtCOP(impuestos)}` },
  ];

  return (
    <section className="bg-cream" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <SectionLabel>Ejemplo de inversión</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "28ch", marginBottom: SP.headlineToBody }}>
            Rentabilidad bruta no es rentabilidad neta.
          </h2>
          <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "56ch", marginBottom: "2.5rem" }}>
            Así se ve, en números simples, la diferencia entre lo que un inmueble parece rentar y lo que realmente deja después de sus gastos.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
            <div className="bg-white border border-graphite/10 rounded-lg p-7 md:p-9">
              <h3 className="font-sans font-bold text-navy-deep mb-6" style={{ fontSize: TS.bodySm, letterSpacing: LS.label, textTransform: "uppercase" }}>
                Apartamento ejemplo — 55 m², Bogotá
              </h3>
              <div className="space-y-0">
                {rows.map((r, i) => (
                  <div key={r.label} className="flex justify-between items-center py-3" style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(90,98,120,0.08)" : "none" }}>
                    <span className="font-sans text-graphite" style={{ fontSize: TS.bodySm }}>{r.label}</span>
                    <span className="font-mono font-medium text-navy-deep" style={{ fontSize: TS.bodySm }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-navy-deep rounded-lg p-7 md:p-8 flex-1">
                <p className="font-sans font-semibold text-cream/60 uppercase mb-2" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Rentabilidad bruta</p>
                <p className="font-display italic text-cream mb-2" style={{ fontSize: TS.displayMd }}>{rentBruta.toFixed(1)}%</p>
                <p className="font-sans text-cream/50" style={{ fontSize: TS.caption }}>Ingresos anuales ÷ precio de compra</p>
              </div>
              <div className="bg-white border-2 border-orange-acm rounded-lg p-7 md:p-8 flex-1">
                <p className="font-sans font-semibold text-orange-acm uppercase mb-2" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Rentabilidad neta estimada</p>
                <p className="font-display italic text-navy-deep mb-2" style={{ fontSize: TS.displayMd }}>{rentNeta.toFixed(1)}%</p>
                <p className="font-sans text-graphite/60" style={{ fontSize: TS.caption }}>Después de gastos, vacancia e impuestos</p>
              </div>
              <div className="bg-cream border border-graphite/10 rounded-lg p-6">
                <p className="font-sans font-semibold text-graphite/60 uppercase mb-1" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Flujo de caja estimado</p>
                <p className="font-mono font-bold text-navy-deep" style={{ fontSize: TS.bodyLg }}>{fmtCOP(Math.round(flujoMensual))} / mes</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 border-l-2 border-orange-acm pl-5">
            <p className="font-sans font-semibold text-navy-deep uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
              Ejemplo ilustrativo — no representa una rentabilidad garantizada
            </p>
            <p className="font-sans text-graphite/60 mt-1" style={{ fontSize: TS.caption, lineHeight: LH.body }}>
              Cifras redondeadas con fines pedagógicos. Cada propiedad real se analiza con sus propios números.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §7 GESTIÓN DE ALQUILERES ───────────────────────────────────────────── */
const RENTAL_SERVICES = [
  { title: "Comercialización",           body: "Publicación, presentación, consultas y visitas.",              icon: <path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 11-5.8-1.6" /> },
  { title: "Selección de inquilinos",    body: "Evaluación del perfil y documentación.",                        icon: <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a6 6 0 0113 0M17 21a5.99 5.99 0 00-2-4.47M17 11a4 4 0 000-8" /> },
  { title: "Gestión contractual",        body: "Contratos, renovaciones y finalizaciones.",                     icon: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 15l2 2 4-4" /> },
  { title: "Gestión de pagos",           body: "Seguimiento de cánones y comunicación con propietarios.",       icon: <path d="M2 7h20v13H2zM2 10h20M6 15h4" /> },
  { title: "Incidencias y mantenimiento",body: "Atención al inquilino, reparaciones y coordinación de proveedores.", icon: <path d="M14.7 6.3a4 4 0 11-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 015.4-5.4z" /> },
  { title: "Seguimiento",                body: "Información al propietario sobre el estado y funcionamiento de su activo.", icon: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" /> },
] as const;

function RentalManagementSection() {
  return (
    <section id="gestion-alquileres" className="bg-navy-deep relative overflow-hidden scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <DotGrid />
      <div className="container-acm relative">
        <Reveal className="max-w-3xl">
          <SectionLabel>Gestión de alquileres</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody }}>
            Invertir en una propiedad no debería convertirse en otro trabajo.
          </h2>
          <p className="font-sans text-cream/60" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            Si ya tienes una propiedad o decides invertir con nosotros, podemos ayudarte también con su gestión —en cualquier parte del país— para que no tengas que ocuparte personalmente del día a día.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {RENTAL_SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i}>
              <div className="border border-cream/12 rounded-lg p-6 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-acm mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon}</svg>
                <h3 className="font-sans font-semibold text-cream mb-2" style={{ fontSize: TS.bodySm }}>{s.title}</h3>
                <p className="font-sans text-cream/50" style={{ fontSize: TS.caption, lineHeight: LH.body }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <a href={whatsappUrl("Hola, quiero gestionar mi propiedad en alquiler con ACM.")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
            <WhatsAppIcon />
            Quiero gestionar mi propiedad
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §8 YA TENGO UNA PROPIEDAD ──────────────────────────────────────────── */
const OWNER_OPTIONS = [
  { label: "Quiero alquilarla",        msg: "Hola, tengo una propiedad y quiero alquilarla." },
  { label: "Quiero delegar la gestión", msg: "Hola, tengo una propiedad en alquiler y quiero delegar su gestión a ACM." },
  { label: "Quiero analizarla",        msg: "Hola, tengo una propiedad y quiero que la analicen dentro de mi estrategia patrimonial." },
] as const;

function OwnerSection() {
  return (
    <section className="bg-cream" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <SectionLabel>Ya tengo una propiedad</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "22ch", marginBottom: SP.headlineToBody }}>
            Tu propiedad puede trabajar por ti.
          </h2>
          <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "52ch", marginBottom: "2.5rem" }}>
            Si ya tienes un inmueble, podemos ayudarte a alquilarlo, gestionarlo o analizar qué papel puede jugar dentro de tu estrategia patrimonial.
          </p>
        </Reveal>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3.5">
          {OWNER_OPTIONS.map((o, i) => (
            <Reveal key={o.label} delay={0.05 * i}>
              <a href={whatsappUrl(o.msg)} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex justify-center w-full sm:w-auto" style={{ fontSize: TS.bodySm, padding: "0.875rem 1.75rem" }}>
                {o.label}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── §9 INVERTIR DESDE EL EXTERIOR ──────────────────────────────────────── */
const INTL_STEPS = ["Búsqueda", "Análisis", "Visitas", "Negociación", "Proceso de compra", "Puesta en alquiler", "Gestión posterior"];

function InternationalSection() {
  return (
    <section id="internacional" className="bg-white scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 items-start">
          <Reveal>
            <SectionLabel>Invertir en Colombia desde el exterior</SectionLabel>
            <SectionRule />
            <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "20ch" }}>
              Invierte en Colombia, aunque no estés en Colombia.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: "2rem" }}>
              ACM puede ser el equipo local que te acompañe en cada etapa, sin que tengas que estar presente en el país:
            </p>
            <ul className="grid grid-cols-2 gap-3 mb-8">
              {INTL_STEPS.map((s) => (
                <li key={s} className="flex items-baseline gap-3 font-sans text-navy-deep/75" style={{ fontSize: TS.bodySm }}>
                  <span className="w-[5px] h-[5px] rounded-full bg-orange-acm shrink-0" style={{ marginTop: "0.4em" }} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <blockquote className="font-display italic text-navy-deep/70 border-l-2 border-orange-acm pl-5" style={{ fontSize: TS.quote, lineHeight: LH.tight }}>
              "Tú tomas las decisiones. Nosotros estamos en el terreno para ayudarte a ejecutarlas."
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── §10 EDUCACIÓN ──────────────────────────────────────────────────────── */
const QUESTIONS = [
  { q: "¿Qué quiero conseguir con esta inversión?",              tip: "Renta mensual, valorización a futuro, o ambas — la respuesta cambia qué tipo de propiedad buscar." },
  { q: "¿Cuánto capital puedo comprometer?",                     tip: "Incluye cuota inicial, gastos notariales y un colchón para imprevistos, no solo el precio de compra." },
  { q: "¿Cuánto puede generar realmente el inmueble?",           tip: "Compara el canon estimado del sector, no solo lo que promete el vendedor." },
  { q: "¿Qué gastos y riesgos existen?",                         tip: "Administración, mantenimiento, vacancia, impuestos y liquidez del inmueble si necesitas venderlo." },
  { q: "¿Cómo encaja esta propiedad dentro de mi patrimonio?",   tip: "Una buena propiedad en el lugar equivocado de tu estrategia puede no ser una buena decisión." },
] as const;

function EducationSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-cream" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <SectionLabel>Educación</SectionLabel>
          <SectionRule />
          <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "26ch", marginBottom: SP.headlineToBody }}>
            Antes de invertir, hazte estas 5 preguntas.
          </h2>
        </Reveal>
        <div className="max-w-3xl">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={0.04 * i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-start gap-5 py-6"
                  style={{ borderTop: "1px solid rgba(90,98,120,0.12)" }}
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-orange-acm shrink-0" style={{ fontSize: TS.bodySm }}>{`0${i + 1}`}</span>
                  <div className="flex-1">
                    <p className="font-sans font-semibold text-navy-deep" style={{ fontSize: TS.bodyLg }}>{item.q}</p>
                    {isOpen && (
                      <p className="font-sans text-graphite mt-2.5" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>{item.tip}</p>
                    )}
                  </div>
                  <span className="text-graphite/40 shrink-0" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </Reveal>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(90,98,120,0.12)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── §11 OPORTUNIDADES DE INVERSIÓN ─────────────────────────────────────── */
function OpportunitiesSection() {
  const opportunities = getInvestmentProperties().slice(0, 4);

  return (
    <section id="oportunidades" className="bg-white scroll-mt-24" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
            <div>
              <SectionLabel>Oportunidades de inversión</SectionLabel>
              <SectionRule />
              <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display }}>
                Propiedades con potencial de inversión.
              </h2>
            </div>
            <Link href="/propiedades" className="group inline-flex items-center gap-4 font-sans font-medium text-graphite hover:text-navy-deep transition-colors duration-300 shrink-0" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
              <span className="uppercase">Ver todas</span>
              <span className="block h-px w-5 bg-graphite/32 group-hover:w-9 group-hover:bg-navy-deep/32 transition-all duration-500" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {opportunities.map((p, i) => {
            const image = p.images.find(img => img.isPrimary) ?? p.images[0];
            return (
              <Reveal key={p._id} delay={0.05 * i}>
                <Link href={`/propiedades/${p.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg mb-4" style={{ aspectRatio: "4/3" }}>
                    {image && (
                      <Image src={image.url} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" />
                    )}
                  </div>
                  <p className="font-sans font-medium text-graphite/60 uppercase mb-1" style={{ fontSize: TS.caption, letterSpacing: LS.data }}>
                    {p.city} · {PROPERTY_TYPE_LABEL[p.type]}
                  </p>
                  <h3 className="font-sans font-bold text-navy-deep mb-1" style={{ fontSize: TS.bodySm }}>{p.title}</h3>
                  {p.priceDisplay && (
                    <p className="font-sans font-semibold text-orange-acm mb-3" style={{ fontSize: TS.bodySm }}>{p.priceDisplay}</p>
                  )}
                  <span className="inline-flex items-center gap-2 font-sans font-medium text-navy-deep group-hover:text-orange-acm transition-colors" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
                    VER OPORTUNIDAD
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="font-sans text-graphite/50 italic mt-8" style={{ fontSize: TS.caption }}>
            Cifras de rentabilidad y proyección sujetas a análisis individual — cuéntanos tu caso y las revisamos juntos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §12 EL CICLO COMPLETO ──────────────────────────────────────────────── */
const CYCLE = ["Encuentra", "Analiza", "Compra", "Alquila", "Gestiona", "Crece"];

function CycleSection() {
  return (
    <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: SP.section }}>
      <DotGrid />
      <div className="container-acm relative text-center" style={{ maxWidth: "56rem", marginInline: "auto" }}>
        <Reveal>
          <SectionLabel light>El ciclo completo</SectionLabel>
          <SectionRule center />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 mb-10">
            {CYCLE.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="font-display italic text-cream" style={{ fontSize: TS.displayMd }}>{step}</span>
                {i < CYCLE.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-acm/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                )}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
            Nuestra relación contigo no termina cuando compras una propiedad.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── §13 POSICIONAMIENTO ────────────────────────────────────────────────── */
const WE_DO_NOT = [
  "No prometemos rentabilidades.",
  "No vendemos cualquier propiedad como una oportunidad.",
  "No usamos lenguaje financiero innecesariamente complejo.",
  "No sustituimos al inversionista en sus decisiones.",
];
const WE_DO = [
  "Aportamos información, análisis, experiencia y acompañamiento.",
  "Te acompañamos desde tu primera inversión hasta la gestión de tu patrimonio.",
  "Te explicamos cada decisión en términos que realmente entiendas.",
  "Estamos en el terreno, no detrás de una pantalla.",
];

function PositioningSection() {
  return (
    <section className="bg-cream" style={{ paddingBlock: SP.section }}>
      <div className="container-acm">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="font-display italic text-navy-deep text-center" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "32ch", marginInline: "auto" }}>
            "Saben de inmobiliario, pero saben explicármelo."
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <Reveal>
            <p className="font-sans font-bold text-graphite/50 uppercase mb-5" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Lo que no hacemos</p>
            <ul className="space-y-4">
              {WE_DO_NOT.map((t) => (
                <li key={t} className="flex items-baseline gap-3 font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
                  <span className="text-graphite/40 shrink-0">✗</span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="font-sans font-bold text-orange-acm uppercase mb-5" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Lo que sí hacemos</p>
            <ul className="space-y-4">
              {WE_DO.map((t) => (
                <li key={t} className="flex items-baseline gap-3 font-sans text-navy-deep" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
                  <span className="text-orange-acm shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── §14 CTA FINAL ──────────────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: SP.section }}>
      <DotGrid />
      <div className="container-acm relative" style={{ maxWidth: "42rem" }}>
        <Reveal>
          <h2 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody }}>
            ¿Estás pensando en invertir en inmobiliario?
          </h2>
          <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: SP.bodyToCta }}>
            No importa si estás dando tu primer paso o si ya tienes un patrimonio construido. Cuéntanos qué quieres conseguir y estudiemos juntos qué opciones pueden tener sentido para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <a href={whatsappUrl("Hola, estoy pensando en invertir en inmobiliario y me gustaría hablar con un asesor.")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
              <WhatsAppIcon />
              Quiero hablar con un asesor
            </a>
            <a href={whatsappUrl("Hola, tengo una propiedad y quiero contarles mi caso.")} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex justify-center" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
              Tengo una propiedad
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
      <DotGrid />
      <div className="container-acm relative">
        <Reveal>
          <SectionLabel>Inversiones</SectionLabel>
          <SectionRule />
          <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "22ch" }}>
            Invierte con criterio. Construye patrimonio.
          </h1>
          <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "50ch", marginBottom: SP.bodyToCta }}>
            Te ayudamos a encontrar, analizar y gestionar oportunidades inmobiliarias de acuerdo con tus objetivos, desde tu primera inversión hasta la construcción de un patrimonio diversificado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <a href={whatsappUrl("Hola, quiero hablar con un asesor sobre inversión inmobiliaria.")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
              <WhatsAppIcon />
              Quiero hablar con un asesor
            </a>
            <a href="#oportunidades" className="btn-ghost inline-flex justify-center" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
              Ver oportunidades
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── EXPORT ─────────────────────────────────────────────────────────────── */
export default function InversionesClient() {
  return (
    <>
      <HeroSection />
      <FactoresSection />
      <ValueSection />
      <DiversifySection />
      <ProfilesSection />
      <ProcessSection />
      <InvestmentExampleSection />
      <RentalManagementSection />
      <OwnerSection />
      <InternationalSection />
      <EducationSection />
      <OpportunitiesSection />
      <CycleSection />
      <PositioningSection />
      <FinalCTASection />
    </>
  );
}
