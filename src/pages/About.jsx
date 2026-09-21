import { motion } from "framer-motion";
import { Target, Eye, Award } from "lucide-react";
import { PageHero, SectionHeading } from "../components/common";
import { useLanguage } from "../contexts/LanguageContext";

const VALUES = [
    {
        key: "aboutPage.values.mission",
        Icon: Target,
    },
    {
        key: "aboutPage.values.vision",
        Icon: Eye,
    },
    {
        key: "aboutPage.values.commitment",
        Icon: Award,
    },
];

export const About = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)]">
            <PageHero
                eyebrow={t("nav.about")}
                title={t("aboutPage.hero.title")}
                subtitle={t("aboutPage.hero.subtitle")}
            />

            {/* Historia */}
            <section className="py-24 md:py-32 px-5 md:px-8">
                <div className="max-w-[1100px] mx-auto grid md:grid-cols-12 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="md:col-span-5 space-y-4"
                    >
                        <span className="label-caps text-[var(--gold)] flex items-center gap-3">
                            <span className="block w-8 h-px bg-[var(--gold)]" />
                            {t("aboutPage.history.eyebrow")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.05] text-[var(--ink)] text-balance">
                            {t("aboutPage.history.title")}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="md:col-span-7 space-y-6 text-[var(--ink-soft)] text-base md:text-lg font-light leading-relaxed"
                    >
                        <p className="text-pretty">{t("aboutPage.history.body1")}</p>
                        <p className="text-pretty">{t("aboutPage.history.body2")}</p>

                        <div className="pt-8 mt-8 border-t border-[var(--line-soft)]">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <Value
                                    value={t("metric.years.value")}
                                    label={t("metrics.years.label")}
                                />
                                <Value
                                    value={t("metric.routes.value")}
                                    label={t("metrics.routes.label")}
                                />
                                <Value
                                    value={t("metric.teus.value")}
                                    label={t("metrics.teus.label")}
                                />
                                <Value
                                    value={t("metric.accuracy.value")}
                                    label={t("metrics.accuracy.label")}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Valores */}
            <section className="py-24 md:py-32 px-5 md:px-8 bg-[var(--paper-warm)] border-y border-[var(--line-soft)]">
                <div className="max-w-[1280px] mx-auto">
                    <SectionHeading
                        eyebrow={t("nav.about")}
                        title={t("aboutPage.values.title")}
                        align="center"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {VALUES.map(({ key, Icon }, i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-[var(--paper)] border border-[var(--line-soft)] p-8 md:p-10 hover:border-[var(--gold)] transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 border border-[var(--gold)]/40 flex items-center justify-center mb-6 text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--navy-deep)] transition-colors">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-light text-[var(--ink)] mb-3 tracking-tight">
                                    {t(`${key}.title`)}
                                </h3>
                                <p className="text-[var(--ink-soft)] text-[15px] font-light leading-relaxed text-pretty">
                                    {t(`${key}.text`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const Value = ({ value, label }) => (
    <div className="flex flex-col gap-1">
        <span className="text-3xl md:text-4xl font-light tracking-tight text-[var(--ink)]">
            {value}
        </span>
        <span className="label-caps text-[var(--ink-muted)]">{label}</span>
    </div>
);
