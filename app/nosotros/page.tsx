import type { Metadata } from "next";
import NosotrosClient from "@/components/sections/nosotros/NosotrosClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:       "Nosotros — El equipo detrás de ACM",
  description: "Las personas detrás de ACM Hogares e Inversiones. Conoce a Christian Ureta y Juan Pablo Londoño.",
  path:        "/nosotros",
});

export default function NosotrosPage() {
  return <NosotrosClient />;
}