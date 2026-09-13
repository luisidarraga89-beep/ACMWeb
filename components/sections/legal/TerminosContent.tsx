import Link from "next/link";
import { SP } from "@/lib/design-tokens";
import { H2, P, UL, InfoBox, Divider } from "@/components/ui/Prose";
import { siteConfig } from "@/lib/config";
import LegalHeader from "./LegalHeader";

export default function TerminosContent() {
  return (
    <>
      <LegalHeader
        title="Términos y Condiciones de Uso"
        dek="Las condiciones que rigen el uso de este sitio web y de la información que en él se publica."
        updatedAt="13 de septiembre de 2026"
      />

      <article className="bg-cream" style={{ paddingBlock: SP.section }}>
        <div className="container-narrow">
          <P>
            Estos términos y condiciones regulan el acceso y uso del sitio web {siteConfig.url}, operado por {siteConfig.name} (en adelante, "ACM"). Al acceder o usar este sitio, aceptas estos términos en su totalidad. Si no estás de acuerdo con ellos, te pedimos abstenerte de usar el sitio.
          </P>

          <InfoBox title="Contenido">
            <nav aria-label="Tabla de contenido">
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-none">
                {[
                  ["aceptacion", "1. Aceptación de los términos"],
                  ["objeto", "2. Objeto del sitio web"],
                  ["informacion-propiedades", "3. Información sobre propiedades"],
                  ["uso-permitido", "4. Uso permitido del sitio"],
                  ["propiedad-intelectual", "5. Propiedad intelectual"],
                  ["enlaces-terceros", "6. Enlaces a sitios de terceros"],
                  ["datos-personales", "7. Protección de datos personales"],
                  ["responsabilidad", "8. Limitación de responsabilidad"],
                  ["modificaciones", "9. Modificaciones"],
                  ["ley-aplicable", "10. Ley aplicable y jurisdicción"],
                  ["contacto", "11. Contacto"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-navy-deep/75 hover:text-orange-acm underline underline-offset-4 decoration-navy-deep/20 hover:decoration-orange-acm transition-colors">{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </InfoBox>

          <H2 id="aceptacion">1. Aceptación de los términos</H2>
          <P>
            El uso de este sitio web implica la aceptación plena de estos términos y condiciones. ACM podrá actualizarlos en cualquier momento; el uso continuado del sitio después de una actualización implica la aceptación de los cambios.
          </P>

          <H2 id="objeto">2. Objeto del sitio web</H2>
          <P>
            Este sitio tiene fines informativos y de contacto sobre los servicios de asesoría inmobiliaria de ACM: compra, venta, arriendo, inversión y gestión de propiedades en Bogotá, Cundinamarca y otras zonas de Colombia. El sitio no constituye una plataforma transaccional ni una oferta mercantil vinculante; toda operación inmobiliaria requiere el acompañamiento directo de un asesor de ACM.
          </P>

          <H2 id="informacion-propiedades">3. Información sobre propiedades</H2>
          <P>
            La información publicada sobre las propiedades (precios, disponibilidad, características, estado de venta o arriendo) tiene carácter referencial y puede cambiar sin previo aviso, incluso si ya fue publicada. Antes de tomar cualquier decisión, te recomendamos confirmar los detalles directamente con un asesor de ACM.
          </P>

          <H2 id="uso-permitido">4. Uso permitido del sitio</H2>
          <P>Al usar este sitio, te comprometes a:</P>
          <UL items={[
            "Utilizarlo conforme a la ley, la moral, el orden público y estos términos.",
            "No utilizarlo con fines fraudulentos, ni para actividades ilícitas o lesivas de los derechos de terceros.",
            "No intentar dañar, inutilizar, sobrecargar o interferir con el funcionamiento normal del sitio.",
          ]} />

          <H2 id="propiedad-intelectual">5. Propiedad intelectual</H2>
          <P>
            Los contenidos de este sitio —textos, imágenes, logotipo, marca y diseño— son propiedad de ACM o de terceros que han autorizado su uso, y están protegidos por las normas de propiedad intelectual vigentes en Colombia. Queda prohibida su reproducción, distribución o uso comercial sin autorización previa y escrita de ACM.
          </P>

          <H2 id="enlaces-terceros">6. Enlaces a sitios de terceros</H2>
          <P>
            Este sitio puede incluir enlaces hacia WhatsApp, redes sociales u otras plataformas de terceros. ACM no controla ni se hace responsable por el contenido, la disponibilidad o las políticas de privacidad de esos sitios externos.
          </P>

          <H2 id="datos-personales">7. Protección de datos personales</H2>
          <P>
            El tratamiento de los datos personales que nos suministres a través del formulario de contacto o de cualquier otro canal se rige por nuestra{" "}
            <Link href="/privacidad" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">Política de Tratamiento de Datos Personales</Link>, elaborada conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.
          </P>

          <H2 id="responsabilidad">8. Limitación de responsabilidad</H2>
          <P>
            ACM hace su mejor esfuerzo por mantener la información del sitio actualizada y el sitio disponible, pero no garantiza la ausencia de errores, interrupciones o fallas técnicas. En la medida permitida por la ley, ACM no será responsable por daños o perjuicios derivados del uso, o de la imposibilidad de uso, de este sitio web.
          </P>

          <H2 id="modificaciones">9. Modificaciones</H2>
          <P>
            ACM podrá modificar estos términos y condiciones en cualquier momento, sin necesidad de aviso previo individual. Los cambios entrarán en vigor desde su publicación en esta página, por lo que te recomendamos revisarla periódicamente.
          </P>

          <H2 id="ley-aplicable">10. Ley aplicable y jurisdicción</H2>
          <P>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada del uso de este sitio se someterá a los jueces y tribunales competentes de Bogotá D.C.
          </P>

          <Divider />

          <H2 id="contacto">11. Contacto</H2>
          <P>
            Si tienes preguntas sobre estos términos y condiciones, escríbenos a{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">{siteConfig.contact.email}</a>{" "}
            o visita nuestra{" "}
            <Link href="/contacto" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">página de contacto</Link>.
          </P>
        </div>
      </article>
    </>
  );
}
