"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getAllProperties } from "@/content/properties";
import { TS, LH, LS, SP, EASE } from "@/lib/design-tokens";
import { whatsappUrl } from "@/lib/config";
import { Property, PropertyType } from "@/types/property";
import PropertyStatusRibbon from "@/components/ui/PropertyStatusRibbon";

const TYPE_LABEL: Record<PropertyType, string> = {
  apartamento: "Apartamento", casa: "Casa", penthouse: "Penthouse",
  duplex: "Dúplex", lote: "Lote", oficina: "Oficina", local: "Local",
};

const MIN_OPTIONS = [0, 1, 2, 3, 4] as const;

type SortKey = "recientes" | "precio-asc" | "precio-desc" | "area-desc";

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

function PropertyCard({ property, large = false }: { property: Property; large?: boolean }) {
  const primaryImage = property.images.find(i => i.isPrimary) ?? property.images[0];
  const unavailable = property.status === "vendido" || property.status === "reservado";
  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block relative overflow-hidden bg-graphite/5"
      style={{ aspectRatio: large ? "3/4" : "4/3" }}
      aria-label={`${property.title} — ${property.neighborhood}`}
    >
      {primaryImage && (
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover object-center transition-transform ease-out group-hover:scale-[1.026]"
          style={{ transitionDuration: "1400ms", filter: unavailable ? "grayscale(0.5) brightness(0.85)" : undefined }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(6,10,22,0.82) 0%, rgba(6,10,22,0.15) 50%, transparent 70%)" }} aria-hidden="true" />

      {unavailable && <PropertyStatusRibbon status={property.status as "vendido" | "reservado"} />}

      {(property.status === "venta" || property.status === "arriendo") && (
        <span className="absolute font-sans font-semibold uppercase backdrop-blur-sm" style={{ top: "1rem", right: "1rem", fontSize: TS.caption, letterSpacing: LS.label, background: "rgba(15,32,68,0.6)", color: "rgba(251,248,244,0.85)", padding: "0.3rem 0.625rem", borderRadius: "2px" }}>
          {property.status === "venta" ? "Venta" : "Arriendo"}
        </span>
      )}

      {property.isNew && (
        <span className="absolute font-sans font-bold uppercase" style={{ top: "1rem", left: "1rem", fontSize: TS.caption, letterSpacing: LS.label, background: "#E8820C", color: "#FBF8F4", padding: "0.3rem 0.7rem", borderRadius: "2px", boxShadow: "0 2px 8px rgba(232,130,12,0.4)" }}>
          Nuevo
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="font-sans text-cream/55 uppercase mb-1.5" style={{ fontSize: TS.caption, letterSpacing: LS.data }}>{property.neighborhood} · {property.city}</p>
        <h3 className="font-display italic text-cream mb-1.5" style={{ fontSize: "1.125rem", lineHeight: LH.display, letterSpacing: LS.display }}>{property.title}</h3>
        <div className="flex items-center gap-4">
          <span className="font-mono text-cream/50" style={{ fontSize: "0.75rem", letterSpacing: LS.data }}>{property.area}</span>
          {property.priceDisplay && (
            <span className="font-sans font-semibold text-orange-acm" style={{ fontSize: "0.8125rem" }}>{property.priceDisplay}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── FILTER CHIP GROUP ──────────────────────────────────────────────────── */
function ChipGroup({
  label, value, onChange, options,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  options: readonly number[];
}) {
  return (
    <div>
      <p className="font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="font-sans font-medium rounded-full transition-all duration-200"
            style={{
              fontSize: TS.caption,
              padding: "0.45rem 0.9rem",
              border: value === n ? "1.5px solid #E8820C" : "1.5px solid rgba(15,32,68,0.15)",
              background: value === n ? "rgba(232,130,12,0.08)" : "#fff",
              color: value === n ? "#E8820C" : "rgba(15,32,68,0.65)",
            }}
          >
            {n === 0 ? "Cualquiera" : `${n}+`}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── FILTERS PANEL ──────────────────────────────────────────────────────── */
function PropertyFilters({
  properties, filters, setFilters, resultCount,
}: {
  properties: Property[];
  filters: ReturnType<typeof useFilterState>[0];
  setFilters: ReturnType<typeof useFilterState>[1];
  resultCount: number;
}) {
  const cities = useMemo(() => Array.from(new Set(properties.map(p => p.city))).sort(), [properties]);
  const types  = useMemo(() => Array.from(new Set(properties.map(p => p.type))).sort(), [properties]);

  const set = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) =>
    setFilters(f => ({ ...f, [key]: value }));

  const isDefault =
    !filters.q && filters.city === "todas" && filters.type === "todos" && filters.operation === "todas" &&
    filters.minBeds === 0 && filters.minBaths === 0 && filters.minParking === 0 &&
    !filters.priceMin && !filters.priceMax && !filters.areaMin && !filters.areaMax &&
    !filters.hideUnavailable && filters.sortBy === "recientes";

  return (
    <div className="bg-white border border-graphite/10 rounded-lg p-6 md:p-8 mb-10">
      {/* Search + operation */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 mb-6">
        <div>
          <label htmlFor="pf-q" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Buscar</label>
          <input
            id="pf-q"
            type="text"
            placeholder="Nombre, barrio o ciudad…"
            className="input-acm"
            value={filters.q}
            onChange={(e) => set("q", e.target.value)}
          />
        </div>
        <div>
          <p className="font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Operación</p>
          <div className="flex gap-2">
            {(["todas", "venta", "arriendo"] as const).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => set("operation", op)}
                className="font-sans font-medium rounded-full transition-all duration-200 whitespace-nowrap"
                style={{
                  fontSize: TS.caption,
                  padding: "0.6rem 1.1rem",
                  border: filters.operation === op ? "1.5px solid #E8820C" : "1.5px solid rgba(15,32,68,0.15)",
                  background: filters.operation === op ? "rgba(232,130,12,0.08)" : "#fff",
                  color: filters.operation === op ? "#E8820C" : "rgba(15,32,68,0.65)",
                }}
              >
                {op === "todas" ? "Todas" : op === "venta" ? "Venta" : "Arriendo"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* City + type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label htmlFor="pf-city" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Ciudad</label>
          <select id="pf-city" className="input-acm" value={filters.city} onChange={(e) => set("city", e.target.value)}>
            <option value="todas">Todas las ciudades</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pf-type" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Tipo de inmueble</label>
          <select id="pf-type" className="input-acm" value={filters.type} onChange={(e) => set("type", e.target.value)}>
            <option value="todos">Todos los tipos</option>
            {types.map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
          </select>
        </div>
      </div>

      {/* Beds / baths / parking */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <ChipGroup label="Habitaciones" value={filters.minBeds} onChange={(v) => set("minBeds", v)} options={MIN_OPTIONS} />
        <ChipGroup label="Baños" value={filters.minBaths} onChange={(v) => set("minBaths", v)} options={MIN_OPTIONS} />
        <ChipGroup label="Parqueaderos" value={filters.minParking} onChange={(v) => set("minParking", v)} options={MIN_OPTIONS.slice(0, 3)} />
      </div>

      {/* Price + area ranges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <p className="font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Precio (COP)</p>
          <div className="flex items-center gap-2.5">
            <input type="number" min={0} placeholder="Mínimo" className="input-acm" value={filters.priceMin} onChange={(e) => set("priceMin", e.target.value)} />
            <span className="text-graphite/40 shrink-0">—</span>
            <input type="number" min={0} placeholder="Máximo" className="input-acm" value={filters.priceMax} onChange={(e) => set("priceMax", e.target.value)} />
          </div>
        </div>
        <div>
          <p className="font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Área (m²)</p>
          <div className="flex items-center gap-2.5">
            <input type="number" min={0} placeholder="Mínimo" className="input-acm" value={filters.areaMin} onChange={(e) => set("areaMin", e.target.value)} />
            <span className="text-graphite/40 shrink-0">—</span>
            <input type="number" min={0} placeholder="Máximo" className="input-acm" value={filters.areaMax} onChange={(e) => set("areaMax", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Sort + availability + clear */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-6" style={{ borderTop: "1px solid rgba(90,98,120,0.1)" }}>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2.5 font-sans text-navy-deep/75 cursor-pointer" style={{ fontSize: TS.bodySm }}>
            <input type="checkbox" checked={filters.hideUnavailable} onChange={(e) => set("hideUnavailable", e.target.checked)} className="w-4 h-4 accent-orange-acm" />
            Ocultar vendidas y reservadas
          </label>
          <div>
            <label htmlFor="pf-sort" className="block font-sans font-medium text-navy-deep mb-2" style={{ fontSize: TS.bodySm }}>Ordenar por</label>
            <select id="pf-sort" className="input-acm" style={{ maxWidth: "16rem" }} value={filters.sortBy} onChange={(e) => set("sortBy", e.target.value as SortKey)}>
              <option value="recientes">Más recientes</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="area-desc">Área: mayor a menor</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <p className="font-sans text-graphite/60" style={{ fontSize: TS.bodySm }}>
            <span className="font-semibold text-navy-deep">{resultCount}</span> {resultCount === 1 ? "propiedad encontrada" : "propiedades encontradas"}
          </p>
          {!isDefault && (
            <button
              type="button"
              onClick={() => setFilters(defaultFilters())}
              className="font-sans font-medium text-graphite hover:text-navy-deep underline underline-offset-4 transition-colors"
              style={{ fontSize: TS.caption }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── FILTER STATE ───────────────────────────────────────────────────────── */
function defaultFilters() {
  return {
    q: "",
    city: "todas",
    type: "todos",
    operation: "todas" as "todas" | "venta" | "arriendo",
    minBeds: 0,
    minBaths: 0,
    minParking: 0,
    priceMin: "",
    priceMax: "",
    areaMin: "",
    areaMax: "",
    hideUnavailable: false,
    sortBy: "recientes" as SortKey,
  };
}

function useFilterState() {
  return useState(defaultFilters());
}

function parseArea(area: string): number {
  return parseInt(area, 10) || 0;
}

export default function PropiedadesPage() {
  const properties = getAllProperties();
  const [filters, setFilters] = useFilterState();

  // Presets the operation filter from the navbar's "En venta" / "En arriendo" shortcuts.
  useEffect(() => {
    const operacion = new URLSearchParams(window.location.search).get("operacion");
    if (operacion === "venta" || operacion === "arriendo") {
      setFilters((f) => ({ ...f, operation: operacion }));
    }
  }, [setFilters]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();

    let result = properties.filter((p) => {
      if (q) {
        const haystack = `${p.title} ${p.neighborhood} ${p.city}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.city !== "todas" && p.city !== filters.city) return false;
      if (filters.type !== "todos" && p.type !== filters.type) return false;
      if (filters.operation !== "todas" && p.status !== filters.operation) return false;
      if (filters.minBeds > 0 && (p.bedrooms ?? 0) < filters.minBeds) return false;
      if (filters.minBaths > 0 && (p.bathrooms ?? 0) < filters.minBaths) return false;
      if (filters.minParking > 0 && (p.parking ?? 0) < filters.minParking) return false;
      if (filters.priceMin && (p.price ?? 0) < Number(filters.priceMin)) return false;
      if (filters.priceMax && (p.price ?? 0) > Number(filters.priceMax)) return false;
      const area = parseArea(p.area);
      if (filters.areaMin && area < Number(filters.areaMin)) return false;
      if (filters.areaMax && area > Number(filters.areaMax)) return false;
      if (filters.hideUnavailable && (p.status === "vendido" || p.status === "reservado")) return false;
      return true;
    });

    switch (filters.sortBy) {
      case "precio-asc":  result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
      case "precio-desc": result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); break;
      case "area-desc":   result = [...result].sort((a, b) => parseArea(b.area) - parseArea(a.area)); break;
      default: /* recientes — ya viene ordenado por getAllProperties() */ break;
    }

    return result;
  }, [properties, filters]);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Propiedades</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "22ch" }}>
              Cada propiedad, una historia.
            </h1>
            <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "48ch" }}>
              No mostramos propiedades por mostrar. Cada opción que encontrarás aquí ha sido seleccionada por el equipo ACM con criterio y conocimiento del mercado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section id="filtros" className="bg-cream scroll-mt-24" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal>
            <PropertyFilters properties={properties} filters={filters} setFilters={setFilters} resultCount={filtered.length} />
          </Reveal>

          {filtered.length > 0 ? (
            <Reveal delay={0.05}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filtered.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.05}>
              <div className="text-center py-16 border border-dashed border-graphite/20 rounded-lg">
                <p className="font-display italic text-navy-deep mb-3" style={{ fontSize: TS.displayMd }}>
                  No encontramos propiedades con esos filtros.
                </p>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm }}>
                  Prueba ajustando los filtros, o escríbenos y te ayudamos a encontrar la opción correcta.
                </p>
              </div>
            </Reveal>
          )}

          {/* CTA */}
          <Reveal delay={0.1} className="mt-16 md:mt-20">
            <div className="border-t border-graphite/12 pt-16 md:pt-20">
              <p className="font-display italic text-navy-deep mb-6" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "28ch" }}>
                ¿No encontraste lo que buscas? Cuéntanos y lo encontramos.
              </p>
              <a href={whatsappUrl("Hola, estoy buscando una propiedad y me gustaría recibir asesoría")} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex gap-2.5" style={{ fontSize: TS.bodySm, padding: "1rem 1.875rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Hablar con un asesor
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
