import { BlogPostMeta } from "@/types/blog";
import { siteConfig } from "./config";

export function buildArticleSchema(post: BlogPostMeta) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type":    "Article",
    headline:   post.title,
    description: post.metaDescription,
    image:      [`${siteConfig.url}${post.coverImage}`],
    datePublished: post.publishedAt,
    dateModified:  post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name:    post.author.name,
      jobTitle: post.author.role,
      url:     `${siteConfig.url}${post.author.href}`,
    },
    publisher: {
      "@type": "Organization",
      name:    siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url:     `${siteConfig.url}/images/acm-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":   url,
    },
  };
}

export function buildBreadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      item.label,
      item:      `${siteConfig.url}${item.href}`,
    })),
  };
}
