/**
 * app/(marketing)/layout.tsx
 *
 * Route group layout for all public-facing marketing pages.
 * Wraps every page with Navbar + main + Footer + WhatsAppFAB.
 * No page needs to import or render these manually.
 *
 * Route group `(marketing)` does not appear in URLs.
 * All routes inside: /, /nosotros, /propiedades, /inversiones, etc.
 */

import Navbar      from "@/components/layout/Navbar";
import Footer      from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFAB delaySeconds={8} />
    </>
  );
}
