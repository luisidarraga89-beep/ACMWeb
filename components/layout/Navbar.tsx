"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ACMLogo from "@/components/icons/ACMLogo";
import { whatsappUrl } from "@/lib/config";

interface NavSubLink { label: string; href: string }
interface NavLink { label: string; href: string; submenu?: NavSubLink[] }

const NAV_LINKS: NavLink[] = [
  {
    label: "Inicio", href: "/",
    submenu: [
      { label: "Propiedades destacadas",  href: "/#destacadas" },
      { label: "Cómo trabajamos",         href: "/#como-trabajamos" },
      { label: "Contacto",                href: "/#hablemos" },
    ],
  },
  {
    label: "Nosotros", href: "/nosotros",
    submenu: [
      { label: "Quiénes somos",     href: "/nosotros#quienes-somos" },
      { label: "Nuestro equipo",    href: "/nosotros#equipo" },
      { label: "Valores",           href: "/nosotros#valores" },
    ],
  },
  {
    label: "Propiedades", href: "/propiedades",
    submenu: [
      { label: "Todas las propiedades", href: "/propiedades" },
      { label: "En venta",              href: "/propiedades?operacion=venta#filtros" },
      { label: "En arriendo",           href: "/propiedades?operacion=arriendo#filtros" },
    ],
  },
  {
    label: "Inversiones", href: "/inversiones",
    submenu: [
      { label: "Cómo genera valor",    href: "/inversiones#como-genera-valor" },
      { label: "Gestión de alquileres",href: "/inversiones#gestion-alquileres" },
      { label: "Oportunidades",        href: "/inversiones#oportunidades" },
    ],
  },
  {
    label: "Blog", href: "/blog",
    submenu: [
      { label: "Todos los artículos", href: "/blog" },
      { label: "Comprar",             href: "/blog?categoria=comprar#categorias" },
      { label: "Invertir",            href: "/blog?categoria=invertir#categorias" },
      { label: "Vender",              href: "/blog?categoria=vender#categorias" },
      { label: "Alquilar",            href: "/blog?categoria=alquilar#categorias" },
    ],
  },
  { label: "Contacto", href: "/contacto" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="w-3 h-3 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const pathname   = usePathname();
  const isHomepage = pathname === "/";

  // Initialize scrolled from actual scroll position to avoid flash
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu,       setOpenMenu]       = useState<string | null>(null);
  const [openMobileSub,  setOpenMobileSub]  = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    // Set correct initial state immediately
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); setOpenMobileSub(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openDropdown = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(href);
  };
  const closeDropdownDelayed = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    if (!openMenu) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [openMenu]);

  /*
    Navbar appearance:
    · Homepage + top (not scrolled) → transparent over hero video
    · Homepage + scrolled → cream with logo in color
    · Any other page → cream with logo in color
  */
  const isTransparent = isHomepage && !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[200] transition-all duration-300"
        style={{
          height: "72px",
          background: isTransparent ? "transparent" : "#FBF8F4",
          boxShadow: isTransparent ? "none" : "0 1px 0 rgba(15,32,68,0.08)",
        }}
      >
        <div className="container-acm h-full flex items-center justify-between gap-8">

          {/* Logo — isotipo SVG + text */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-orange-acm rounded"
            aria-label="ACM Hogares e Inversiones — Inicio"
          >
            <ACMLogo
              variant="isotipo"
              theme={isTransparent ? "white" : "color"}
              className="w-9 h-9"
            />
            <span className="flex flex-col leading-none">
              <span
                className="font-sans font-bold text-[15px] tracking-wide transition-colors duration-300"
                style={{ color: isTransparent ? "#fff" : "#0F2044" }}
              >
                ACM
              </span>
              <span
                className="font-sans text-[9px] tracking-[0.08em] mt-0.5 transition-colors duration-300"
                style={{ color: isTransparent ? "rgba(251,248,244,0.5)" : "rgba(15,32,68,0.45)" }}
              >
                Hogares{" "}
                <span className="text-orange-acm">e</span>{" "}
                Inversiones
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_LINKS.map(({ label, href, submenu }) => (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => submenu && openDropdown(href)}
                onMouseLeave={() => submenu && closeDropdownDelayed()}
              >
                <div className="flex items-center">
                  <Link
                    href={href}
                    className="relative font-sans font-medium text-sm pl-3 py-1.5 rounded transition-colors duration-200"
                    style={{
                      color: isActive(href)
                        ? (isTransparent ? "#fff" : "#0F2044")
                        : (isTransparent ? "rgba(251,248,244,0.75)" : "rgba(15,32,68,0.6)"),
                    }}
                  >
                    {label}
                    {isActive(href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-px bg-orange-acm rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                  {submenu && (
                    <button
                      type="button"
                      onClick={() => setOpenMenu(openMenu === href ? null : href)}
                      aria-label={`Mostrar secciones de ${label}`}
                      aria-expanded={openMenu === href}
                      className="p-1.5 pr-3 -ml-1 rounded transition-colors duration-200"
                      style={{ color: isTransparent ? "rgba(251,248,244,0.6)" : "rgba(15,32,68,0.45)" }}
                    >
                      <ChevronIcon open={openMenu === href} />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {submenu && openMenu === href && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-2 min-w-[230px] bg-white border border-navy-deep/8 rounded-lg shadow-xl py-2 z-[210]"
                    >
                      {submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2.5 px-4 py-2.5 font-sans text-sm text-navy-deep/70 hover:text-navy-deep hover:bg-navy-deep/5 transition-colors duration-150"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-acm shrink-0" aria-hidden="true" />
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium text-sm flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-200"
              style={{
                color:        isTransparent ? "rgba(251,248,244,0.75)" : "rgba(15,32,68,0.65)",
                borderColor:  isTransparent ? "rgba(255,255,255,0.2)"  : "rgba(15,32,68,0.2)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/contacto" className="btn-primary text-sm py-2 px-5">
              Hablar con un asesor
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 rounded focus-visible:outline-orange-acm"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[1.5px] rounded-full origin-center"
                style={{
                  background: isTransparent ? "rgba(251,248,244,0.8)" : "rgba(15,32,68,0.7)",
                  width: i === 2 ? 16 : 22,
                }}
                animate={
                  mobileOpen
                    ? i === 0 ? { rotate: 45, y: 6.5, width: 22 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -6.5, width: 22 }
                    : { rotate: 0, y: 0, opacity: 1, width: i === 2 ? 16 : 22 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile drawer — cream background */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-navy-deep/40 backdrop-blur-sm z-[300] lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-cream z-[400] lg:hidden flex flex-col shadow-2xl border-l border-navy-deep/8"
            >
              <div className="flex items-center justify-between px-6 border-b border-navy-deep/8" style={{ height: "64px" }}>
                <Link href="/" className="flex items-center gap-2 focus-visible:outline-orange-acm" onClick={() => setMobileOpen(false)}>
                  <ACMLogo variant="isotipo" theme="color" className="w-8 h-8" />
                  <span className="font-sans font-bold text-navy-deep text-sm tracking-wide">ACM</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded text-navy-deep/50 hover:text-navy-deep hover:bg-navy-deep/5 transition-colors" aria-label="Cerrar menú">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-2 py-4">
                {NAV_LINKS.map(({ label, href, submenu }) => (
                  <div key={href} className="mb-1">
                    <div
                      className="flex items-center justify-between rounded-lg transition-colors"
                      style={{ background: isActive(href) ? "rgba(15,32,68,0.05)" : "transparent" }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 flex items-center gap-2 px-4 py-3.5 font-sans font-medium text-[15px] transition-colors"
                        style={{ color: isActive(href) ? "#0F2044" : "rgba(15,32,68,0.6)" }}
                      >
                        {label}
                        {isActive(href) && <span className="w-1.5 h-1.5 rounded-full bg-orange-acm" aria-hidden="true" />}
                      </Link>
                      {submenu && (
                        <button
                          type="button"
                          onClick={() => setOpenMobileSub(openMobileSub === href ? null : href)}
                          aria-label={`Mostrar secciones de ${label}`}
                          aria-expanded={openMobileSub === href}
                          className="px-4 py-3.5 text-navy-deep/45"
                        >
                          <ChevronIcon open={openMobileSub === href} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {submenu && openMobileSub === href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 py-2.5 pl-9 pr-4 font-sans text-[13.5px] text-navy-deep/60 hover:text-navy-deep transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-orange-acm/70 shrink-0" aria-hidden="true" />
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="px-6 pb-8 flex flex-col gap-3 border-t border-navy-deep/8 pt-6">
                <Link href="/contacto" className="btn-primary w-full justify-center py-3.5 text-[15px]" onClick={() => setMobileOpen(false)}>
                  Hablar con un asesor
                </Link>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center py-3.5 text-[15px]">
                  WhatsApp directo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/*
        Spacer: reserves 72px in normal flow so fixed-header pages don't
        have content hidden underneath. Skipped on the homepage — the hero
        section fills the first viewport itself and must sit at y:0 so the
        transparent navbar overlays it directly (no cream gap at the top).
      */}
      {!isHomepage && <div style={{ height: "72px" }} aria-hidden="true" />}
    </>
  );
}
