"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getAllTeamMembers } from "@/content/team";
import { TS, LH, LS, SP, EASE } from "@/lib/design-tokens";
import { whatsappUrl } from "@/lib/config";

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

export default function NosotrosClient() {
  const members = getAllTeamMembers();

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>El equipo</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full" style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }} aria-hidden="true" />
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "22ch" }}>
              Las personas detrás de ACM.
            </h1>
            <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "52ch" }}>
              Detrás de cada propiedad, cada inversión y cada decisión importante hay personas que le acompañan durante todo el proceso. En ACM creemos que la confianza no nace de un logo ni de una marca; nace de las personas con las que habla, de cómo le asesoran y de la tranquilidad que le transmiten en cada paso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-cream" style={{ paddingBlock: SP.section }} aria-labelledby="team-heading">
        <h2 id="team-heading" className="sr-only">Nuestro equipo</h2>
        <div className="container-acm">
          <div className="flex flex-col gap-24 md:gap-32">
            {members.map((member, i) => (
              <Reveal key={member._id} delay={i * 0.05}>
                <article className={`grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-12 items-center ${i % 2 === 1 ? "" : ""}`}>

                  {/* Photo */}
                  <div className={`${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role}, ACM Hogares e Inversiones`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        /* Placeholder elegante si no hay foto */
                        <div className="w-full h-full bg-navy-deep/8 flex items-center justify-center">
                          <span className="font-display italic text-navy-deep/20" style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}>
                            {member.initial}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                    <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "0.75rem" }}>
                      {member.role}
                    </p>
                    <h2 className="font-sans font-bold text-navy-deep" style={{ fontSize: TS.displayMd, lineHeight: LH.display, marginBottom: "1.5rem" }}>
                      {member.name}
                    </h2>

                    {/* Quote */}
                    <blockquote className="font-display italic text-navy-deep/70 border-l-2 border-orange-acm pl-5 mb-8" style={{ fontSize: TS.quote, lineHeight: LH.tight }}>
                      "{member.quote}"
                    </blockquote>

                    <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: SP.bodyToCta }}>
                      {member.bio}
                    </p>

                    <a
                      href={whatsappUrl(`Hola ${member.name.split(" ")[0]}, me gustaría recibir asesoría inmobiliaria`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex gap-2.5"
                      style={{ fontSize: TS.bodySm, padding: "0.75rem 1.625rem" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Hablar con {member.name.split(" ")[0]}
                    </a>
                  </div>
                </article>

                {i < members.length - 1 && (
                  <div className="w-full h-px bg-graphite/10 mt-24 md:mt-32" aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy-deep" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <div style={{ maxWidth: "40rem" }}>
            <Reveal>
              <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Hablemos</p>
              <div className="w-10 h-[3px] bg-orange-acm rounded-full" style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }} aria-hidden="true" />
              <h2 className="font-display italic text-cream" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody }}>
                Conocer al equipo es el primer paso.
              </h2>
              <p className="font-sans text-cream/52" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "40ch", marginBottom: SP.bodyToCta }}>
                Sin compromisos. Una conversación directa con alguien que conoce el mercado y te va a decir la verdad.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[1.0625rem] h-[1.0625rem] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Hablar con un asesor
                </a>
                <Link href="/propiedades" className="btn-ghost inline-flex justify-center" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
                  Ver propiedades
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
