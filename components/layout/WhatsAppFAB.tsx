"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsAppFABProps {
  /** Segundos antes de que aparezca el botón. Default: 5 */
  delaySeconds?: number;
  /** Mensaje pre-llenado en WhatsApp */
  message?: string;
  /** Número en formato internacional sin + ni espacios */
  phoneNumber?: string;
}

export default function WhatsAppFAB({
  delaySeconds = 5,
  message     = "Hola, me gustaría recibir asesoría inmobiliaria",
  phoneNumber = "573001234567",
}: WhatsAppFABProps) {
  const [visible,      setVisible]      = useState(false);
  const [showTooltip,  setShowTooltip]  = useState(false);
  const [dismissed,    setDismissed]    = useState(false);

  /* Aparece después del delay definido */
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      /* Muestra el tooltip 800ms después de que aparezca el botón */
      setTimeout(() => setShowTooltip(true), 800);
      /* Oculta el tooltip automáticamente a los 5s */
      setTimeout(() => setShowTooltip(false), 5800);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  if (dismissed) return null;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-toast flex flex-col items-end gap-3"
      role="complementary"
      aria-label="Contacto rápido por WhatsApp"
    >
      {/* Tooltip / label */}
      <AnimatePresence>
        {showTooltip && visible && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0,  scale: 1 }}
            exit={{    opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 bg-navy-deep border border-white/10 rounded-lg px-4 py-2.5 shadow-card-lg"
          >
            <p className="font-sans text-sm text-cream/90 whitespace-nowrap">
              ¿Tienes dudas? Escríbenos
            </p>
            {/* Botón cerrar tooltip */}
            <button
              onClick={() => setShowTooltip(false)}
              className="text-cream/40 hover:text-cream/80 transition-colors ml-1 focus-visible:outline-orange-acm rounded"
              aria-label="Cerrar sugerencia"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            {/* Arrow pointing right toward the button */}
            <span
              className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop:    "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft:   "6px solid rgba(15,32,68,0.95)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB group */}
      <div className="flex items-end gap-2">
        {/* Dismiss button — pequeño, encima del FAB */}
        <AnimatePresence>
          {visible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{    opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              onClick={() => setDismissed(true)}
              className="self-start mt-1 w-5 h-5 rounded-full bg-navy-mid border border-white/10 flex items-center justify-center text-cream/40 hover:text-cream/80 transition-colors focus-visible:outline-orange-acm"
              aria-label="Ocultar botón de WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <AnimatePresence>
          {visible && (
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{    scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{   scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
              style={{ backgroundColor: "#25D366" }}
              aria-label="Contactar por WhatsApp"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>

              {/* Pulse ring animado */}
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: "rgba(37,211,102,0.3)",
                  animationDuration: "2.5s",
                }}
                aria-hidden="true"
              />
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
