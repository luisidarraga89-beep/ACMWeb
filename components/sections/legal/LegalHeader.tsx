import { TS, LH, LS, SP } from "@/lib/design-tokens";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";

export default function LegalHeader({
  title, dek, updatedAt,
}: {
  title: string;
  dek: string;
  updatedAt: string;
}) {
  return (
    <>
      <div className="bg-cream border-b border-graphite/8" style={{ paddingBlock: "1rem" }}>
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: title }]} />
        </div>
      </div>
      <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(5rem, 10vw, 7rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-narrow relative">
          <Reveal>
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "26ch" }}>
              {title}
            </h1>
            <p className="font-sans text-cream/60 mb-4" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "56ch" }}>
              {dek}
            </p>
            <p className="font-sans text-cream/40" style={{ fontSize: TS.caption, letterSpacing: LS.label, textTransform: "uppercase" }}>
              Última actualización: {updatedAt}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
