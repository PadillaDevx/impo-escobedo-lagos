import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Ship, Network, Scale, Globe, FileCheck, Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/common";
import { useLanguage } from "../contexts/LanguageContext";

const SERVICES = [
    {
        key: "import",
        Icon: Ship,
        titleKey: "service.import.title",
        descKey: "service.import.description",
        features: [
            "service.import.feature1",
            "service.import.feature2",
            "service.import.feature3",
            "service.import.feature4",
        ],
    },
    {
        key: "logistics",
        Icon: Network,
        titleKey: "service.logistics.title",
        descKey: "service.logistics.description",
        features: [
            "service.logistics.feature1",
            "service.logistics.feature2",
            "service.logistics.feature3",
            "service.logistics.feature4",
        ],
    },
    {
        key: "customs",
        Icon: Scale,
        titleKey: "service.customs.title",
        descKey: "service.customs.description",
        features: [
            "service.customs.feature1",
            "service.customs.feature2",
            "service.customs.feature3",
            "service.customs.feature4",
        ],
    },
];

const BENEFITS = [
    { key: "servicesPage.benefit.coverage", Icon: Globe },
    { key: "servicesPage.benefit.legal", Icon: FileCheck },
    { key: "servicesPage.benefit.delivery", Icon: Clock },
];

export const ServicesPage = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)]">
            <PageHero
                eyebrow={t("nav.services")}
                title={t("servicesPage.hero.title")}
                subtitle={t("servicesPage.hero.subtitle")}
            />

            {/* Lista de servicios */}
            <section className="py-24 md:py-28 px-5 md:px-8">
                <div className="max-w-[1280px] mx-auto space-y-8">
                    {SERVICES.map(({ key, Icon, titleKey, descKey, features }, idx) => (
                        <motion.article
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="group grid md:grid-cols-12 gap-8 md:gap-12 bg-[var(--paper-warm)] border border-[var(--line-soft)] hover:border-[var(--gold)] transition-all duration-500 p-8 md:p-12"
                        >
                            <div className="md:col-span-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="label-caps text-[var(--gold)]">
                                        0{idx + 1}
                                    </span>
                                    <span className="h-px w-12 bg-[var(--gold)]" />
                                </div>
                                <div className="text-[var(--gold)] mb-6">
                                    <Icon className="w-12 h-12" strokeWidth={1.2} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-light tracking-tight leading-tight text-[var(--ink)] text-balance">
                                    {t(titleKey)}
                                </h2>
                                <p className="mt-5 text-[var(--ink-soft)] font-light leading-relaxed text-pretty">
                                    {t(descKey)}
                                </p>
                            </div>
                            <div className="md:col-span-7 md:border-l md:border-[var(--line-soft)] md:pl-12">
                                <ul className="space-y-4">
                                    {features.map((featureKey) => (
                                        <li
                                            key={featureKey}
                                            className="flex items-start gap-4 pb-4 border-b border-[var(--line-soft)] last:border-b-0"
                                        >
                                            <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--gold)] rounded-full shrink-0" />
                                            <span className="text-[var(--ink)] font-light leading-relaxed">
                                                {t(featureKey)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Beneficios */}
            <section
                className="
                    py-24 md:py-28 px-5 md:px-8
                    bg-[var(--paper-warm)]
                    dark:bg-[var(--navy-deepest)]
                    text-[var(--ink)]
                    dark:text-white
                    transition-colors duration-700 ease-editorial
                "
            >
                <div className="max-w-[1280px] mx-auto">
                    <div className="text-center mb-14">
                        <span
                            className="
                                label-caps text-[var(--gold)]
                                flex items-center justify-center gap-3 mb-4
                            "
                        >
                            <span className="block w-8 h-px bg-[var(--gold)]" />
                            {t("nav.services")}
                            <span className="block w-8 h-px bg-[var(--gold)]" />
                        </span>
                        <h2 className="
                            text-3xl md:text-5xl
                            font-light
                            text-[var(--ink)] dark:text-white
                            tracking-tight leading-tight text-balance
                        ">
                            {t("servicesPage.benefits.title")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {BENEFITS.map(({ key, Icon }, i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="
                                    bg-[var(--paper)] dark:bg-[var(--navy-surface)]
                                    border border-[var(--line)] dark:border-white/10
                                    p-8 md:p-10
                                    hover:border-[var(--gold)]
                                    transition-all duration-300 group
                                "
                            >
                                <div className="
                                    w-12 h-12
                                    border border-[var(--gold)]/40
                                    flex items-center justify-center mb-6
                                    text-[var(--gold)]
                                    group-hover:bg-[var(--gold)]
                                    group-hover:text-[var(--navy-deep)]
                                    transition-colors
                                ">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <p className="
                                    text-lg md:text-xl font-light tracking-tight text-balance
                                    text-[var(--ink)] dark:text-white
                                ">
                                    {t(key)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-24 md:py-32 px-5 md:px-8 bg-[var(--paper-warm)] border-t border-[var(--line-soft)]">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="label-caps text-[var(--gold)] block mb-5">
                            {t("servicesPage.cta.title")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light text-[var(--ink)] tracking-tight leading-tight text-balance mb-6">
                            {t("servicesPage.cta.subtitle")}
                        </h2>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 bg-[var(--navy-deep)] text-white px-7 h-12 label-caps hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors duration-300"
                        >
                            {t("servicesPage.cta.button")}
                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
