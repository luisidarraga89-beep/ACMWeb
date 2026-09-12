import Link from "next/link";
import { TS } from "@/lib/design-tokens";

export interface Crumb { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-sans text-graphite/60" style={{ fontSize: TS.caption }}>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-navy-deep transition-colors">{item.label}</Link>
            ) : (
              <span className="text-navy-deep/80" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
