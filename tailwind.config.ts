import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── ACM COLOR SYSTEM ───────────────────────────────────────────────
      colors: {
        navy: {
          deep:   "#0F2044", // headers, navbar, fondos oscuros, texto principal
          mid:    "#1A3366", // botones secundarios, íconos, secciones intermedias
        },
        blue: {
          acm:    "#0453A6", // base del degradado del logo
        },
        orange: {
          acm:    "#E8820C", // CTAs principales, highlights, acentos clave (máx 20%)
          light:  "#F5A033", // badges, pills, detalles decorativos
        },
        cream:    "#FBF8F4", // fondos de sección, tarjetas suaves, respiro visual
        graphite: "#5A6278", // texto secundario, captions, metadata de propiedades
        // Aliases semánticos para uso rápido en clases
        brand: {
          primary:   "#0F2044",
          secondary: "#1A3366",
          accent:    "#E8820C",
          "accent-light": "#F5A033",
          bg:        "#FBF8F4",
          muted:     "#5A6278",
        },
      },

      // ─── TYPOGRAPHY ─────────────────────────────────────────────────────
      fontFamily: {
        // Display: slogan, titulares editoriales, pull-quotes
        display: ["Lora", "Georgia", "serif"],
        // UI: párrafos, botones, navegación, email
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        // Datos: precios, m², fechas, datos técnicos
        mono:    ["'Courier New'", "Courier", "monospace"],
      },

      fontSize: {
        // Escala tipográfica ACM
        "display-2xl": ["clamp(3rem, 6vw, 5rem)",     { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.375rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-sm":  ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg":     ["1.125rem", { lineHeight: "1.75" }],
        "body-md":     ["1rem",     { lineHeight: "1.7"  }],
        "body-sm":     ["0.875rem", { lineHeight: "1.6"  }],
        "caption":     ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.04em" }],
        "overline":    ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },

      fontWeight: {
        light:      "300",
        regular:    "400",
        medium:     "500",
        semibold:   "600",
        bold:       "700",
        extrabold:  "800",
      },

      // ─── SPACING ────────────────────────────────────────────────────────
      // Escala de 4px base con valores clave para secciones web
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "17":   "4.25rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
        "section-sm":   "4rem",      // 64px
        "section-md":   "6rem",      // 96px
        "section-lg":   "8rem",      // 128px
        "section-xl":   "10rem",     // 160px
        "section-2xl":  "12rem",     // 192px
      },

      // ─── BREAKPOINTS ────────────────────────────────────────────────────
      screens: {
        "xs":   "390px",
        "sm":   "640px",
        "md":   "768px",
        "lg":   "1024px",
        "xl":   "1280px",
        "2xl":  "1440px",
        "3xl":  "1920px",
      },

      // ─── MAX WIDTH ──────────────────────────────────────────────────────
      maxWidth: {
        "content-sm":  "640px",
        "content-md":  "768px",
        "content-lg":  "1024px",
        "content-xl":  "1280px",
        "content-2xl": "1440px",
        "prose-narrow": "52ch",
        "prose":        "65ch",
        "prose-wide":   "75ch",
      },

      // ─── BORDER RADIUS ──────────────────────────────────────────────────
      borderRadius: {
        "none":   "0",
        "xs":     "2px",
        "sm":     "4px",
        "md":     "8px",
        "lg":     "12px",
        "xl":     "16px",
        "2xl":    "24px",
        "3xl":    "32px",
        "pill":   "9999px",
      },

      // ─── SHADOWS ────────────────────────────────────────────────────────
      boxShadow: {
        // Elevaciones sutiles para tarjetas de propiedades
        "card-sm":  "0 1px 3px rgba(15,32,68,0.06), 0 1px 2px rgba(15,32,68,0.04)",
        "card-md":  "0 4px 16px rgba(15,32,68,0.08), 0 2px 4px rgba(15,32,68,0.04)",
        "card-lg":  "0 8px 32px rgba(15,32,68,0.10), 0 4px 8px rgba(15,32,68,0.06)",
        "card-xl":  "0 16px 48px rgba(15,32,68,0.12), 0 8px 16px rgba(15,32,68,0.08)",
        "orange-glow": "0 0 0 3px rgba(232,130,12,0.2)",
        "navy-glow":   "0 0 0 3px rgba(15,32,68,0.15)",
        "inner-sm": "inset 0 1px 3px rgba(15,32,68,0.08)",
      },

      // ─── TRANSITIONS ────────────────────────────────────────────────────
      transitionDuration: {
        "150":  "150ms",
        "200":  "200ms",
        "300":  "300ms",
        "400":  "400ms",
        "500":  "500ms",
        "700":  "700ms",
        "1000": "1000ms",
      },

      transitionTimingFunction: {
        "ease-spring":   "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "ease-smooth":   "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-in-expo":  "cubic-bezier(0.7, 0, 0.84, 0)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      // ─── ANIMATIONS ─────────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-32px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(32px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232,130,12,0)" },
          "50%":       { boxShadow: "0 0 0 8px rgba(232,130,12,0.15)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-8px)" },
        },
      },

      animation: {
        "fade-in":       "fade-in 0.5s ease-out forwards",
        "fade-in-up":    "fade-in-up 0.6s ease-out forwards",
        "fade-in-down":  "fade-in-down 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right":"slide-in-right 0.6s ease-out forwards",
        "scale-in":      "scale-in 0.4s ease-out forwards",
        "shimmer":       "shimmer 2s infinite linear",
        "pulse-orange":  "pulse-orange 2s ease-in-out infinite",
        "float":         "float 4s ease-in-out infinite",
      },

      // ─── ASPECT RATIOS ──────────────────────────────────────────────────
      aspectRatio: {
        "property":    "4 / 3",
        "hero":        "16 / 9",
        "hero-tall":   "4 / 3",
        "square":      "1 / 1",
        "portrait":    "3 / 4",
      },

      // ─── Z-INDEX ────────────────────────────────────────────────────────
      zIndex: {
        "below":   "-1",
        "base":    "0",
        "raised":  "10",
        "dropdown": "100",
        "sticky":  "200",
        "overlay": "300",
        "modal":   "400",
        "toast":   "500",
        "tooltip": "600",
      },

      // ─── GRID ───────────────────────────────────────────────────────────
      gridTemplateColumns: {
        "property-grid": "repeat(auto-fill, minmax(300px, 1fr))",
        "team-grid":     "repeat(auto-fill, minmax(240px, 1fr))",
        "feature-grid":  "repeat(auto-fill, minmax(280px, 1fr))",
      },

      // ─── BACKGROUND IMAGE ───────────────────────────────────────────────
      backgroundImage: {
        // Gradiente sutil para hero sections sobre fondos navy
        "gradient-navy":   "linear-gradient(135deg, #0F2044 0%, #1A3366 100%)",
        "gradient-navy-to-transparent": "linear-gradient(180deg, #0F2044 0%, transparent 100%)",
        "gradient-orange": "linear-gradient(135deg, #E8820C 0%, #F5A033 100%)",
        "gradient-cream":  "linear-gradient(180deg, #FBF8F4 0%, #F0EBE3 100%)",
        // Overlay para fotos (regla del manual: nunca logo sobre foto sin overlay)
        "overlay-navy":    "linear-gradient(180deg, rgba(15,32,68,0.0) 0%, rgba(15,32,68,0.75) 100%)",
        "overlay-navy-heavy": "linear-gradient(180deg, rgba(15,32,68,0.3) 0%, rgba(15,32,68,0.85) 100%)",
        // Shimmer para skeletons
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
