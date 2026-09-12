import Image from "next/image";
import Link from "next/link";
import { BlogAuthor } from "@/types/blog";
import { TS, LH, LS } from "@/lib/design-tokens";

export default function AuthorBox({ author }: { author: BlogAuthor }) {
  return (
    <div className="flex items-start gap-4 md:gap-5 bg-white border border-graphite/12 rounded-lg p-6 md:p-7 my-10">
      <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: 64, height: 64 }}>
        <Image src={author.avatar} alt={author.name} fill className="object-cover object-top" sizes="64px" />
      </div>
      <div>
        <p className="font-sans font-bold text-navy-deep" style={{ fontSize: TS.bodyLg }}>{author.name}</p>
        <p className="font-sans font-semibold text-orange-acm mb-2.5" style={{ fontSize: TS.caption, letterSpacing: LS.label, textTransform: "uppercase" }}>
          {author.role}
        </p>
        <p className="font-sans text-graphite mb-3" style={{ fontSize: TS.bodySm, lineHeight: LH.body }}>{author.bio}</p>
        <Link href={author.href} className="font-sans font-semibold text-navy-deep underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm transition-colors" style={{ fontSize: TS.bodySm }}>
          Conoce al equipo ACM →
        </Link>
      </div>
    </div>
  );
}
