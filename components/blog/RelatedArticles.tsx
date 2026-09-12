import Image from "next/image";
import Link from "next/link";
import { BlogPostMeta } from "@/types/blog";
import { TS, LH, LS } from "@/lib/design-tokens";
import CategoryTag from "./CategoryTag";

interface RelatedItem {
  title: string;
  slug?: string;
  post?: BlogPostMeta;
}

export default function RelatedArticles({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="my-14 pt-12 border-t border-graphite/12">
      <p className="font-display italic text-navy-deep mb-7" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display }}>
        También puede interesarte
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(({ title, slug, post }) =>
          post ? (
            <Link key={title} href={`/blog/${post.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-lg mb-3" style={{ aspectRatio: "16/10" }}>
                <Image src={post.coverImage} alt={post.coverImageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="mb-2"><CategoryTag category={post.category} /></div>
              <p className="font-sans font-semibold text-navy-deep group-hover:text-orange-acm transition-colors" style={{ fontSize: TS.bodySm, lineHeight: LH.tight }}>
                {post.title}
              </p>
            </Link>
          ) : (
            <div key={title} className="opacity-60">
              <div className="rounded-lg mb-3 flex items-center justify-center border border-dashed border-graphite/25" style={{ aspectRatio: "16/10", background: "rgba(90,98,120,0.04)" }}>
                <span className="font-sans font-semibold uppercase text-graphite/50" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
                  Próximamente
                </span>
              </div>
              <p className="font-sans font-semibold text-graphite/70" style={{ fontSize: TS.bodySm, lineHeight: LH.tight }}>
                {title}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
