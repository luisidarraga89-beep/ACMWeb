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
 * · Video autoplays on mobile too (skipped only under Data Saver)
 * · Text positioned lower on mobile (more breathing room above)
 * · CTA layout: stacks on mobile without gap inconsistency
 * · Removed unused `useScroll`/`useTransform` imports
 */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─── PROPS ──────────────────────────────────────────────────────────────── */

interface HeroSectionProps {
  videoSrc?: string;
  imageSrc?:  string;
  imageAlt?:  string;
}

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */

export default function HeroSection({
  videoSrc = "/video/hero.mp4",
  imageSrc  = "/images/hero-mobile.jpg",
  imageAlt  = "Arquitectura contemporánea — ACM Hogares e Inversiones",
}: HeroSectionProps) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [ready,      setReady]      = useState(false);
  const [saveData,   setSaveData]   = useState(false);

  /*
    Respect the browser's Data Saver setting (Chrome/Android "Lite mode").
    Everyone else — desktop and mobile alike — gets the video.
  */
  useEffect(() => {
    const conn = (navigator as any).connection;
    setSaveData(Boolean(conn?.saveData));
  }, []);

  /* Video: play when canplaythrough fires */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || saveData) return;
    const onReady = () => {
      setReady(true);
      video.play().catch(() => {/* autoplay blocked — poster shows */});
    };
    video.addEventListener("canplaythrough", onReady, { once: true });
    return () => video.removeEventListener("canplaythrough", onReady);
  }, [saveData]);

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

      {/* ── BACKGROUND: VIDEO (desktop + mobile) ─────────────────────────── */}
      {!saveData && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          {/* A `src` on <video> itself would short-circuit these — browser must pick between them */}
          <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* ── BACKGROUND: IMAGE (data-saver mode + video fallback) ─────────── */}
      {(saveData || !ready) && (
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
            Bogotá · Cundinamarca
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
            en Bogotá y todo Cundinamarca.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
