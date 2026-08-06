"use client";

/**
 * HeroSection.tsx
 * components/sections/HeroSection.tsx
 *
 * REFINEMENT PASS:
 * · Removed `useRef` (unused)
 * · Simplified video state — poster covers until video is ready
 * · Entry animation: one motion block, all children together
 *   The stagger was too theatrical. Now: single fade-up, 0.9s.
 * · Mobile: image fills the full viewport height correctly
 * · Text positioned lower on mobile (more breathing room above)
 * · CTA layout: stacks on mobile without gap inconsistency
 * · Removed unused `useScroll`/`useTransform` imports
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─── PROPS ──────────────────────────────────────────────────────────────── */

interface HeroSectionProps {
  videoSrc?: string;
  imageSrc?:  string;
  imageAlt?:  string;
}

/* ─── ICONS ──────────────────────────────────────────────────────────────── */

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-[1.0625rem] h-[1.0625rem] shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */

export default function HeroSection({
  videoSrc = "/video/hero.mp4",
  imageSrc  = "/images/hero-mobile.jpg",
  imageAlt  = "Arquitectura contemporánea — ACM Hogares e Inversiones",
}: HeroSectionProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [ready,    setReady]    = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile on mount + resize */
  useEffect(() => {
    const mq      = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Video: play when canplaythrough fires */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;
    const onReady = () => {
      setReady(true);
      video.play().catch(() => {/* autoplay blocked — poster shows */});
    };
    video.addEventListener("canplaythrough", onReady, { once: true });
    return () => video.removeEventListener("canplaythrough", onReady);
  }, [isMobile]);

  return (
    <section
      className="relative overflow-hidden"
      /*
        Height: 100svh uses the small viewport height on mobile —
        prevents the address bar causing a jump.
        min-height cap at 840px stops it being absurdly tall on big screens.
        max-height cap at 900px keeps the page scrollable on landscape.
      */
      style={{ height: "100svh", minHeight: "580px", maxHeight: "900px" }}
      aria-label="ACM Hogares e Inversiones"
    >

      {/* ── BACKGROUND: VIDEO (desktop) ─────────────────────────────────── */}
      {!isMobile && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* ── BACKGROUND: IMAGE (mobile + video fallback) ─────────────────── */}
      {(isMobile || !ready) && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          quality={88}
          className="object-cover object-center"
          sizes="100vw"
        />
      )}

      {/*
        OVERLAY
        Two-layer approach:
        1. Bottom gradient: dense at bottom (text lives here), fades to near-zero
        2. Global tint: 12% navy over the whole frame for visual cohesion
        The result: video breathes at the top, text is legible at the bottom.
        No more. No less.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,10,22,0.88) 0%, rgba(6,10,22,0.5) 28%, rgba(6,10,22,0.12) 58%, rgba(6,10,22,0) 80%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none bg-navy-deep/10"
        aria-hidden="true"
      />

      {/*
        ORANGE LINE — top edge accent.
        One pixel. Central fade. Barely there.
        Connects the navbar to the hero visually.
      */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,130,12,0.7) 25%, rgba(245,160,51,0.85) 50%, rgba(232,130,12,0.7) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <div
        className="container-acm relative h-full flex flex-col justify-end"
        style={{ paddingBottom: "clamp(3rem, 7vw, 5rem)" }}
      >
        {/*
          Single motion block — content enters as one unit.
          Duration 0.85s. No stagger. No delay cascade.
          The hero should feel like it's already there when you arrive.
        */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "42rem" }}
        >

          {/* Geo label */}
          <p
            className="font-sans font-semibold text-orange-acm uppercase tracking-[0.14em]"
            style={{ fontSize: "0.6875rem", marginBottom: "1.25rem" }}
          >
            Bogotá · Cundinamarca · Sabana
          </p>

          {/* Headline — Lora italic, display size */}
          <h1
            className="font-display italic text-white"
            style={{
              fontSize: "clamp(1.875rem, 5.5vw, 3.75rem)",
              letterSpacing: "-0.024em",
              lineHeight: "1.08",
              marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
            }}
          >
            "Certeza en cada metro cuadrado."
          </h1>

          {/* Subcopy */}
          <p
            className="font-sans text-cream/72"
            style={{
              fontSize: "clamp(0.9375rem, 1.6vw, 1.0625rem)",
              lineHeight: "1.72",
              maxWidth: "46ch",
              marginBottom: "clamp(1.75rem, 4vw, 2.5rem)",
            }}
          >
            Acompañamiento inmobiliario para hogares e inversiones
            en Bogotá y la Sabana.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20inmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex justify-center gap-2.5"
              style={{ fontSize: "0.9375rem", padding: "0.875rem 1.75rem" }}
            >
              <WhatsAppIcon />
              Hablar con un asesor
            </a>

            <Link
              href="/propiedades"
              className="btn-ghost inline-flex justify-center gap-2.5 group"
              style={{ fontSize: "0.9375rem", padding: "0.875rem 1.75rem" }}
            >
              Explorar propiedades
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
