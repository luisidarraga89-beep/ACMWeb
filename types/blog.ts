/**
 * types/blog.ts
 */

export interface BlogAuthor {
  _id:    string;
  name:   string;
  role:   string;
  image?: string;
  bio?:   string;
}

export interface BlogCategory {
  _id:   string;
  title: string;
  slug:  string;
}

export interface BlogPost {
  _id:        string;
  slug:       string;
  title:      string;
  excerpt:    string;
  body:       string;          // MDX (pre-CMS) or Portable Text (Sanity)
  author:     BlogAuthor;
  category:   BlogCategory;
  tags:       string[];
  image?:     string;
  imageAlt?:  string;

  // SEO
  metaTitle?:       string;
  metaDescription?: string;

  // Computed
  readingMinutes:  number;
  featured:        boolean;

  // Timestamps
  publishedAt: string;
  updatedAt:   string;
}
