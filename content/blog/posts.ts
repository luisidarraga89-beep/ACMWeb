import { BlogPostMeta } from "@/types/blog";
import { whatsappUrl } from "@/lib/config";
import { christian } from "./authors";

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug:            "credito-hipotecario-colombia",
    category:        "comprar",
    title:           "5 cosas que debes revisar antes de solicitar un crédito hipotecario en Colombia",
    seoTitle:        "Crédito hipotecario en Colombia: 5 cosas que revisar",
    metaDescription: "Antes de pedir un crédito hipotecario en Colombia revisa estos 5 puntos: cuota inicial, cuota mensual, gastos y condiciones reales. Guía práctica de ACM.",
    excerpt:         "Una aprobación de crédito no significa que estés listo para comprar cualquier vivienda. Revisa estos 5 puntos antes de solicitar el tuyo.",
    dek:             "Antes de preguntarte cuánto te presta el banco, hay una pregunta más importante: cuánto puedes comprar sin comprometer tu estabilidad financiera.",
    readingTime:     6,
    publishedAt:     "2026-09-10",
    coverImage:      "/images/blog/credito-hipotecario-colombia.svg",
    coverImageAlt:   "Ilustración editorial sobre crédito hipotecario y compra de vivienda en Colombia",
    featured:        true,
    author:          christian,
    cta: {
      heading:     "¿Ya sabes cuánto puedes comprar?",
      body:        "En ACM podemos ayudarte a encontrar propiedades que encajen con tu presupuesto y acompañarte durante el proceso.",
      buttonLabel: "Hablar con un asesor",
      buttonHref:  "/contacto",
    },
    related: [
      { title: "¿Cuánto dinero necesitas realmente para comprar una vivienda?" },
      { title: "¿Comprar vivienda nueva o usada?" },
      { title: "¿Qué gastos debes considerar al comprar una vivienda?" },
    ],
  },
  {
    slug:            "como-saber-si-una-propiedad-es-buena-inversion",
    category:        "invertir",
    title:           "¿Cómo saber si una propiedad es una buena inversión? 7 factores que debes analizar",
    seoTitle:        "¿Es una buena inversión? 7 factores a analizar",
    metaDescription: "Comprar barato no siempre es invertir bien. Analiza precio, rentabilidad, ubicación, liquidez y diversificación antes de invertir en finca raíz.",
    excerpt:         "Una propiedad barata no siempre es una buena inversión. Estos son los 7 factores que realmente determinan si una oportunidad tiene sentido.",
    dek:             "Precio, rentabilidad, ubicación, valorización y liquidez: los factores que separan una buena oportunidad de una compra impulsiva.",
    readingTime:     7,
    publishedAt:     "2026-09-03",
    coverImage:      "/images/blog/como-saber-si-una-propiedad-es-buena-inversion.svg",
    coverImageAlt:   "Ilustración editorial sobre análisis de inversión inmobiliaria",
    author:          christian,
    cta: {
      heading:     "¿Estás buscando una propiedad para invertir?",
      body:        "Analizamos oportunidades teniendo en cuenta tus objetivos, presupuesto y estrategia patrimonial.",
      buttonLabel: "Explorar inversiones",
      buttonHref:  "/inversiones",
    },
    related: [
      { title: "¿Cómo calcular la rentabilidad de un apartamento en alquiler?" },
      { title: "¿Comprar para vivir o comprar para invertir?" },
      { title: "¿Cómo diversificar un patrimonio inmobiliario?" },
    ],
  },
  {
    slug:            "como-saber-cuanto-vale-mi-vivienda",
    category:        "vender",
    title:           "¿Cómo saber cuánto vale mi vivienda? 7 factores que influyen en el precio",
    seoTitle:        "¿Cuánto vale mi vivienda? 7 factores que influyen",
    metaDescription: "Un precio mal calculado puede alargar tu venta o hacerte perder valor. Conoce los 7 factores que determinan el precio real de tu vivienda.",
    excerpt:         "Ponerle precio a una vivienda no es lo mismo que valorarla correctamente. Estos son los 7 factores que debes analizar antes de publicarla.",
    dek:             "Un precio demasiado alto aleja compradores. Uno demasiado bajo te hace perder patrimonio. Así se construye el precio correcto.",
    readingTime:     5,
    publishedAt:     "2026-08-27",
    coverImage:      "/images/blog/como-saber-cuanto-vale-mi-vivienda.svg",
    coverImageAlt:   "Ilustración editorial sobre cómo valorar una vivienda para la venta",
    author:          christian,
    cta: {
      heading:     "¿Quieres saber cómo plantear la venta de tu propiedad?",
      body:        "Cuéntanos qué tienes y estudiamos contigo cómo plantear la venta.",
      buttonLabel: "Quiero vender mi propiedad",
      buttonHref:  whatsappUrl("Hola, quiero vender mi propiedad y me gustaría recibir asesoría."),
    },
    related: [
      { title: "¿Cuánto cuesta vender una vivienda?" },
      { title: "7 errores que pueden hacer que tardes más en vender tu propiedad" },
    ],
  },
  {
    slug:            "gestionar-alquiler-propiedad",
    category:        "alquilar",
    title:           "¿Deberías gestionar tú mismo el alquiler de tu propiedad? 7 cosas que debes considerar",
    seoTitle:        "Gestionar el alquiler de tu propiedad: 7 claves",
    metaDescription: "Alquilar una propiedad no termina con encontrar inquilino. Descubre qué implica la gestión y cuándo conviene delegarla a un equipo profesional.",
    excerpt:         "Buscar inquilino es solo el comienzo. Estas son las 7 cosas que debes considerar antes de decidir si gestionas tú mismo tu propiedad.",
    dek:             "Contratos, pagos, incidencias y mantenimiento: todo lo que implica alquilar una propiedad, y cómo decidir si conviene delegarlo.",
    readingTime:     6,
    publishedAt:     "2026-08-20",
    coverImage:      "/images/blog/gestionar-alquiler-propiedad.svg",
    coverImageAlt:   "Ilustración editorial sobre gestión profesional de alquiler de propiedades",
    author:          christian,
    cta: {
      heading:     "¿Prefieres que un equipo profesional gestione tu propiedad?",
      body:        "Hablemos sobre ella y estudiemos cómo podemos ayudarte.",
      buttonLabel: "Quiero gestionar mi propiedad",
      buttonHref:  whatsappUrl("Hola, tengo una propiedad y me gustaría conocer más sobre la gestión profesional de alquiler."),
    },
    related: [
      { title: "¿Cómo calcular la rentabilidad de una propiedad?" },
      { title: "¿Cuánto cobrar por el alquiler de una vivienda?" },
      { title: "¿Qué incluye la gestión profesional de un inmueble?" },
    ],
  },
];

export function getAllBlogPosts(): BlogPostMeta[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedBlogPost(): BlogPostMeta {
  return BLOG_POSTS.find(p => p.featured) ?? getAllBlogPosts()[0];
}

export function getBlogPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

/** Resolves each related title against the real registry — fills in the slug once that article exists. */
export function resolveRelated(post: BlogPostMeta): { title: string; slug?: string; post?: BlogPostMeta }[] {
  return post.related.map(({ title, slug }) => {
    const resolvedSlug = slug ?? BLOG_POSTS.find(p => p.title === title)?.slug;
    return { title, slug: resolvedSlug, post: resolvedSlug ? getBlogPostBySlug(resolvedSlug) : undefined };
  });
}
