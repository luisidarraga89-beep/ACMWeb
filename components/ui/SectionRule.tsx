/**
 * components/ui/SectionRule.tsx
 * 3px orange brand bar — appears below Label, above h2.
 * Frozen design: 2.5rem wide, 3px tall, rounded, orange-acm.
 */

interface SectionRuleProps {
  className?: string;
}

export default function SectionRule({ className }: SectionRuleProps) {
  return (
    <div
      className={`w-10 h-[3px] bg-orange-acm rounded-full ${className ?? ""}`}
      style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}
      aria-hidden="true"
    />
  );
}
