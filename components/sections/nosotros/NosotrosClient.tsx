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

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const VALORES = [
  {
    n: "01",
    title: "Tu dinero merece respeto",
    body: "No pedimos documentos innecesarios ni generamos gastos sin razón. Cada paso del proceso debe estar claro y tener una justificación.",
  },
  {
    n: "02",
    title: "Sin sorpresas en la firma",
    body: "Cada cliente llega a notaría sabiendo exactamente qué va a firmar, cuánto va a pagar y qué sigue después. Sin letra pequeña que nosotros conozcamos y el cliente no.",
  },
  {
    n: "03",
    title: "Si algo se complica, lo decimos",
    body: "No escondemos retrasos, problemas ni procesos difíciles. Preferimos hablar claro desde el principio antes que generar falsas expectativas.",
  },
  {
    n: "04",
    title: "Acompañamos hasta el final",
    body: "El proceso no termina con una promesa firmada. Termina cuando el cliente recibe su propiedad como fue acordada y siente tranquilidad con la decisión que tomó.",
  },
  {
    n: "05",
    title: "Orientamos antes de vender",
    body: "No mostramos propiedades por mostrar. Primero entendemos qué necesita el cliente, qué puede pagar y qué decisión tiene más sentido para su futuro.",
  },
];

export default function NosotrosClient() {
  const members = getAllTeamMembers();

  return (
    <>
      {/* Hero — Quiénes somos */}
      <section id="quienes-somos" className="bg-navy-deep relative overflow-hidden scroll-mt-24" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Quiénes somos</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "24ch" }}>
              Una firma inmobiliaria de origen familiar.
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-x-16 gap-y-8">
              <p className="font-sans text-cream/70" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
                Somos ACM Hogares e Inversiones, una firma inmobiliaria con sede en Bogotá y operación en todo Cundinamarca. Ayudamos a familias e inversionistas a tomar decisiones inmobiliarias con claridad, respaldo y criterio real, y podemos gestionar propiedades en cualquier parte del país.
                <br /><br />
                Nuestro trabajo empieza mucho antes de una visita. Revisamos presupuesto, necesidades, opciones de crédito y zonas que realmente tengan sentido según cada objetivo — así evitamos pérdidas de tiempo, desplazamientos innecesarios y decisiones tomadas con presión.
                <br /><br />
                <span className="text-cream/85 font-medium">ACM son nuestras iniciales: Alexandra, Christian y Mathias.</span> Somos un equipo de origen familiar que convirtió su obsesión por proteger el patrimonio propio en una metodología para proteger el de otros.
              </p>
              <blockquote className="font-display italic text-cream/75 border-l-2 border-orange-acm pl-6" style={{ fontSize: TS.quote, lineHeight: LH.tight }}>
                "Entendemos que comprar vivienda o invertir no es solo encontrar una propiedad. Es tomar una decisión importante para el patrimonio y el futuro de una persona o una familia."
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="bg-cream scroll-mt-24" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.125rem" }}>Nuestra historia</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-x-16 gap-y-10">
              <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "16ch" }}>
                De familia a firma inmobiliaria.
              </h2>
              <div>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: SP.betweenBodyP }}>
                  Antes de ser una empresa, fuimos una familia tomando decisiones inmobiliarias en un mercado donde muchas veces la información no es clara y el acompañamiento tampoco.
                </p>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: SP.betweenBodyP }}>
                  Vimos de cerca lo que pasa cuando una persona intenta comprar vivienda o invertir sin orientación real: procesos confusos, tiempos inciertos y asesores más enfocados en cerrar rápido que en ayudar bien.
                </p>
                <blockquote className="font-display italic text-navy-deep/70 border-l-2 border-orange-acm pl-5 my-8" style={{ fontSize: TS.quote, lineHeight: LH.tight }}>
                  "Ahí entendimos que queríamos hacer las cosas distinto. No desde discursos comerciales, sino desde la cercanía, la honestidad y el conocimiento real del proceso."
                </blockquote>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: SP.betweenBodyP }}>
                  <span className="font-semibold text-navy-deep">Así nació ACM Hogares e Inversiones</span>, con una idea muy simple: acompañar a cada cliente con el mismo cuidado con el que uno tomaría decisiones para su propia familia.
                </p>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
                  Por eso trabajamos tanto con quienes buscan un hogar como con quienes quieren invertir en finca raíz en Colombia. Porque en ambos casos hay algo importante detrás: el patrimonio, la tranquilidad y el futuro de una persona.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Propósito */}
      <section id="proposito" className="bg-navy-deep relative overflow-hidden scroll-mt-24" style={{ paddingBlock: SP.section }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative text-center" style={{ maxWidth: "44rem", marginInline: "auto" }}>
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Nuestro propósito</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8 mx-auto" aria-hidden="true" />
            <h2 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody }}>
              "Certeza en cada metro cuadrado."
            </h2>
            <p className="font-sans text-cream/60" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
              Comprar vivienda o invertir en finca raíz no debería sentirse como entrar a un proceso lleno de dudas, trámites y presión. En ACM ayudamos a que cada decisión se tome con más claridad, mejor información y acompañamiento real.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Misión y visión */}
      <section id="mision-vision" className="bg-cream scroll-mt-24" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.125rem" }}>Misión y visión 2031</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-10" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white border border-graphite/10 rounded-lg p-8 md:p-10">
                <p className="font-sans font-semibold text-orange-acm uppercase mb-4" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Misión</p>
                <p className="font-sans font-semibold text-navy-deep mb-5" style={{ fontSize: TS.displayMd, lineHeight: "1.3" }}>
                  Acompañamos a familias e inversionistas a tomar decisiones inmobiliarias con claridad, seguridad y respaldo real.
                </p>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
                  Combinamos conocimiento del mercado, presencia en el terreno y asesoría cercana para proteger el patrimonio de quienes confían en nosotros.
                </p>
              </div>
              <div className="bg-navy-deep rounded-lg p-8 md:p-10">
                <p className="font-sans font-semibold text-orange-acm uppercase mb-4" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Visión 2031</p>
                <p className="font-sans font-semibold text-cream mb-5" style={{ fontSize: TS.displayMd, lineHeight: "1.3" }}>
                  Ser la inmobiliaria de confianza para quienes buscan construir patrimonio en Colombia con tranquilidad, claridad y acompañamiento real.
                </p>
                <p className="font-sans text-cream/60" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
                  El nombre al que recurren tanto una familia bogotana como un colombiano en el exterior cuando necesitan orientación honesta para tomar una buena decisión.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="bg-cream border-t border-graphite/10 scroll-mt-24" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.125rem" }}>Valores corporativos</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-6" aria-hidden="true" />
            <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "26ch" }}>
              Principios de comportamiento. No palabras sueltas.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-b border-graphite/12">
            {VALORES.map((v, i) => (
              <Reveal key={v.n} delay={0.04 * i} className={i === VALORES.length - 1 ? "md:col-span-2" : undefined}>
                <div className="flex gap-5 py-7 border-t border-graphite/12">
                  <span className="font-mono text-orange-acm shrink-0" style={{ fontSize: TS.bodySm, letterSpacing: LS.data }}>{v.n}</span>
                  <div className={i === VALORES.length - 1 ? "md:max-w-[50%]" : undefined}>
                    <h3 className="font-sans font-bold text-navy-deep mb-2" style={{ fontSize: TS.bodyLg }}>{v.title}</h3>
                    <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team members */}
      <section id="equipo" className="bg-cream scroll-mt-24" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.125rem" }}>El equipo</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <h2 className="font-display italic text-navy-deep" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "20ch" }}>
              Las personas detrás de ACM.
            </h2>
            <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "52ch", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              Detrás de cada propiedad, cada inversión y cada decisión importante hay personas que le acompañan durante todo el proceso. En ACM creemos que la confianza no nace de un logo ni de una marca; nace de las personas con las que habla, de cómo le asesoran y de la tranquilidad que le transmiten en cada paso.
            </p>
          </Reveal>

          <div className="flex flex-col" style={{ gap: "clamp(5rem, 10vw, 9rem)" }}>
            {members.map((member, i) => (
              <Reveal key={member._id}>
                <article className="grid grid-cols-1 lg:grid-cols-2 items-start gap-x-16 xl:gap-x-24 gap-y-10">

                  {/* Photo */}
                  <div className={i % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                    {member.image ? (
                      <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "3/4", maxWidth: "480px" }}
                      >
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role}, ACM Hogares e Inversiones`}
                          fill
                          /*
                            object-[center_15%] keeps the face
                            in the upper portion without cropping it.
                          */
                          className="object-cover object-[center_15%]"
                          sizes="(max-width: 1024px) 100vw, 480px"
                          priority={i === 0}
                        />
                      </div>
                    ) : (
                      <div
                        className="relative overflow-hidden bg-navy-deep/6 flex items-center justify-center"
                        style={{ aspectRatio: "3/4", maxWidth: "480px" }}
                      >
                        <span className="font-display italic text-navy-deep/15" style={{ fontSize: "clamp(8rem, 20vw, 14rem)" }}>
                          {member.initial}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`${i % 2 === 1 ? "lg:order-1" : "lg:order-2"} lg:pt-8`}>
                    <p className="font-sans font-semibold text-orange-acm uppercase mb-3" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
                      {member.role}
                    </p>
                    <h2 className="font-sans font-bold text-navy-deep mb-6" style={{ fontSize: TS.displayMd, lineHeight: "1.15" }}>
                      {member.name}
                    </h2>

                    {/* Quote */}
                    <blockquote
                      className="font-display italic text-navy-deep/65 border-l-2 border-orange-acm pl-5 mb-8"
                      style={{ fontSize: TS.quote, lineHeight: LH.tight }}
                    >
                      "{member.quote}"
                    </blockquote>

                    <p className="font-sans text-graphite mb-10" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
                      {member.bio}
                    </p>

                    <a
                      href={whatsappUrl(`Hola ${member.name.split(" ")[0]}, me gustaría recibir asesoría inmobiliaria`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex gap-2.5"
                      style={{ fontSize: TS.bodySm, padding: "0.75rem 1.625rem" }}
                    >
                      <WhatsAppIcon />
                      Hablar con {member.name.split(" ")[0]}
                    </a>
                  </div>
                </article>

                {i < members.length - 1 && (
                  <div className="w-full h-px bg-graphite/10 mt-16" aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <div style={{ maxWidth: "40rem" }}>
            <Reveal>
              <p className="font-sans font-semibold text-orange-acm uppercase mb-4" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>Hablemos</p>
              <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
              <h2 className="font-display italic text-cream mb-6" style={{ fontSize: TS.displayLg, letterSpacing: LS.display, lineHeight: LH.display }}>
                Conocer al equipo es el primer paso.
              </h2>
              <p className="font-sans text-cream/52 mb-10" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "40ch" }}>
                Sin compromisos. Una conversación directa con alguien que conoce el mercado y te va a decir la verdad.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
                  <WhatsAppIcon />
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
