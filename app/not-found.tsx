import Link from "next/link";
import { TS, LH, LS, SP } from "@/lib/design-tokens";

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="bg-navy-deep relative overflow-hidden flex items-center" style={{ paddingBlock: "clamp(6rem, 14vw, 10rem)", minHeight: "70vh" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-narrow relative text-center">
          <p className="font-sans text-orange-acm mb-4" style={{ fontSize: TS.caption, letterSpacing: LS.label, textTransform: "uppercase" }}>
            Error 404
          </p>
          <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody }}>
            Esta página no existe.
          </h1>
          <p className="font-sans text-cream/60 mx-auto" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "40ch", marginBottom: SP.bodyToCta }}>
            Puede que el enlace esté roto o que la página se haya movido. Volvamos a un lugar conocido.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary">Ir al inicio</Link>
            <Link href="/propiedades" className="btn-ghost">Ver propiedades</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
