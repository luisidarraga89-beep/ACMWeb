import Link from "next/link";
import { BlogCTA } from "@/types/blog";
import { TS, LH, LS } from "@/lib/design-tokens";

export default function ArticleCTA({ cta }: { cta: BlogCTA }) {
  const isExternal = cta.buttonHref.startsWith("http");
  return (
    <div
      className="my-10 rounded-lg p-7 md:p-9"
      style={{ background: "#0F2044" }}
    >
      <p className="font-display italic text-cream mb-2.5" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display, maxWidth: "26ch" }}>
        {cta.heading}
      </p>
      <p className="font-sans text-cream/65 mb-6" style={{ fontSize: TS.bodySm, lineHeight: LH.body, maxWidth: "48ch" }}>
        {cta.body}
      </p>
      {isExternal ? (
        <a href={cta.buttonHref} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ fontSize: TS.bodySm }}>
          {cta.buttonLabel}
        </a>
      ) : (
        <Link href={cta.buttonHref} className="btn-primary inline-flex" style={{ fontSize: TS.bodySm }}>
          {cta.buttonLabel}
        </Link>
      )}
    </div>
  );
}
