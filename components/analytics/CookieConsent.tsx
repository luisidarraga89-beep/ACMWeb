"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TS, LH } from "@/lib/design-tokens";
import { getStoredConsent, setStoredConsent, onOpenCookieSettings } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => onOpenCookieSettings(() => setVisible(true)), []);

  const decide = (status: "accepted" | "rejected") => {
    setStoredConsent(status);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Preferencias de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-4 right-4 bottom-4 sm:right-auto sm:max-w-sm z-tooltip bg-navy-deep border border-white/10 rounded-lg shadow-card-lg p-5 md:p-6"
        >
          <p className="font-sans font-bold text-cream mb-2" style={{ fontSize: TS.bodySm }}>
            Usamos cookies
          </p>
          <p className="font-sans text-cream/65 mb-5" style={{ fontSize: "0.8125rem", lineHeight: LH.body }}>
            Usamos cookies propias y de terceros para analizar el uso del sitio y, si lo aceptas, medir el resultado de nuestras campañas. Puedes cambiar tu elección cuando quieras.{" "}
            <Link href="/privacidad#cookies" className="text-orange-acm underline underline-offset-2 hover:text-orange-light">
              Más información
            </Link>
          </p>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="flex-1 font-sans font-semibold rounded-md border border-white/20 text-cream/80 hover:bg-white/5 transition-colors duration-200"
              style={{ fontSize: "0.8125rem", padding: "0.6rem 1rem" }}
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="flex-1 font-sans font-semibold rounded-md bg-orange-acm text-white hover:bg-[#d0720a] transition-colors duration-200"
              style={{ fontSize: "0.8125rem", padding: "0.6rem 1rem" }}
            >
              Aceptar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
