import Link from "next/link";
import { SP } from "@/lib/design-tokens";
import { H2, P, UL, InfoBox, DataTable, Divider } from "@/components/ui/Prose";
import { siteConfig } from "@/lib/config";
import LegalHeader from "./LegalHeader";

export default function PrivacidadContent() {
  return (
    <>
      <LegalHeader
        title="Política de Tratamiento de Datos Personales"
        dek="Cómo ACM Hogares e Inversiones recolecta, usa y protege tus datos personales, en cumplimiento de la normativa colombiana de protección de datos."
        updatedAt="13 de septiembre de 2026"
      />

      <article className="bg-cream" style={{ paddingBlock: SP.section }}>
        <div className="container-narrow">
          <P>
            {siteConfig.name} (en adelante, "ACM") respeta la privacidad de las personas que visitan este sitio web y que se ponen en contacto con nosotros. Esta política explica qué datos personales recolectamos, para qué los usamos, con quién los compartimos y cuáles son tus derechos como titular de la información.
          </P>

          <InfoBox title="Contenido">
            <nav aria-label="Tabla de contenido">
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-none">
                {[
                  ["responsable", "1. Responsable del tratamiento"],
                  ["normativa", "2. Marco normativo"],
                  ["definiciones", "3. Definiciones"],
                  ["datos-recolectados", "4. Datos que recolectamos"],
                  ["finalidades", "5. Finalidades del tratamiento"],
                  ["derechos", "6. Tus derechos como titular"],
                  ["ejercer-derechos", "7. Cómo ejercer tus derechos"],
                  ["transferencia", "8. Transferencia de datos"],
                  ["cookies", "9. Uso de cookies"],
                  ["seguridad", "10. Seguridad de la información"],
                  ["vigencia", "11. Vigencia"],
                  ["contacto", "12. Contacto"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-navy-deep/75 hover:text-orange-acm underline underline-offset-4 decoration-navy-deep/20 hover:decoration-orange-acm transition-colors">{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </InfoBox>

          <H2 id="responsable">1. Responsable del tratamiento</H2>
          <P>Los datos personales recolectados a través de este sitio web son tratados por:</P>
          <InfoBox>
            <p className="mb-1"><strong className="text-navy-deep">Nombre comercial:</strong> {siteConfig.name}</p>
            <p className="mb-1"><strong className="text-navy-deep">Domicilio:</strong> {siteConfig.contact.address}, Colombia</p>
            <p className="mb-1"><strong className="text-navy-deep">Correo electrónico:</strong> {siteConfig.contact.email}</p>
            <p className="mb-1"><strong className="text-navy-deep">Teléfono:</strong> {siteConfig.contact.phone}</p>
            <p><strong className="text-navy-deep">Sitio web:</strong> {siteConfig.url}</p>
          </InfoBox>

          <H2 id="normativa">2. Marco normativo</H2>
          <P>
            Este tratamiento de datos personales se rige por el artículo 15 de la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013 y las demás normas que los desarrollen, modifiquen o complementen. La autoridad de control en materia de protección de datos personales en Colombia es la Superintendencia de Industria y Comercio (SIC).
          </P>

          <H2 id="definiciones">3. Definiciones</H2>
          <UL items={[
            <><strong className="text-navy-deep">Dato personal:</strong> cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</>,
            <><strong className="text-navy-deep">Titular:</strong> la persona natural cuyos datos personales son objeto de tratamiento.</>,
            <><strong className="text-navy-deep">Tratamiento:</strong> cualquier operación sobre datos personales, como su recolección, almacenamiento, uso, circulación o supresión.</>,
            <><strong className="text-navy-deep">Responsable del tratamiento:</strong> quien decide sobre la base de datos y/o el tratamiento de los datos — en este caso, ACM.</>,
            <><strong className="text-navy-deep">Autorización:</strong> el consentimiento previo, expreso e informado del titular para tratar sus datos personales.</>,
          ]} />

          <H2 id="datos-recolectados">4. Datos que recolectamos</H2>
          <P>
            Recolectamos datos personales cuando nos contactas voluntariamente a través del formulario de contacto, WhatsApp, correo electrónico o llamada telefónica. No recolectamos datos sensibles (como datos de salud, biométricos, o de orientación política, religiosa o sexual) ni datos de menores de edad de forma intencional.
          </P>
          <DataTable
            headers={["Dato", "¿Cuándo lo recolectamos?"]}
            rows={[
              ["Nombre completo", "Al diligenciar el formulario de contacto o escribirnos por WhatsApp/correo"],
              ["Número de teléfono", "Al diligenciar el formulario de contacto o escribirnos por WhatsApp"],
              ["Correo electrónico", "Al diligenciar el formulario de contacto o escribirnos por correo"],
              ["Contenido del mensaje", "Al describirnos qué tipo de propiedad, servicio o asesoría te interesa"],
            ]}
          />

          <H2 id="finalidades">5. Finalidades del tratamiento</H2>
          <P>Usamos tus datos personales para:</P>
          <UL items={[
            "Contactarte y dar respuesta a tus solicitudes de información o asesoría.",
            "Brindarte asesoría inmobiliaria sobre compra, venta, arriendo, inversión y gestión de propiedades.",
            "Compartirte información sobre propiedades o proyectos de inversión que puedan ser de tu interés.",
            "Gestionar la relación comercial contigo, si decides avanzar en un proceso con ACM.",
            "Cumplir obligaciones legales, contractuales o regulatorias aplicables a nuestra actividad.",
            "Fines estadísticos internos, para entender cómo se usa el sitio y mejorar la experiencia.",
          ]} />

          <H2 id="derechos">6. Tus derechos como titular de los datos</H2>
          <P>De acuerdo con el artículo 8 de la Ley 1581 de 2012, como titular de tus datos personales tienes derecho a:</P>
          <UL items={[
            "Conocer, actualizar y rectificar tus datos personales.",
            "Solicitar prueba de la autorización otorgada para el tratamiento de tus datos.",
            "Ser informado sobre el uso que se ha dado a tus datos personales.",
            "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la normativa de protección de datos.",
            "Revocar la autorización y/o solicitar la supresión de tus datos, cuando no exista un deber legal o contractual que lo impida.",
            "Acceder en forma gratuita a tus datos personales que hayan sido objeto de tratamiento.",
          ]} />

          <H2 id="ejercer-derechos">7. Cómo ejercer tus derechos</H2>
          <P>
            Puedes ejercer cualquiera de estos derechos escribiéndonos a{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">{siteConfig.contact.email}</a>{" "}
            indicando tu nombre completo, una descripción clara de tu solicitud y un medio de contacto para responderte.
          </P>
          <P>
            Las consultas serán atendidas en un término máximo de diez (10) días hábiles contados a partir de la fecha de recibo, prorrogable por cinco (5) días hábiles adicionales cuando sea necesario. Los reclamos serán atendidos en un término máximo de quince (15) días hábiles, conforme a los artículos 14 y 15 de la Ley 1581 de 2012.
          </P>

          <H2 id="transferencia">8. Transferencia y transmisión de datos</H2>
          <P>
            ACM no vende ni comparte tus datos personales con terceros para fines comerciales ajenos a nuestra actividad. Podemos compartir datos con proveedores tecnológicos que nos prestan servicios de hosting, correo electrónico o mensajería (como WhatsApp Business), quienes actúan como encargados del tratamiento bajo nuestras instrucciones, o cuando así lo exija una autoridad competente en ejercicio de sus funciones legales.
          </P>

          <H2 id="cookies">9. Uso de cookies</H2>
          <P>
            Este sitio puede utilizar cookies propias y de terceros (por ejemplo, herramientas de analítica web) para entender cómo se usa el sitio y mejorar tu experiencia de navegación. Puedes deshabilitar o eliminar las cookies desde la configuración de tu navegador en cualquier momento, aunque esto podría afectar algunas funciones del sitio.
          </P>

          <H2 id="seguridad">10. Seguridad de la información</H2>
          <P>
            ACM adopta medidas técnicas, humanas y administrativas razonables para proteger tus datos personales contra pérdida, uso indebido, acceso no autorizado, alteración o divulgación.
          </P>

          <H2 id="vigencia">11. Vigencia</H2>
          <P>
            Esta política rige desde su fecha de publicación y permanecerá vigente mientras ACM trate datos personales para las finalidades aquí descritas. Podemos actualizarla en cualquier momento; los cambios sustanciales se publicarán en esta misma página.
          </P>

          <Divider />

          <H2 id="contacto">12. Contacto</H2>
          <P>
            Si tienes dudas sobre esta política o sobre el tratamiento de tus datos personales, escríbenos a{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">{siteConfig.contact.email}</a>{" "}
            o visita nuestra{" "}
            <Link href="/contacto" className="text-navy-deep font-semibold underline underline-offset-4 decoration-orange-acm/50 hover:decoration-orange-acm">página de contacto</Link>.
            {" "}También puedes consultar tus derechos ante la Superintendencia de Industria y Comercio (SIC), autoridad de control en materia de protección de datos personales en Colombia.
          </P>
        </div>
      </article>
    </>
  );
}
