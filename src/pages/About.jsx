import { motion } from "framer-motion";
import { Target, Eye, Award, Check } from "lucide-react";
import { PageHero, SectionHeading } from "../components/common";
import { useLanguage } from "../contexts/LanguageContext";
import { ADVISOR } from "../config/constants";

const POINTS = ["about.point1", "about.point2", "about.point3", "about.point4"];

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

                        <ul className="pt-8 mt-8 border-t border-[var(--line-soft)] grid sm:grid-cols-2 gap-x-6 gap-y-4 text-base">
                            {POINTS.map((key) => (
                                <li key={key} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 mt-1.5 text-[var(--gold)] shrink-0" strokeWidth={2} />
                                    <span className="text-[var(--ink)]">{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {ADVISOR.name && <AdvisorProfile />}

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

// Perfil del asesor: solo se muestra cuando ADVISOR.name tiene valor (config/constants.js)
const AdvisorProfile = () => {
    const { t, lang } = useLanguage();
    const title = ADVISOR.title?.[lang] || ADVISOR.title?.es;
    const bio = ADVISOR.bio?.[lang] || ADVISOR.bio?.es;

    return (
        <section className="pb-24 md:pb-32 px-5 md:px-8">
            <div className="max-w-[1100px] mx-auto grid md:grid-cols-12 gap-10 items-center border-t border-[var(--line-soft)] pt-16">
                {ADVISOR.photo && (
                    <div className="md:col-span-4">
                        <img
                            src={`${process.env.PUBLIC_URL}${ADVISOR.photo}`}
                            alt={ADVISOR.name}
                            className="w-full aspect-[4/5] object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
                <div className={ADVISOR.photo ? "md:col-span-8 space-y-4" : "md:col-span-12 space-y-4"}>
                    <span className="label-caps text-[var(--gold)] flex items-center gap-3">
                        <span className="block w-8 h-px bg-[var(--gold)]" />
                        {t("advisor.eyebrow")}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--ink)]">
                        {ADVISOR.name}
                    </h2>
                    {title && <p className="text-[var(--ink-soft)]">{title}</p>}
                    {ADVISOR.license && (
                        <p className="label-caps text-[var(--ink-muted)]">
                            {t("advisor.license")}: {ADVISOR.license}
                        </p>
                    )}
                    {bio && (
                        <p className="text-[var(--ink-soft)] font-light leading-relaxed text-pretty">
                            {bio}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};
