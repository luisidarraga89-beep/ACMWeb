"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getAllProperties } from "@/content/properties";
import { TS, LH, LS, SP, EASE } from "@/lib/design-tokens";
import { whatsappUrl } from "@/lib/config";
import { Property } from "@/types/property";

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

function PropertyCard({ property, large = false }: { property: Property; large?: boolean }) {
  const primaryImage = property.images.find(i => i.isPrimary) ?? property.images[0];
  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block relative overflow-hidden bg-graphite/5"
      style={{ aspectRatio: large ? "3/4" : "4/3" }}
      aria-label={`${property.title} — ${property.neighborhood}`}
    >
      {primaryImage && (
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover object-center transition-transform ease-out group-hover:scale-[1.026]"
          style={{ transitionDuration: "1400ms" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(6,10,22,0.82) 0%, rgba(6,10,22,0.15) 50%, transparent 70%)" }} aria-hidden="true" />

      <span className="absolute font-sans font-semibold uppercase backdrop-blur-sm" style={{ top: "1rem", right: "1rem", fontSize: TS.caption, letterSpacing: LS.label, background: "rgba(15,32,68,0.6)", color: "rgba(251,248,244,0.85)", padding: "0.3rem 0.625rem", borderRadius: "2px" }}>
        {property.status === "venta" ? "Venta" : "Arriendo"}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="font-sans text-cream/55 uppercase mb-1.5" style={{ fontSize: TS.caption, letterSpacing: LS.data }}>{property.neighborhood} · {property.city}</p>
        <h3 className="font-display italic text-cream mb-1.5" style={{ fontSize: "1.125rem", lineHeight: LH.display, letterSpacing: LS.display }}>{property.title}</h3>
        <div className="flex items-center gap-4">
          <span className="font-mono text-cream/50" style={{ fontSize: "0.75rem", letterSpacing: LS.data }}>{property.area}</span>
          {property.priceDisplay && (
            <span className="font-sans font-semibold text-orange-acm" style={{ fontSize: "0.8125rem" }}>{property.priceDisplay}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function PropiedadesPage() {
  const properties = getAllProperties();

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Propiedades</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "22ch" }}>
              Cada propiedad, una historia.
            </h1>
            <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "48ch" }}>
              No mostramos propiedades por mostrar. Cada opción que encontrarás aquí ha sido seleccionada por el equipo ACM con criterio y conocimiento del mercado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-cream" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {properties.map((property, i) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.1} className="mt-16 md:mt-20">
            <div className="border-t border-graphite/12 pt-16 md:pt-20">
              <p className="font-display italic text-navy-deep mb-6" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "28ch" }}>
                ¿No encontraste lo que buscas? Cuéntanos y lo encontramos.
              </p>
              <a href={whatsappUrl("Hola, estoy buscando una propiedad y me gustaría recibir asesoría")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Hablar con un asesor
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
