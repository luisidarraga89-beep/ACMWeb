import Link from "next/link";
import { H2, Lead, P, UL, PullQuote, Checklist, ChecklistItem } from "@/components/blog/BlogProse";
import ArticleCTA from "@/components/blog/ArticleCTA";
import { getBlogPostBySlug } from "@/content/blog/posts";

export default function CreditoHipotecarioColombia() {
  const post = getBlogPostBySlug("credito-hipotecario-colombia")!;

  return (
    <>
      <Lead>
        Solicitar un crédito hipotecario es uno de los pasos más importantes cuando estás pensando en comprar vivienda. Pero antes de preguntarte cuánto te puede prestar un banco, hay una pregunta más importante.
      </Lead>

      <PullQuote>¿Cuánto puedes comprar realmente sin comprometer innecesariamente tu estabilidad financiera?</PullQuote>

      <P>
        Una aprobación de crédito no significa automáticamente que estés preparado para comprar cualquier vivienda. El crédito es solo una parte de la operación.
      </P>
      <P>Antes de empezar a buscar apartamentos o casas, revisa estos cinco puntos.</P>

      <H2>1. Cuánto dinero tienes disponible para la cuota inicial</H2>
      <P>
        El primer error suele ser pensar únicamente en cuánto dinero puede financiar el banco. Pero una parte del valor de la vivienda normalmente debe salir de tus propios recursos.
      </P>
      <P>
        Por eso, antes de empezar a visitar propiedades, calcula cuánto dinero tienes realmente disponible para la cuota inicial y cuánto necesitas conservar como fondo de seguridad. No es recomendable destinar todos tus ahorros a la compra y quedarte sin margen para afrontar imprevistos.
      </P>
      <PullQuote>
        La pregunta no debería ser únicamente “¿Cuánto me presta el banco?”, sino “¿Cuánto dinero puedo aportar sin comprometer mi estabilidad financiera?”
      </PullQuote>

      <H2>2. Cuánto será realmente tu cuota mensual</H2>
      <P>
        Una vivienda puede estar dentro del presupuesto de compra y, aun así, generar una cuota mensual demasiado exigente. Para analizar una operación debes considerar no solo la cuota del crédito, sino también otros gastos asociados a tener una vivienda:
      </P>
      <UL items={[
        "Administración, si aplica.",
        "Seguros relacionados con la financiación.",
        "Impuestos y obligaciones del inmueble.",
        "Mantenimiento.",
        "Servicios.",
        "Otros gastos recurrentes.",
      ]} />
      <P>
        Por eso, no conviene calcular tu capacidad únicamente mirando el precio de la vivienda. Hay que mirar el coste mensual de mantenerla.
      </P>

      <H2>3. Cuánto dinero necesitas además del precio de la vivienda</H2>
      <P>
        Una vivienda anunciada por $300 millones no significa necesariamente que necesites disponer únicamente de esos $300 millones entre crédito y ahorro. Una compraventa puede implicar diferentes gastos relacionados con la operación, como escrituración, registro, avalúos, estudios, seguros y otros conceptos dependiendo del inmueble, la financiación y las condiciones de la operación.
      </P>
      <P>
        Algunos costes corresponden al comprador, otros al vendedor y otros pueden variar según las características de la operación. Por eso es importante conocer el presupuesto completo antes de comprometerte.
      </P>

      <H2>4. Qué condiciones tiene realmente tu crédito</H2>
      <P>
        Una aprobación hipotecaria no es simplemente una cifra. Hay que conocer las condiciones específicas de la financiación:
      </P>
      <UL items={[
        "Monto aprobado.",
        "Plazo.",
        "Tasa y modalidad aplicable.",
        "Tipo de financiación.",
        "Cuota estimada.",
        "Seguros.",
        "Condiciones de desembolso.",
        "Requisitos pendientes.",
      ]} />
      <P>Y algo especialmente importante:</P>
      <PullQuote>
        Una aprobación de crédito no significa necesariamente que cualquier propiedad pueda financiarse bajo esas mismas condiciones.
      </PullQuote>
      <P>
        La entidad financiera puede realizar procesos adicionales sobre el inmueble y exigir que se cumplan determinados requisitos antes del desembolso.
      </P>

      <H2>5. Qué vivienda puedes comprar de manera responsable</H2>
      <P>Este debería ser el punto de partida de todo el proceso. En lugar de comenzar preguntándote “¿Qué apartamento me gusta?”, empieza por “¿Qué vivienda puedo comprar de forma responsable?”</P>
      <P>
        Una vez tengas claro tu presupuesto real, podrás buscar{" "}
        <Link href="/propiedades" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">
          propiedades que encajen con tu situación
        </Link>
        . Esto también evita uno de los errores más habituales: enamorarse de una vivienda antes de saber si la operación tiene sentido financieramente.
      </P>

      <ArticleCTA cta={post.cta} />

      <H2>El crédito hipotecario es una herramienta, no el presupuesto completo</H2>
      <P>
        Comprar vivienda no consiste simplemente en conseguir financiación. La operación completa debe tener sentido desde varios puntos de vista:
      </P>
      <PullQuote>Precio + cuota inicial + financiación + gastos + capacidad de pago + características del inmueble.</PullQuote>
      <P>Si una de estas piezas no encaja, la operación puede convertirse en una carga innecesaria.</P>

      <H2>Antes de pedir tu crédito, hazte estas preguntas</H2>
      <Checklist>
        <ChecklistItem>¿Cuánto dinero tengo realmente disponible?</ChecklistItem>
        <ChecklistItem>¿Cuánto quiero conservar como fondo de emergencia?</ChecklistItem>
        <ChecklistItem>¿Qué cuota mensual puedo asumir?</ChecklistItem>
        <ChecklistItem>¿Cuánto necesitaré además de la cuota inicial?</ChecklistItem>
        <ChecklistItem>¿Qué tipo de vivienda encaja con mi presupuesto?</ChecklistItem>
        <ChecklistItem>¿Las condiciones del crédito son adecuadas para mí?</ChecklistItem>
      </Checklist>

      <H2>En ACM creemos que una buena compra empieza antes de encontrar la vivienda</H2>
      <P>
        Nuestro trabajo no es simplemente enseñarte propiedades. Es ayudarte a entender qué operación puede tener sentido para ti y acompañarte durante el proceso de compra.
      </P>
      <P>Porque una buena decisión inmobiliaria no empieza con las llaves. Empieza con los números.</P>

      <div className="mt-10 pt-8 border-t border-graphite/12">
        <p className="font-display italic text-navy-deep mb-4" style={{ fontSize: "1.375rem" }}>¿Estás pensando en comprar vivienda?</p>
        <P>Habla con ACM y cuéntanos qué estás buscando.</P>
        <Link href="/contacto" className="btn-primary inline-flex">Hablar con un asesor</Link>
      </div>
    </>
  );
}
