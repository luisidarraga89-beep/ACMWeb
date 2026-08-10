import { cn } from "@/lib/utils";

type LogoVariant = "full" | "isotipo" | "wordmark";
type LogoTheme   = "color" | "white";

interface ACMLogoProps {
  variant?:  LogoVariant;
  theme?:    LogoTheme;
  className?: string;
  title?:    string;
}

/**
 * ACMLogo — uses the original SVG files directly as <img> tags.
 * This preserves the exact colors from the brand files:
 * · Isotipo: navy buildings + orange house (original gradient)
 * · Wordmark: ACM blue gradient + tagline + orange "e"
 * · Full: complete logo with all elements
 *
 * theme="white" is only used when explicitly needed on dark backgrounds
 * where the original colors don't have enough contrast.
 * For navbar and footer on navy: use theme="color" — the logo reads well.
 */
export default function ACMLogo({
  variant   = "full",
  theme     = "color",
  className,
  title     = "ACM Hogares e Inversiones",
}: ACMLogoProps) {

  if (variant === "isotipo") {
    return (
      <img
        src="/images/acm-isotipo.svg"
        alt={title}
        className={cn("w-10 h-10", className)}
        style={{ filter: theme === "white" ? "brightness(0) invert(1)" : "none" }}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <img
        src="/images/acm-wordmark.svg"
        alt={title}
        className={cn("h-8 w-auto", className)}
        style={{ filter: theme === "white" ? "brightness(0) invert(1)" : "none" }}
      />
    );
  }

  return (
    <img
      src="/images/acm-logo.svg"
      alt={title}
      className={cn("w-40 h-auto", className)}
      style={{ filter: theme === "white" ? "brightness(0) invert(1)" : "none" }}
    />
  );
}
