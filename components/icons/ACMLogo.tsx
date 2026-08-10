import { cn } from "@/lib/utils";

type LogoVariant = "full" | "isotipo" | "wordmark";

interface ACMLogoProps {
  variant?:  LogoVariant;
  theme?:    "color" | "white";
  className?: string;
  title?:    string;
}

export default function ACMLogo({
  variant   = "full",
  theme     = "color",
  className,
  title     = "ACM Hogares e Inversiones",
}: ACMLogoProps) {
  const whiteFilter = theme === "white" ? "brightness(0) invert(1)" : "none";

  if (variant === "isotipo") {
    return (
      <img
        src="/images/acm-isotipo.svg"
        alt={title}
        className={cn("w-10 h-10", className)}
        style={{ filter: whiteFilter }}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <img
        src="/images/acm-wordmark.svg"
        alt={title}
        className={cn("h-8 w-auto", className)}
        style={{ filter: whiteFilter }}
      />
    );
  }

  return (
    <img
      src="/images/acm-logo.svg"
      alt={title}
      className={cn("w-40 h-auto", className)}
      style={{ filter: whiteFilter }}
    />
  );
}
