import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { CONTACT_INFO, whatsappLink } from "../../config/constants";

export const Footer = () => {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    const services = [
        { key: "footer.services.import", path: "/servicios" },
        { key: "footer.services.logistics", path: "/servicios" },
        { key: "footer.services.trade", path: "/servicios" },
    ];
    const company = [
        { key: "footer.company.home", path: "/" },
        { key: "footer.company.about", path: "/nosotros" },
        { key: "footer.company.contact", path: "/contacto" },
    ];

    return (
        <footer
            className="
                relative overflow-hidden
                bg-[#0B2239]
                dark:bg-[#061522]
                text-white
                transition-colors duration-700 ease-editorial
            "
        >
            <div className="
                h-px w-full
                bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent
                opacity-50
            " />

            <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                    <div className="md:col-span-5 space-y-6">
                        <FooterBrand />
                        <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
                            {t("brand.tagline")}
                        </p>
                        <p className="text-white/40 text-xs leading-relaxed max-w-sm">
                            {t("footer.address")}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <FooterCol title={t("footer.directorate")}>
                            <ul className="space-y-3 text-sm">
                                {company.map(({ key, path }) => (
                                    <li key={key}>
                                        <Link
                                            to={path}
                                            className="text-white/70 hover:text-[var(--gold)] transition-colors"
                                        >
                                            {t(key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </FooterCol>
                    </div>

                    <div className="md:col-span-2">
                        <FooterCol title={t("nav.services")}>
                            <ul className="space-y-3 text-sm">
                                {services.map(({ key, path }) => (
                                    <li key={key}>
                                        <Link
                                            to={path}
                                            className="text-white/70 hover:text-[var(--gold)] transition-colors"
                                        >
                                            {t(key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </FooterCol>
                    </div>

                    <div className="md:col-span-3">
                        <FooterCol title={t("footer.connect")}>
                            <ul className="space-y-3 text-sm">
                                {[
                                    { href: whatsappLink(t("whatsapp.message")), label: t("footer.whatsapp"), Icon: MessageCircle, external: true },
                                    { href: CONTACT_INFO.phoneHref, label: CONTACT_INFO.phone, Icon: Phone },
                                    { href: `mailto:${CONTACT_INFO.email}`, label: CONTACT_INFO.email, Icon: Mail },
                                ].map(({ href, label, Icon, external }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                            className="inline-flex items-center gap-2 text-white/70 hover:text-[var(--gold)] transition-colors break-all"
                                        >
                                            <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </FooterCol>
                    </div>
                </div>

                <div className="
                    mt-16 pt-8
                    border-t border-white/10
                    flex flex-col md:flex-row md:items-center md:justify-between gap-4
                ">
                    <div className="text-xs text-white/50 tracking-wider">
                        © {year} {t("footer.copyright")}. {t("footer.rights")}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/40">
                        <span>{t("footer.disclaimer")}</span>
                        <span className="opacity-30">·</span>
                        <Link to="/aviso-de-privacidad" className="hover:text-[var(--gold)] transition-colors">
                            {t("footer.privacy")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterCol = ({ title, children }) => (
    <div>
        <h4 className="label-caps text-[var(--gold)] mb-5">{title}</h4>
        {children}
    </div>
);

const FooterBrand = () => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-10 h-10 overflow-hidden rounded-full ring-1 ring-[var(--gold)]/60">
                <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>
            <div className="flex flex-col leading-tight">
                <span className="
                    text-[11px] font-semibold tracking-[0.22em]
                    uppercase text-white
                ">
                    {t("brand.name")}
                </span>
                <span className="
                    text-[9px] tracking-[0.3em]
                    text-[var(--gold)]
                    uppercase mt-0.5
                ">
                    {t("brand.subline")}
                </span>
            </div>
        </div>
    );
};
