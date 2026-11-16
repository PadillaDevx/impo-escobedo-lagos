import { PageHero } from "../components/common";
import { useLanguage } from "../contexts/LanguageContext";
import { BRANDING, CONTACT_INFO, PRIVACY_OWNER } from "../config/constants";

// Aviso de privacidad integral (LFPDPPP). Se publica en español.
// Pendiente: completar PRIVACY_OWNER (nombre y domicilio del responsable)
// en config/constants.js y pedir una revisión legal antes de darlo por final.
export const Privacy = () => {
    const { t } = useLanguage();
    const { city, state, country } = CONTACT_INFO.location;
    const owner = PRIVACY_OWNER.legalName
        ? `${PRIVACY_OWNER.legalName}, quien opera bajo el nombre comercial "${BRANDING.name}"`
        : `"${BRANDING.name}"`;
    const address = PRIVACY_OWNER.address || `${city}, ${state}, ${country}`;
    const email = (
        <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-[var(--gold-text)]">
            {CONTACT_INFO.email}
        </a>
    );

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)]">
            <PageHero
                eyebrow={t("footer.privacy")}
                title={t("privacy.title")}
                subtitle={t("privacy.subtitle")}
            />

            <section className="py-20 md:py-24 px-5 md:px-8">
                <article lang="es" className="max-w-3xl mx-auto space-y-10 text-[var(--ink-soft)] font-light leading-relaxed">
                    {t("privacy.languageNote") && (
                        <p className="text-sm border-l-2 border-[var(--gold)] pl-4">
                            {t("privacy.languageNote")}
                        </p>
                    )}
                    <p className="label-caps text-[var(--ink-muted)]">
                        {t("privacy.updated")}: {PRIVACY_OWNER.lastUpdated}
                    </p>

                    <Block title="1. Responsable de sus datos personales">
                        <p>
                            {owner}, con domicilio en {address}, es responsable del tratamiento
                            de los datos personales que usted nos proporcione, de conformidad con
                            la Ley Federal de Protección de Datos Personales en Posesión de los
                            Particulares y demás normativa aplicable. Para cualquier asunto
                            relacionado con este aviso puede escribirnos a {email} o llamar
                            al {CONTACT_INFO.phone}.
                        </p>
                    </Block>

                    <Block title="2. Datos personales que recabamos">
                        <p>
                            Cuando nos contacta a través del formulario de este sitio, por correo,
                            teléfono o WhatsApp, podemos recabar los siguientes datos:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Nombre completo.</li>
                            <li>Correo electrónico.</li>
                            <li>Teléfono (opcional).</li>
                            <li>Nombre de su empresa (opcional).</li>
                            <li>La información que decida incluir en su mensaje sobre la operación que nos consulta.</li>
                        </ul>
                        <p>
                            No solicitamos datos personales sensibles. Le pedimos no incluirlos en
                            sus mensajes.
                        </p>
                    </Block>

                    <Block title="3. Finalidades del tratamiento">
                        <p>Utilizamos sus datos personales únicamente para:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Atender y responder su solicitud de información.</li>
                            <li>Contactarle para dar seguimiento a su consulta.</li>
                            <li>Elaborar y enviarle, en su caso, una propuesta de servicios de asesoría.</li>
                        </ul>
                        <p>
                            No utilizamos sus datos para finalidades secundarias como publicidad,
                            mercadotecnia o envío de boletines.
                        </p>
                    </Block>

                    <Block title="4. Transferencias y proveedores">
                        <p>
                            No vendemos ni transferimos sus datos personales a terceros, salvo en
                            los casos previstos por la ley o cuando lo requiera una autoridad
                            competente.
                        </p>
                        <p>
                            Para operar este sitio nos apoyamos en proveedores tecnológicos que
                            tratan los datos únicamente por nuestra cuenta: el servicio de
                            alojamiento del sitio (Cloudflare), el servicio de envío de correo que
                            nos hace llegar los mensajes del formulario (Resend) y, si usted nos
                            escribe por ese medio, WhatsApp.
                        </p>
                    </Block>

                    <Block title="5. Derechos ARCO">
                        <p>
                            Usted tiene derecho a Acceder a sus datos personales, Rectificarlos si
                            son inexactos, Cancelarlos cuando considere que no se requieren para
                            las finalidades señaladas, y Oponerse a su tratamiento.
                        </p>
                        <p>
                            Para ejercerlos, envíe una solicitud a {email} que incluya: su nombre y
                            un medio para responderle; un documento que acredite su identidad (o
                            la de su representante); la descripción clara de los datos y del
                            derecho que desea ejercer; y cualquier elemento que facilite
                            localizarlos. Le responderemos en un plazo máximo de 20 días hábiles.
                        </p>
                    </Block>

                    <Block title="6. Revocación del consentimiento y limitación del uso">
                        <p>
                            Puede revocar en cualquier momento el consentimiento que nos haya
                            otorgado, o pedirnos que limitemos el uso de sus datos, por el mismo
                            medio indicado para los derechos ARCO.
                        </p>
                    </Block>

                    <Block title="7. Conservación">
                        <p>
                            Conservamos sus datos solo durante el tiempo necesario para atender su
                            solicitud y, en su caso, la relación de servicios que se derive de
                            ella. Después los eliminamos de forma segura.
                        </p>
                    </Block>

                    <Block title="8. Cookies y tecnologías similares">
                        <p>
                            Este sitio no utiliza cookies de publicidad ni herramientas de
                            analítica. Únicamente guarda en su navegador sus preferencias de
                            idioma y de tema (claro u oscuro). Para mostrar las tipografías, su
                            navegador se conecta a Google Fonts, y nuestro proveedor de
                            alojamiento puede usar cookies técnicas estrictamente necesarias para
                            la seguridad del sitio.
                        </p>
                    </Block>

                    <Block title="9. Cambios a este aviso">
                        <p>
                            Cualquier cambio a este aviso de privacidad se publicará en esta misma
                            página, indicando la fecha de la última actualización.
                        </p>
                    </Block>

                    <Block title="10. Autoridad">
                        <p>
                            Si considera que su derecho a la protección de datos personales ha sido
                            vulnerado, puede acudir ante la autoridad competente en la materia.
                        </p>
                    </Block>
                </article>
            </section>
        </div>
    );
};

const Block = ({ title, children }) => (
    <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-light tracking-tight text-[var(--ink)]">{title}</h2>
        {children}
    </section>
);
