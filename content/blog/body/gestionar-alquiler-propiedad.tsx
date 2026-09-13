import Link from "next/link";
import { H2, H3, Lead, P, UL, PullQuote, DataTable } from "@/components/ui/Prose";
import ArticleCTA from "@/components/blog/ArticleCTA";
import { getBlogPostBySlug } from "@/content/blog/posts";

export default function GestionarAlquilerPropiedad() {
  const post = getBlogPostBySlug("gestionar-alquiler-propiedad")!;

  return (
    <>
      <Lead>
        Tener una propiedad en alquiler puede convertirse en una fuente de ingresos y formar parte de una estrategia para construir patrimonio.
      </Lead>
      <P>Pero también implica tiempo, seguimiento y responsabilidades.</P>
      <P>
        Buscar un inquilino es solo el comienzo. Después vienen los contratos, pagos, incidencias, mantenimiento, renovaciones y comunicación con el arrendatario.
      </P>
      <P>
        Por eso, antes de decidir si quieres gestionar tu propiedad personalmente o delegar la gestión, conviene entender todo lo que implica.
      </P>

      <H2>1. Conseguir un buen inquilino</H2>
      <P>
        El objetivo no debería ser encontrar rápidamente a cualquier persona que quiera alquilar. Debe ser encontrar un inquilino que cumpla con los requisitos adecuados y pueda asumir correctamente sus obligaciones.
      </P>
      <P>
        Esto implica revisar documentación, perfil y capacidad de pago de acuerdo con los criterios aplicables. Una mala selección puede generar problemas que van mucho más allá de un mes de alquiler.
      </P>

      <H2>2. Gestionar el contrato</H2>
      <P>Un contrato de arrendamiento establece derechos y obligaciones para ambas partes. Además de formalizarlo correctamente, hay que realizar seguimiento durante toda la relación:</P>
      <UL items={[
        "Renovaciones.",
        "Cambios.",
        "Comunicaciones.",
        "Terminación.",
        "Entrega del inmueble.",
      ]} />
      <P>La gestión documental también forma parte de administrar correctamente una propiedad.</P>

      <H2>3. Hacer seguimiento de los pagos</H2>
      <P>El alquiler no termina cuando el inquilino recibe las llaves. Hay que hacer seguimiento de los pagos y actuar rápidamente ante cualquier incidencia.</P>
      <P>
        Para un propietario que tiene varias propiedades, vive en otra ciudad o simplemente no quiere ocuparse del día a día, esta gestión puede consumir bastante tiempo.
      </P>

      <H2>4. Resolver incidencias</H2>
      <UL items={[
        "Una llave que no funciona.",
        "Una fuga de agua.",
        "Un electrodoméstico que deja de funcionar.",
        "Una reparación inesperada.",
      ]} />
      <P>Son situaciones normales en cualquier propiedad. La diferencia está en quién se encarga de resolverlas.</P>
      <P>
        Una gestión profesional puede centralizar la comunicación, coordinar proveedores y hacer seguimiento hasta que la incidencia quede solucionada.
      </P>

      <H2>5. Mantener la propiedad</H2>
      <P>
        Una propiedad alquilada sigue siendo un activo del propietario. Su mantenimiento puede afectar tanto a la experiencia del inquilino como a su conservación y, a largo plazo, a su valor. Por eso conviene llevar un seguimiento de:
      </P>
      <UL items={[
        "Mantenimiento preventivo.",
        "Reparaciones.",
        "Estado general.",
        "Incidencias recurrentes.",
        "Necesidades de actualización.",
      ]} />

      <H2>6. Conocer los números reales</H2>
      <P>El canon mensual no es lo mismo que la rentabilidad que genera una propiedad. Hay que considerar:</P>
      <PullQuote>Ingresos − gastos − vacancias − mantenimiento − otros costes = resultado real de la operación.</PullQuote>
      <P>
        Esto es especialmente importante para los propietarios que están{" "}
        <Link href="/blog/como-saber-si-una-propiedad-es-buena-inversion" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">
          construyendo un patrimonio inmobiliario
        </Link>
        . Una propiedad puede parecer muy rentable al mirar únicamente el alquiler mensual y ofrecer un resultado muy diferente cuando se incorporan todos sus costes.
      </P>

      <H2>7. Tu tiempo también tiene un valor</H2>
      <P>Esta es una de las preguntas que muchas veces se olvidan:</P>
      <PullQuote>¿Cuánto vale tu tiempo?</PullQuote>
      <P>
        Si tienes una única propiedad y disfrutas gestionándola, hacerlo personalmente puede tener sentido. Pero si tienes varias propiedades, vives lejos, tienes poco tiempo o simplemente no quieres convertirte en administrador de tus propios inmuebles, delegar puede ser una alternativa interesante.
      </P>

      <H2>¿Qué puede hacer una inmobiliaria por ti?</H2>
      <P>Una gestión profesional puede incluir diferentes servicios:</P>
      <DataTable
        headers={["Servicio", "Qué incluye"]}
        rows={[
          ["Comercialización", "Publicación, consultas, visitas y presentación de la propiedad."],
          ["Selección", "Evaluación del perfil del potencial inquilino."],
          ["Contratación", "Acompañamiento en la formalización del arrendamiento."],
          ["Pagos", "Seguimiento de cánones y comunicación."],
          ["Incidencias", "Coordinación y seguimiento de reparaciones."],
          ["Mantenimiento", "Seguimiento del estado de la propiedad."],
          ["Relación con el inquilino", "Un canal profesional para resolver las cuestiones del día a día."],
        ]}
      />

      <H2>Tu propiedad sigue siendo tuya. La gestión puede ser nuestra.</H2>
      <P>En ACM entendemos que invertir en vivienda no debería significar necesariamente asumir un segundo trabajo.</P>
      <P>
        Por eso podemos acompañarte no solo en la adquisición de una propiedad, sino también{" "}
        <Link href="/inversiones" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">
          después de la compra
        </Link>
        .
      </P>
      <H3>Encuentra la propiedad. Analízala. Cómprala. Alquílala. Gestiona. Haz crecer tu patrimonio.</H3>
      <P>Ese es el ciclo que queremos construir junto a nuestros clientes.</P>

      <ArticleCTA cta={post.cta} />
    </>
  );
}
