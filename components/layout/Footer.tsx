import Link from "next/link";
import ACMLogo from "@/components/icons/ACMLogo";
import { siteConfig } from "@/lib/config";

const FOOTER_SERVICES = [
  { label: "Comprar vivienda",        href: "/propiedades" },
  { label: "Invertir en Colombia",    href: "/inversiones" },
  { label: "Crédito hipotecario",     href: "/propiedades#credito" },
  { label: "Clientes en el exterior", href: "/inversiones#internacional" },
  { label: "Arrendamientos",          href: "/propiedades#arrendamientos", badge: "Próximamente" },
];

const FOOTER_COMPANY = [
  { label: "Nosotros",    href: "/nosotros" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Inversiones", href: "/inversiones" },
  { label: "Blog",        href: "/blog" },
  { label: "Contacto",    href: "/contacto" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href:  siteConfig.social.instagram,
    icon:  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: "Facebook",
    href:  siteConfig.social.facebook,
    icon:  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    label: "WhatsApp",
    href:  siteConfig.social.whatsapp,
    icon:  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    label: "LinkedIn",
    href:  siteConfig.social.linkedin,
    icon:  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-navy-deep" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pie de página — ACM Hogares e Inversiones</h2>

      <div className="container-acm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-16 pb-12 border-b border-white/8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 focus-visible:outline-orange-acm rounded" aria-label="ACM Hogares e Inversiones">
              {/* WHITE variant — logo sobre fondo navy */}
              <ACMLogo variant="isotipo" theme="color" className="w-9 h-9" />
            </Link>
            <p className="font-display italic text-sm text-cream/65 leading-relaxed mb-1 max-w-[22ch]">
              "Certeza en cada metro cuadrado."
            </p>
            <p className="font-sans text-[0.6875rem] font-semibold text-orange-acm uppercase tracking-[0.13em] mb-6">
              Bogotá · Cundinamarca · Sabana
            </p>
            <div className="flex items-center gap-2" role="list" aria-label="Redes sociales">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" role="listitem" aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-white/6 border border-white/8 text-cream/50 hover:text-cream hover:bg-white/10 transition-all duration-200 focus-visible:outline-orange-acm">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-cream/40 mb-4">Servicios</h3>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map(({ label, href, badge }) => (
                <li key={href}>
                  <Link href={href} className="group flex items-center gap-2 font-sans text-sm text-cream/65 hover:text-white transition-colors duration-200 focus-visible:outline-orange-acm rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-acm shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {label}
                    {badge && <span className="font-sans text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-orange-acm/10 text-orange-acm/80">{badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-cream/40 mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              {FOOTER_COMPANY.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-sm text-cream/65 hover:text-white transition-colors duration-200 focus-visible:outline-orange-acm rounded">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-cream/40 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-acm shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.17 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                <a href={`tel:${siteConfig.contact.phone}`} className="font-sans text-sm text-cream/65 hover:text-white transition-colors duration-200">{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-acm shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href={`mailto:${siteConfig.contact.email}`} className="font-sans text-sm text-cream/65 hover:text-white transition-colors duration-200 break-all">{siteConfig.contact.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-acm shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="font-sans text-sm text-cream/65">{siteConfig.contact.city}</span>
              </li>
            </ul>
            <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 font-sans text-sm font-semibold text-orange-acm hover:text-orange-light transition-colors duration-200 focus-visible:outline-orange-acm rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="font-sans text-xs text-cream/30 text-center sm:text-left">
            © {CURRENT_YEAR} <span className="text-orange-acm/60">ACM</span> Hogares e Inversiones · Bogotá, Colombia
          </p>
          <nav aria-label="Navegación legal" className="flex items-center gap-5">
            <Link href="/privacidad" className="font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200 focus-visible:outline-orange-acm rounded">Política de privacidad</Link>
            <Link href="/terminos" className="font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200 focus-visible:outline-orange-acm rounded">Términos de uso</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
