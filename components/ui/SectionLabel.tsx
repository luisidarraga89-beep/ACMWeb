/**
 * components/ui/SectionLabel.tsx
 * Orange overline label — used above every section headline.
 * Frozen design: caption size, 0.13em tracking, orange-acm color.
 */

import { TS, LS } from "@/lib/design-tokens";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={`font-sans font-semibold text-orange-acm uppercase ${className ?? ""}`}
      style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.125rem" }}
    >
      {children}
    </p>
  );
}
