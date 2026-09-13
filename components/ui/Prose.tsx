/**
 * components/ui/Prose.tsx
 * Shared long-form editorial primitives — used by blog articles and legal
 * pages (Política de privacidad, Términos de uso) so every reading-heavy
 * page shares the same typography instead of duplicating it per file.
 */
import { TS, LH, LS, SP } from "@/lib/design-tokens";

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-display italic text-navy-deep scroll-mt-28"
      style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display, marginTop: "3rem", marginBottom: "1.25rem" }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-sans font-bold text-navy-deep"
      style={{ fontSize: TS.bodyLg, marginTop: "2rem", marginBottom: "0.875rem" }}
    >
      {children}
    </h3>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-navy-deep/80 font-medium" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: "1.5rem" }}>
      {children}
    </p>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, marginBottom: SP.betweenBodyP }}>
      {children}
    </p>
  );
}

export function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-6 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-3 font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
          <span className="w-[5px] h-[5px] rounded-full bg-orange-acm shrink-0 mt-[0.55em]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function OL({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mb-6 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-3 font-sans text-graphite" style={{ fontSize: TS.bodyLg, lineHeight: LH.body }}>
          <span className="font-mono font-semibold text-orange-acm shrink-0" style={{ fontSize: TS.bodySm }}>{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 font-sans text-navy-deep" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
      <span className="text-orange-acm font-bold shrink-0" aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}

export function Checklist({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5 mb-6">{children}</ul>;
}

/** Bordered informational box — used for definitions, key takeaways, "what a service includes", etc. */
export function InfoBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-graphite/12 rounded-lg p-6 md:p-7 my-8">
      {title && (
        <p className="font-sans font-bold text-navy-deep mb-3" style={{ fontSize: TS.bodySm, letterSpacing: LS.label, textTransform: "uppercase" }}>
          {title}
        </p>
      )}
      <div className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
        {children}
      </div>
    </div>
  );
}

/**
 * "Ejemplo ilustrativo" callout — mirrors the disclaimer pattern already
 * established on the Inversiones page: orange left border, explicit label
 * that the numbers are illustrative, never a guaranteed outcome.
 */
export function IllustrativeExample({ label = "Ejemplo ilustrativo", children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-orange-acm pl-5 my-8">
      <p className="font-sans font-semibold text-navy-deep uppercase mb-1.5" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
        {label} — no representa un resultado garantizado
      </p>
      <div className="font-sans text-graphite" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
        {children}
      </div>
    </div>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-9 pl-6 border-l-2 border-navy-deep/15">
      <p className="font-display italic text-navy-deep" style={{ fontSize: TS.quote, letterSpacing: LS.display, lineHeight: LH.tight }}>
        {children}
      </p>
    </blockquote>
  );
}

export function Divider() {
  return <div className="w-10 h-[3px] bg-orange-acm rounded-full my-10" aria-hidden="true" />;
}

export function DataTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto my-8 rounded-lg border border-graphite/12">
      <table className="w-full border-collapse font-sans" style={{ fontSize: TS.bodySm }}>
        <thead>
          <tr className="bg-navy-deep">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-cream/90" style={{ fontSize: TS.caption, letterSpacing: LS.label, textTransform: "uppercase" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-graphite border-t border-graphite/8" style={{ fontFamily: j > 0 ? "var(--font-mono)" : undefined }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
