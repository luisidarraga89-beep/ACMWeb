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

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "RealEstateAgent",
    name:       siteConfig.name,
    description: "Asesoría inmobiliaria honesta en Bogotá y todo Cundinamarca.",
    url:        siteConfig.url,
    logo:       `${siteConfig.url}/images/acm-logo.svg`,
    image:      `${siteConfig.url}/images/acm-logo.svg`,
    telephone:  siteConfig.contact.phone,
    email:      siteConfig.contact.email,
    address: {
      "@type":          "PostalAddress",
      streetAddress:    siteConfig.contact.address,
      addressLocality:  "Bogotá",
      addressCountry:   "CO",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ],
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
