/**
 * components/ui/PropertyStatusRibbon.tsx
 * Large diagonal ribbon for "vendido" / "reservado" properties.
 * Parent element must have `overflow-hidden` so the corners clip cleanly.
 */

interface PropertyStatusRibbonProps {
  status: "vendido" | "reservado";
  size?: "md" | "lg";
}

const SIZES = {
  md: { top: "1.75rem", left: "-3.5rem", width: "14rem", padding: "0.45rem 0", fontSize: "0.8125rem" },
  lg: { top: "2.75rem", left: "-5rem",   width: "20rem", padding: "0.7rem 0",  fontSize: "1.125rem" },
} as const;

export default function PropertyStatusRibbon({ status, size = "md" }: PropertyStatusRibbonProps) {
  const isVendido = status === "vendido";
  const s = SIZES[size];
  return (
    <div
      className="absolute pointer-events-none select-none text-center font-sans"
      style={{
        top: s.top,
        left: s.left,
        width: s.width,
        transform: "rotate(-45deg)",
        background: isVendido ? "#B42318" : "#B45309",
        color: "#FBF8F4",
        padding: s.padding,
        fontWeight: 800,
        letterSpacing: "0.12em",
        fontSize: s.fontSize,
        textTransform: "uppercase",
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        zIndex: 20,
      }}
    >
      {isVendido ? "Vendido" : "Reservado"}
    </div>
  );
}
