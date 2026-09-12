import Link from "next/link";
import { H2, H3, Lead, P, UL, PullQuote, IllustrativeExample, Checklist, ChecklistItem } from "@/components/blog/BlogProse";
import ArticleCTA from "@/components/blog/ArticleCTA";
import { getBlogPostBySlug } from "@/content/blog/posts";

export default function ComoSaberSiUnaPropiedadEsBuenaInversion() {
  const post = getBlogPostBySlug("como-saber-si-una-propiedad-es-buena-inversion")!;

  return (
    <>
      <Lead>
        Comprar una propiedad porque “está barata” no necesariamente significa que estés haciendo una buena inversión.
      </Lead>
      <P>Una inversión inmobiliaria debe analizarse más allá del precio de compra.</P>
      <PullQuote>¿Cuánto puede generar? ¿Qué gastos tendrá? ¿Qué posibilidades tiene de valorizarse? ¿Qué tan fácil será alquilarla o venderla?</PullQuote>
      <P>Antes de tomar una decisión, estos son siete factores que deberías analizar.</P>

      <H2>1. El precio de compra</H2>
      <P>
        El precio es el punto de partida, pero no debería ser el único criterio. Una propiedad puede parecer económica frente a otras de la zona y seguir siendo una mala inversión si tiene problemas de ubicación, demanda, estado, liquidez o gastos.
      </P>
      <P>Por eso es importante comparar propiedades similares y analizar el precio por metro cuadrado cuando sea relevante.</P>
      <PullQuote>La pregunta no es “¿Es barata?”. La pregunta es “¿Está bien comprada?”</PullQuote>

      <H2>2. El potencial de alquiler</H2>
      <P>Si tu objetivo es generar ingresos, debes estudiar cuánto podría producir realmente la propiedad. Analiza:</P>
      <UL items={[
        "Canon de alquiler esperado.",
        "Demanda de la zona.",
        "Tipo de inquilino.",
        "Tiempo estimado para conseguir arrendatario.",
        "Propiedades comparables.",
        "Gastos asociados al alquiler.",
      ]} />
      <P>No confundas el canon mensual con la rentabilidad.</P>
      <IllustrativeExample>
        Un apartamento que se alquila por $2 millones mensuales genera $24 millones brutos al año, pero todavía hay que considerar los costes asociados a mantener y gestionar el inmueble antes de saber cuánto queda realmente.
      </IllustrativeExample>

      <H2>3. Rentabilidad bruta y rentabilidad neta</H2>
      <P>Esta diferencia es fundamental.</P>

      <H3>Rentabilidad bruta</H3>
      <P>La rentabilidad bruta permite tener una primera referencia entre los ingresos anuales y el precio de adquisición.</P>

      <H3>Rentabilidad neta</H3>
      <P>Pero para entender mejor una inversión hay que considerar también los gastos. Entre ellos pueden existir:</P>
      <UL items={[
        "Administración.",
        "Mantenimiento.",
        "Reparaciones.",
        "Periodos sin inquilino.",
        "Seguros.",
        "Impuestos y obligaciones aplicables.",
        "Gestión del inmueble.",
        "Otros gastos de operación.",
      ]} />
      <P>
        Por eso, una propiedad con una rentabilidad bruta atractiva puede ofrecer una rentabilidad neta mucho menor.
      </P>
      <PullQuote>Los números importantes son los que quedan después de considerar los costes.</PullQuote>

      <H2>4. La ubicación</H2>
      <P>En inmobiliario, la ubicación sigue siendo una de las variables fundamentales. Pero no basta con decir que una zona es “buena”. Hay que preguntarse:</P>
      <UL items={[
        "¿Quién quiere vivir allí?",
        "¿Existe demanda de alquiler?",
        "¿Qué servicios hay alrededor?",
        "¿Cómo es la movilidad?",
        "¿Qué oferta compite con el inmueble?",
        "¿Qué proyectos o transformaciones pueden afectar al sector?",
        "¿Cómo se comporta el mercado local?",
      ]} />
      <P>La ubicación debe analizarse en función del tipo de inversión que estás buscando.</P>

      <H2>5. La valorización potencial</H2>
      <P>
        Una inversión inmobiliaria puede generar valor mediante el alquiler, mediante una eventual valorización del inmueble o mediante una combinación de ambos. Pero la valorización futura no está garantizada. Por eso conviene analizar qué factores podrían favorecerla:
      </P>
      <UL items={[
        "Desarrollo del sector.",
        "Infraestructura.",
        "Demanda.",
        "Oferta disponible.",
        "Características del inmueble.",
        "Evolución histórica del mercado, sin asumir que se repetirá.",
      ]} />
      <P>Una buena inversión no debería depender exclusivamente de que el inmueble suba de precio.</P>

      <H2>6. La liquidez</H2>
      <P>Imagina que dentro de unos años necesitas vender. ¿Habrá compradores interesados?</P>
      <P>
        Una propiedad puede ser rentable sobre el papel y, sin embargo, resultar difícil de vender rápidamente. Por eso hay que analizar la liquidez y el perfil de demanda del inmueble.
      </P>
      <P>Invertir también significa pensar en cómo puedes salir de la inversión.</P>

      <H2>7. Cómo encaja dentro de tu patrimonio</H2>
      <P>
        Esta es una de las preguntas que más se olvidan. Una propiedad no debe analizarse únicamente de forma aislada. Si ya tienes varios apartamentos en la misma ciudad y del mismo tipo, comprar otro exactamente igual puede aumentar tu exposición a un mismo mercado.
      </P>
      <P>Diversificar puede implicar estudiar:</P>
      <UL items={[
        "Diferentes ubicaciones.",
        "Diferentes tipos de vivienda.",
        "Diferentes niveles de renta.",
        "Diferentes objetivos.",
        "Diferentes horizontes de inversión.",
      ]} />
      <P>
        No se trata de tener más propiedades. Se trata de construir{" "}
        <Link href="/inversiones" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">
          una estrategia que tenga sentido para ti
        </Link>
        .
      </P>

      <ArticleCTA cta={post.cta} />

      <H2>Entonces, ¿qué hace que una propiedad sea una buena inversión?</H2>
      <P>
        No existe una única respuesta. Una buena oportunidad depende del objetivo del inversor, su capital, su horizonte, su necesidad de liquidez y su tolerancia al riesgo.
      </P>
      <P>Por eso, en ACM no creemos que la pregunta correcta sea:</P>
      <PullQuote>“¿Cuál es la propiedad que más rentabilidad tiene?” Sino: “¿Qué propiedad tiene más sentido dentro de mi estrategia?”</PullQuote>

      <H2>Antes de invertir, revisa:</H2>
      <Checklist>
        <ChecklistItem>Precio de compra</ChecklistItem>
        <ChecklistItem>Demanda</ChecklistItem>
        <ChecklistItem>Canon de alquiler</ChecklistItem>
        <ChecklistItem>Gastos</ChecklistItem>
        <ChecklistItem>Rentabilidad neta estimada</ChecklistItem>
        <ChecklistItem>Potencial de valorización</ChecklistItem>
        <ChecklistItem>Liquidez</ChecklistItem>
        <ChecklistItem>Riesgos</ChecklistItem>
        <ChecklistItem>Encaje dentro de mi patrimonio</ChecklistItem>
      </Checklist>

      <PullQuote>
        Una buena oportunidad inmobiliaria no siempre es la que tiene el precio más bajo. Es la que tiene sentido en números, ubicación y futuro.
      </PullQuote>

      <div className="mt-10 pt-8 border-t border-graphite/12">
        <p className="font-display italic text-navy-deep mb-4" style={{ fontSize: "1.375rem" }}>¿Estás pensando en invertir en inmobiliario?</p>
        <P>En ACM podemos ayudarte a analizar oportunidades y construir una estrategia de inversión acorde con tus objetivos.</P>
        <Link href="/contacto" className="btn-primary inline-flex">Hablar con un asesor</Link>
      </div>
    </>
  );
}
