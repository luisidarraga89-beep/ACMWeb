/**
 * components/ui/TextLink.tsx
 * Expanding-line text link — used for "Conocer el equipo →" style CTAs.
 * Two themes: dark (on cream/white) and light (on navy).
 */

import Link from "next/link";
import { TS } from "@/lib/design-tokens";

interface TextLinkProps {
  href:      string;
  children:  React.ReactNode;
  light?:    boolean;
  external?: boolean;
  className?: string;
}

export default function TextLink({ href, children, light = false, external = false, className }: TextLinkProps) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-4 font-sans font-medium transition-colors duration-300",
        light ? "text-cream/65 hover:text-cream" : "text-navy-deep hover:text-navy-mid",
        className ?? "",
      ].join(" ")}
      style={{ fontSize: TS.bodySm }}
      {...linkProps}
    >
      <span>{children}</span>
      <span
        className={[
          "block h-px transition-all duration-500 group-hover:w-12",
          light ? "w-8 bg-cream/28 group-hover:bg-cream/52" : "w-8 bg-navy-deep/20 group-hover:bg-navy-mid/45",
        ].join(" ")}
        aria-hidden="true"
      />
    </Link>
  );
}
