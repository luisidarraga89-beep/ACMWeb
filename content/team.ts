import { TeamMember } from "@/types/team";

export const team: TeamMember[] = [
  {
    _id:     "christian",
    name:    "Christian Ureta",
    initial: "C",
    role:    "CEO & Cofundador",
    quote:   "La confianza no se promete. Se demuestra en cada decisión.",
    bio:     "Christian fundó ACM con una idea muy clara: que comprar una vivienda o invertir en finca raíz debería ser un proceso transparente, bien acompañado y sin incertidumbre innecesaria. Conoce el mercado inmobiliario de Bogotá y la Sabana desde la experiencia práctica y entiende que detrás de cada operación hay un proyecto de vida o una decisión patrimonial importante. Su prioridad nunca ha sido cerrar una venta, sino ayudar a cada cliente a tomar una buena decisión, con honestidad, criterio y acompañamiento de principio a fin.",
    image:   "/images/team/christian-ureta.webp",
    email:   "christian@acminhogares.com",
    order:   1,
  },
  {
    _id:     "juan-pablo",
    name:    "Juan Pablo Londoño",
    initial: "J",
    role:    "Asesor Inmobiliario",
    quote:   "Escuchar primero es la mejor forma de encontrar la propiedad correcta.",
    bio:     "Juan Pablo acompaña a cada cliente desde la primera conversación hasta la entrega de las llaves. Cree que una buena asesoría comienza entendiendo las necesidades de cada persona antes de hablar de propiedades. Su cercanía, paciencia y conocimiento del mercado permiten que cada búsqueda sea más clara, organizada y enfocada en encontrar la opción adecuada, haciendo que el proceso se viva con tranquilidad y confianza.",
    image:   "/images/team/juan-pablo-londono.webp",
    order:   2,
  },
];

export function getAllTeamMembers(): TeamMember[] {
  return team.sort((a, b) => a.order - b.order);
}
