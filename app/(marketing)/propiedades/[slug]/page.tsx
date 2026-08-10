"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getPropertyBySlug, getAllProperties } from "@/content/properties";
import { TS, LH, LS, SP, EASE } from "@/lib/design-tokens";
import { whatsappUrl } from "@/lib/config";

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
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

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const similar = getAllProperties().filter(p => p.slug !== params.slug).slice(0, 3);
  const waMessage = `Hola, me interesa el apartamento ${property.title} en ${property.neighborhood}. ¿Podrían darme más información?`;

  return (
    <>
      {/* Back */}
      <div className="bg-cream border-b border-graphite/8" style={{ paddingBlock: "1rem" }}>
        <div className="container-acm">
          <Link href="/propiedades" className="inline-flex items-center gap-2 font-sans text-graphite hover:text-navy-deep transition-colors duration-200" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a propiedades
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-navy-deep" style={{ paddingBottom: 0 }}>
        <div className="container-acm" style={{ paddingTop: "2rem" }}>
          <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
            {property.images[activeImage] && (
              <Image src={property.images[activeImage].url} alt={property.images[activeImage].alt} fill className="object-cover object-center" sizes="100vw" priority />
            )}
            {property.images.length > 1 && (
              <>
                <button onClick={() => setActiveImage(i => (i - 1 + property.images.length) % property.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-deep/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy-deep transition-colors" aria-label="Foto anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={() => setActiveImage(i => (i + 1) % property.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-deep/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy-deep transition-colors" aria-label="Foto siguiente">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                <span className="absolute bottom-4 right-4 font-sans text-cream/80 bg-navy-deep/60 backdrop-blur-sm px-3 py-1 rounded-sm" style={{ fontSize: TS.caption }}>{activeImage + 1} / {property.images.length}</span>
              </>
            )}
          </div>
          {property.images.length > 1 && (
            <div className="flex gap-2 pb-6 overflow-x-auto">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className="relative shrink-0 overflow-hidden transition-all duration-200" style={{ width: 80, height: 60, opacity: activeImage === i ? 1 : 0.5, outline: activeImage === i ? "2px solid #E8820C" : "none", outlineOffset: 2 }}>
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-16 gap-y-12">
            <div>
              <Reveal>
                <p className="font-sans font-semibold text-orange-acm uppercase mb-3" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>{property.neighborhood} · {property.city}</p>
                <h1 className="font-display italic text-navy-deep mb-3" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display }}>{property.headline}</h1>
                <p className="font-sans font-semibold text-graphite mb-8" style={{ fontSize: TS.bodyLg }}>{property.title}</p>
                <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
                <p className="font-sans text-graphite mb-6" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>{property.excerpt}</p>
                <p className="font-sans text-graphite mb-10" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>{property.description}</p>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="font-sans font-bold text-navy-deep mb-5" style={{ fontSize: TS.bodyLg }}>Lo más destacado</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                  {property.highlights.map(item => (
                    <li key={item} className="flex items-baseline gap-3 font-sans text-navy-deep/75" style={{ fontSize: TS.bodySm }}>
                      <span className="w-[5px] h-[5px] rounded-full bg-orange-acm shrink-0 mt-[0.4em]" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="border-t border-graphite/12 pt-10">
                  <h2 className="font-sans font-bold text-navy-deep mb-4" style={{ fontSize: TS.bodyLg }}>Sobre {property.neighborhood}</h2>
                  <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>{property.zoneText}</p>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.06}>
                <div className="bg-white border border-graphite/10 rounded-lg p-6">
                  {property.priceDisplay && (
                    <div className="mb-6 pb-6 border-b border-graphite/10">
                      <p className="font-sans text-graphite/60 mb-1" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>PRECIO</p>
                      <p className="font-sans font-bold text-navy-deep" style={{ fontSize: TS.displayMd }}>{property.priceDisplay}</p>
                      <p className="font-sans text-graphite/50 mt-1" style={{ fontSize: TS.caption }}>COP</p>
                    </div>
                  )}
                  <h3 className="font-sans font-bold text-navy-deep mb-4" style={{ fontSize: TS.bodySm }}>Ficha técnica</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Área", value: property.area },
                      { label: "Habitaciones", value: property.bedrooms ? `${property.bedrooms}` : "—" },
                      { label: "Baños", value: property.bathrooms ? `${property.bathrooms}` : "—" },
                      { label: "Parqueaderos", value: property.parking !== undefined ? `${property.parking}` : "—" },
                      { label: "Ciudad", value: property.city },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-graphite/6">
                        <span className="font-sans text-graphite/60" style={{ fontSize: TS.caption }}>{label}</span>
                        <span className="font-mono text-navy-deep font-medium" style={{ fontSize: TS.bodySm }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center gap-2.5" style={{ fontSize: TS.bodySm, padding: "0.875rem 1.5rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Solicitar información
                    </a>
                    <a href={whatsappUrl(`Hola, me gustaría agendar una visita para ${property.title}`)} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center" style={{ fontSize: TS.bodySm, padding: "0.875rem 1.5rem" }}>
                      Agendar visita
                    </a>
                  </div>
                  <p className="font-sans text-graphite/45 text-center mt-4" style={{ fontSize: TS.caption }}>Sin compromiso · Respuesta en minutos</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Similar */}
          {similar.length > 0 && (
            <Reveal delay={0.1} className="mt-20 pt-16 border-t border-graphite/10">
              <h2 className="font-display italic text-navy-deep mb-10" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display }}>Otras propiedades que pueden interesarte.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similar.map(p => (
                  <Link key={p._id} href={`/propiedades/${p.slug}`} className="group block relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    {p.images[0] && <Image src={p.images[0].url} alt={p.images[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="33vw" />}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,10,22,0.8) 0%, transparent 60%)" }} aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-sans text-cream/55 uppercase mb-1" style={{ fontSize: TS.caption }}>{p.neighborhood} · {p.city}</p>
                      <p className="font-display italic text-cream" style={{ fontSize: "1.0625rem", lineHeight: LH.display }}>{p.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}