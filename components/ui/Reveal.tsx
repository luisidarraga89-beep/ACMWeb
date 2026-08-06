"use client";

/**
 * components/ui/Reveal.tsx
 *
 * The single scroll-triggered fade primitive used across the entire application.
 * Extracted from HomeClient.tsx — now shared by every page.
 *
 * Rules (frozen after homepage approval):
 * · Y travel: 20px fixed — do not vary this
 * · Duration: 0.95s — do not vary this
 * · Easing: EASE from design-tokens — do not change
 * · Fires at -8% margin — early enough that animation never plays mid-viewport
 * · Max 2 Reveal wrappers per section
 * · Max delay 0.15s
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/design-tokens";

interface RevealProps {
  children:  React.ReactNode;
  className?: string;
  delay?:     number;
  style?:     React.CSSProperties;
}

export default function Reveal({ children, className, delay = 0, style }: RevealProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
