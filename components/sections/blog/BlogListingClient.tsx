"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogPostMeta, BlogCategory, BLOG_CATEGORY_LABEL } from "@/types/blog";
import { TS, LH, LS, SP } from "@/lib/design-tokens";
import { formatDate } from "@/lib/utils";
import CategoryTag from "@/components/blog/CategoryTag";
import Reveal from "@/components/ui/Reveal";

type FilterKey = "todos" | BlogCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "todos",    label: "Todos" },
  { key: "comprar",  label: BLOG_CATEGORY_LABEL.comprar },
  { key: "invertir", label: BLOG_CATEGORY_LABEL.invertir },
  { key: "vender",   label: BLOG_CATEGORY_LABEL.vender },
  { key: "alquilar", label: BLOG_CATEGORY_LABEL.alquilar },
];

function ReadCta() {
  return (
    <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-orange-acm" style={{ fontSize: TS.bodySm }}>
      Leer artículo
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-graphite/10 rounded-lg overflow-hidden mb-10 md:mb-14">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-7 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <CategoryTag category={post.category} />
          <span className="font-sans font-bold uppercase text-orange-acm" style={{ fontSize: TS.caption, letterSpacing: LS.label }}>
            Destacado
          </span>
        </div>
        <h2 className="font-display italic text-navy-deep mb-3" style={{ fontSize: TS.displayMd, letterSpacing: LS.display, lineHeight: LH.display }}>
          {post.title}
        </h2>
        <p className="font-sans text-graphite mb-6" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 mb-6 font-sans text-graphite/55" style={{ fontSize: TS.caption, letterSpacing: LS.data }}>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>
        <ReadCta />
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-white border border-graphite/10 rounded-lg overflow-hidden h-full">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3"><CategoryTag category={post.category} /></div>
        <h3 className="font-display italic text-navy-deep mb-2.5" style={{ fontSize: "1.1875rem", letterSpacing: LS.display, lineHeight: LH.display }}>
          {post.title}
        </h3>
        <p className="font-sans text-graphite mb-5" style={{ fontSize: TS.bodySm, lineHeight: LH.body, flex: 1 }}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-sans text-graphite/50" style={{ fontSize: TS.caption, letterSpacing: LS.data }}>{post.readingTime} min de lectura</span>
          <ReadCta />
        </div>
      </div>
    </Link>
  );
}

export default function BlogListingClient({ posts, featured }: { posts: BlogPostMeta[]; featured: BlogPostMeta }) {
  const [filter, setFilter] = useState<FilterKey>("todos");

  const filtered = useMemo(() => {
    const rest = posts.filter((p) => p.slug !== featured.slug);
    if (filter === "todos") return rest;
    return posts.filter((p) => p.category === filter);
  }, [posts, featured, filter]);

  const showFeatured = filter === "todos";
  const gridPosts    = showFeatured ? filtered : filtered.filter((p) => p.slug !== featured.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep relative overflow-hidden" style={{ paddingBlock: "clamp(7rem, 14vw, 12rem)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "38px 38px" }} aria-hidden="true" />
        <div className="container-acm relative">
          <Reveal>
            <p className="font-sans font-semibold text-orange-acm uppercase" style={{ fontSize: TS.caption, letterSpacing: LS.label, marginBottom: "1.25rem" }}>Blog ACM</p>
            <div className="w-10 h-[3px] bg-orange-acm rounded-full mb-8" aria-hidden="true" />
            <h1 className="font-display italic text-cream" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display, marginBottom: SP.headlineToBody, maxWidth: "26ch" }}>
              Decisiones inmobiliarias, explicadas de forma sencilla.
            </h1>
            <p className="font-sans text-cream/55" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "56ch" }}>
              Comprar, vender, invertir o alquilar una propiedad son decisiones importantes. En ACM compartimos conocimiento práctico para ayudarte a entender mejor tus opciones y tomar decisiones con mayor claridad.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-cream" style={{ paddingBlock: SP.section }}>
        <div className="container-acm">
          <Reveal className="flex flex-wrap gap-2.5 mb-10 md:mb-14">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className="font-sans font-semibold rounded-full transition-all duration-200"
                style={{
                  fontSize: TS.bodySm,
                  padding: "0.6rem 1.25rem",
                  border: filter === key ? "1.5px solid #E8820C" : "1.5px solid rgba(15,32,68,0.15)",
                  background: filter === key ? "rgba(232,130,12,0.08)" : "#fff",
                  color: filter === key ? "#E8820C" : "rgba(15,32,68,0.65)",
                }}
              >
                {label}
              </button>
            ))}
          </Reveal>

          {showFeatured && (
            <Reveal delay={0.05}>
              <FeaturedCard post={featured} />
            </Reveal>
          )}

          {gridPosts.length > 0 ? (
            <Reveal delay={0.08}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {gridPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.08}>
              <div className="text-center py-16 border border-dashed border-graphite/20 rounded-lg">
                <p className="font-display italic text-navy-deep mb-3" style={{ fontSize: TS.displayMd }}>
                  Muy pronto tendremos artículos en esta categoría.
                </p>
                <p className="font-sans text-graphite" style={{ fontSize: TS.bodySm }}>
                  Mientras tanto, explora los demás temas del blog.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
