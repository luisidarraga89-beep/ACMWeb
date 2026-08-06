"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ACMLogo from "@/components/icons/ACMLogo";

/* ─── NAVIGATION LINKS ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Inicio",       href: "/" },
  { label: "Nosotros",     href: "/nosotros" },
  { label: "Propiedades",  href: "/propiedades" },
  { label: "Inversiones",  href: "/inversiones" },
  { label: "Blog",         href: "/blog" },
  { label: "Contacto",     href: "/contacto" },
] as const;

/* ─── ANIMATION VARIANTS ─────────────────────────────────────────────────── */

const drawerVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const drawerItemVariants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  }),
};

const hamburgerLineVariants = {
  closed: { top: { rotate: 0, y: 0 }, mid: { opacity: 1 }, bot: { rotate: 0, y: 0 } },
  open:   { top: { rotate: 45, y: 6.5 }, mid: { opacity: 0 }, bot: { rotate: -45, y: -6.5 } },
};

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */

export default function Navbar() {
  const pathname        = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  /* Scroll listener — activa estado "scrolled" después de 20px */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Cerrar mobile menu en cambio de ruta */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Bloquear scroll del body cuando drawer está abierto */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── NAVBAR BAR ─────────────────────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-sticky transition-all duration-300",
          scrolled
            ? "bg-navy-deep/97 backdrop-blur-md border-b border-white/8 shadow-[0_2px_24px_rgba(15,32,68,0.4)]"
            : "bg-navy-deep border-b border-white/6",
        ].join(" ")}
        style={{ height: "var(--navbar-height)" }}
      >
        <div className="container-acm h-full flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-orange-acm"
            aria-label="ACM Hogares e Inversiones — Inicio"
          >
            <ACMLogo variant="isotipo" className="w-9 h-9" />
            <span className="flex flex-col leading-none">
              <span className="font-sans font-bold text-white text-[15px] tracking-wide">
                ACM
              </span>
              <span className="font-sans text-[9px] tracking-[0.08em] uppercase text-cream/50 mt-0.5">
                Hogares{" "}
                <span className="text-orange-acm">e</span>{" "}
                Inversiones
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "relative font-sans font-medium text-sm px-3 py-1.5 rounded transition-colors duration-200",
                  isActive(href)
                    ? "text-white bg-white/5"
                    : "text-cream/70 hover:text-white",
                ].join(" ")}
              >
                {label}
                {/* Underline activo */}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-px bg-orange-acm rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/573001234567?text=Hola,%20me%20gustaría%20recibir%20asesoría%20inmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm py-2 px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <Link
              href="/contacto"
              className="btn-primary text-sm py-2 px-5"
            >
              Hablar con un asesor
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 rounded focus-visible:outline-orange-acm"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[1.5px] bg-cream/80 rounded-full origin-center"
                animate={mobileOpen
                  ? i === 0 ? { rotate: 45, y: 6.5, width: 22 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -6.5, width: 22 }
                  : { rotate: 0, y: 0, opacity: 1, width: i === 2 ? 16 : 22 }
                }
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                style={{ width: i === 2 ? 16 : 22 }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-navy-deep/70 backdrop-blur-sm z-overlay lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              key="drawer"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-navy-deep z-modal lg:hidden flex flex-col shadow-2xl border-l border-white/8"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 border-b border-white/8"
                style={{ height: "var(--navbar-height-mobile)" }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 focus-visible:outline-orange-acm"
                  onClick={() => setMobileOpen(false)}
                >
                  <ACMLogo variant="isotipo" className="w-8 h-8" />
                  <span className="font-sans font-bold text-white text-sm tracking-wide">ACM</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded text-cream/60 hover:text-white hover:bg-white/8 transition-colors focus-visible:outline-orange-acm"
                  aria-label="Cerrar menú"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Navegación móvil">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    custom={i}
                    initial="closed"
                    animate="open"
                    variants={drawerItemVariants}
                  >
                    <Link
                      href={href}
                      className={[
                        "flex items-center justify-between px-4 py-3.5 rounded-lg font-sans font-medium text-[15px] transition-colors",
                        isActive(href)
                          ? "text-white bg-white/8"
                          : "text-cream/75 hover:text-white hover:bg-white/5",
                      ].join(" ")}
                    >
                      {label}
                      {isActive(href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-acm" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTAs */}
              <div className="px-6 pb-8 flex flex-col gap-3 border-t border-white/8 pt-6">
                <Link
                  href="/contacto"
                  className="btn-primary w-full justify-center py-3.5 text-[15px]"
                  onClick={() => setMobileOpen(false)}
                >
                  Hablar con un asesor
                </Link>
                <a
                  href="https://wa.me/573001234567?text=Hola,%20me%20gustaría%20recibir%20asesoría%20inmobiliaria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-center py-3.5 text-[15px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp directo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer — compensa el navbar fixed */}
      <div style={{ height: "var(--navbar-height)" }} aria-hidden="true" />
    </>
  );
}
