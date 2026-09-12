import { BlogCategory, BLOG_CATEGORY_COLOR, BLOG_CATEGORY_LABEL } from "@/types/blog";
import { TS, LS } from "@/lib/design-tokens";

export default function CategoryTag({ category, dark = false }: { category: BlogCategory; dark?: boolean }) {
  const color = BLOG_CATEGORY_COLOR[category];
  return (
    <span
      className="inline-flex items-center font-sans font-bold uppercase rounded-full"
      style={{
        fontSize:      TS.caption,
        letterSpacing: LS.label,
        padding:       "0.3rem 0.75rem",
        color:         dark ? "#FBF8F4" : color,
        background:    dark ? "rgba(251,248,244,0.14)" : `${color}14`,
      }}
    >
      {BLOG_CATEGORY_LABEL[category]}
    </span>
  );
}
