import type { Metadata } from "next";
import { getAllBlogPosts, getFeaturedBlogPost } from "@/content/blog/posts";
import { buildMetadata } from "@/lib/seo";
import BlogListingClient from "@/components/sections/blog/BlogListingClient";

export const metadata: Metadata = buildMetadata({
  title:       "Blog",
  description: "Conocimiento práctico sobre comprar, invertir, vender y alquilar vivienda en Bogotá y Cundinamarca, explicado de forma sencilla por el equipo de ACM.",
  path:        "/blog",
});

export default function BlogPage({ searchParams }: { searchParams: { categoria?: string } }) {
  const posts    = getAllBlogPosts();
  const featured = getFeaturedBlogPost();

  return <BlogListingClient posts={posts} featured={featured} initialCategory={searchParams.categoria} />;
}
