import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug, resolveRelated } from "@/content/blog/posts";
import { BLOG_BODY_REGISTRY } from "@/content/blog/body";
import { buildMetadata } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/blog-schema";
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";
import { TS, LH, LS } from "@/lib/design-tokens";
import CategoryTag from "@/components/blog/CategoryTag";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import ShareBar from "@/components/blog/ShareBar";
import AuthorBox from "@/components/blog/AuthorBox";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title:       post.seoTitle,
    description: post.metaDescription,
    path:        `/blog/${post.slug}`,
    type:        "article",
    publishedAt: post.publishedAt,
    author:      post.author.name,
  });
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const Body = BLOG_BODY_REGISTRY[post.slug];
  const related = resolveRelated(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Blog",   href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbSchema([
              { label: "Inicio", href: "/" },
              { label: "Blog",   href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ])
          ),
        }}
      />

      {/* Breadcrumb bar */}
      <div className="bg-cream border-b border-graphite/8" style={{ paddingBlock: "1rem" }}>
        <div className="container-narrow">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Header */}
      <section className="bg-cream" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <div className="container-narrow">
          <Reveal>
            <div className="mb-4"><CategoryTag category={post.category} /></div>
            <h1 className="font-display italic text-navy-deep mb-4" style={{ fontSize: TS.displayXl, letterSpacing: LS.display, lineHeight: LH.display }}>
              {post.title}
            </h1>
            <p className="font-sans text-graphite mb-6" style={{ fontSize: TS.bodyLg, lineHeight: LH.body, maxWidth: "62ch" }}>
              {post.dek}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-graphite/60" style={{ fontSize: TS.bodySm }}>
              <span>{post.author.name}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min de lectura</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cover image */}
      <div className="container-acm mb-2">
        <Reveal delay={0.05}>
          <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "21/9" }}>
            <Image src={post.coverImage} alt={post.coverImageAlt} fill priority className="object-cover" sizes="100vw" />
          </div>
        </Reveal>
      </div>

      {/* Share bar */}
      <div className="container-narrow flex justify-end" style={{ paddingBlock: "1.25rem" }}>
        <ShareBar url={url} title={post.title} />
      </div>

      {/* Body */}
      <article className="bg-cream" style={{ paddingBottom: "2rem" }}>
        <div className="container-narrow">
          <Reveal>
            {Body && <Body />}
          </Reveal>

          <AuthorBox author={post.author} />
          <RelatedArticles items={related} />

          <div className="pt-4">
            <Link href="/blog" className="inline-flex items-center gap-2 font-sans font-medium text-graphite hover:text-navy-deep transition-colors" style={{ fontSize: TS.bodySm }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Volver al blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
