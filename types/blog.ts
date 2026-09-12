export type BlogCategory = "comprar" | "invertir" | "vender" | "alquilar";

export const BLOG_CATEGORY_LABEL: Record<BlogCategory, string> = {
  comprar:  "Comprar",
  invertir: "Invertir",
  vender:   "Vender",
  alquilar: "Alquilar",
};

/** Category → brand accent color, used for tags, ribbons and cover art. */
export const BLOG_CATEGORY_COLOR: Record<BlogCategory, string> = {
  comprar:  "#0453A6", // blue-acm
  invertir: "#E8820C", // orange-acm
  vender:   "#1A3366", // navy-mid
  alquilar: "#A85E08", // deep amber, distinct from orange-acm
};

export interface BlogAuthor {
  name:   string;
  role:   string;
  bio:    string;
  avatar: string;
  href:   string;
}

export interface BlogCTA {
  heading:     string;
  body:        string;
  buttonLabel: string;
  buttonHref:  string;
}

/**
 * A related-article reference. `slug` is only set once that article has
 * actually been written — until then the card renders as "Próximamente"
 * so the structure is ready to receive it later.
 */
export interface RelatedRef {
  title: string;
  slug?: string;
}

export interface BlogPostMeta {
  slug:            string;
  category:        BlogCategory;
  title:           string;   // H1 / display title
  seoTitle:        string;   // <title> — kept under ~60 chars
  metaDescription: string;
  excerpt:         string;   // card excerpt
  dek:             string;   // bajada shown under the H1 on the article page
  readingTime:     number;   // minutes
  publishedAt:     string;   // ISO date
  updatedAt?:      string;   // ISO date
  coverImage:      string;
  coverImageAlt:   string;
  featured?:       boolean;
  author:          BlogAuthor;
  cta:             BlogCTA;
  related:         RelatedRef[];
}
