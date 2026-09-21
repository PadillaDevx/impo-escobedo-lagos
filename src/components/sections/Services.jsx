import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Ship, Network, Scale } from "lucide-react";
import { SectionHeading } from "../common";
import { useLanguage } from "../../contexts/LanguageContext";

const SERVICES = [
    {
        key: "import",
        Icon: Ship,
        titleKey: "service.import.title",
        shortKey: "service.import.short",
    },
    {
        key: "logistics",
        Icon: Network,
        titleKey: "service.logistics.title",
        shortKey: "service.logistics.short",
    },
    {
        key: "customs",
        Icon: Scale,
        titleKey: "service.customs.title",
        shortKey: "service.customs.short",
    },
];

export const Services = () => {
    const { t } = useLanguage();

    return (
        <section
            id="servicios"
            className="relative bg-[var(--paper)] py-24 md:py-32 px-5 md:px-8"
        >
            <div className="max-w-[1280px] mx-auto">
                <SectionHeading
                    eyebrow={t("services.eyebrow")}
                    title={t("services.title")}
                    subtitle={t("services.subtitle")}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-7">
                    {SERVICES.map(({ key, Icon, titleKey, shortKey }, idx) => (
                        <motion.article
                            key={key}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`
                                group relative bg-[var(--paper-warm)]
                                border-t-2 transition-all duration-500 ease-editorial
                                ${idx === 1 ? "md:border-t-2 md:border-l-0 border-l-2 border-l-[var(--gold)]" : "border-t-[var(--ink)]"}
                                ${idx === 2 ? "border-t-[var(--gold)]" : ""}
                                p-7 md:p-9 flex flex-col gap-8
                                hover:bg-[var(--paper-high)] hover:-translate-y-1
                            `}
                        >
                            <div className="flex items-start justify-between">
                                <span className="label-caps text-[var(--ink-muted)]">
                                    0{idx + 1}
                                </span>
                                <span className="text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors duration-300">
                                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl md:text-[1.7rem] font-light text-[var(--ink)] mb-4 tracking-tight leading-tight">
                                    {t(titleKey)}
                                </h3>
                                <p className="text-[var(--ink-soft)] text-[15px] leading-relaxed font-light text-pretty">
                                    {t(shortKey)}
                                </p>
                            </div>

                            <div className="mt-auto pt-5 border-t border-[var(--line-soft)] flex items-center justify-between">
                                <span className="label-caps text-[var(--gold)]">
                                    {t("services.cta").split(" ")[0]}
                                </span>
                                <ArrowUpRight
                                    className="w-4 h-4 text-[var(--ink)] group-hover:text-[var(--gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <Link
                        to="/servicios"
                        className="inline-flex items-center gap-2 label-caps text-[var(--ink)] hover:text-[var(--gold)] link-underline"
                    >
                        {t("services.cta")}
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
