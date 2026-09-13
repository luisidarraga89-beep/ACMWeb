import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getAllProperties } from "@/content/properties";
import { getAllBlogPosts } from "@/content/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${url}/`,            lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${url}/nosotros`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/propiedades`, lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${url}/inversiones`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/blog`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${url}/contacto`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${url}/privacidad`,  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${url}/terminos`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = getAllProperties().map((p) => ({
    url:            `${url}/propiedades/${p.slug}`,
    lastModified:   new Date(p.updatedAt || p.publishedAt || now),
    changeFrequency: "weekly",
    priority:       0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((p) => ({
    url:            `${url}/blog/${p.slug}`,
    lastModified:   new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority:       0.65,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
