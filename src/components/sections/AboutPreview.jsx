import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

const STATS = [
    { valueKey: "about.stat1.value", labelKey: "about.stat1.label" },
    { valueKey: "about.stat2.value", labelKey: "about.stat2.label" },
    { valueKey: "about.stat3.value", labelKey: "about.stat3.label" },
    { valueKey: "about.stat4.value", labelKey: "about.stat4.label" },
];

export const AboutPreview = () => {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const [lightsOn, setLightsOn] = useState(false);

    const aboutImage = isDark
        ? `${process.env.PUBLIC_URL}/fondo-nocturno.jpeg`
        : `${process.env.PUBLIC_URL}/fondo-claro.jpeg`;

    return (
        <section
            id="nosotros"
            className="relative bg-[var(--paper-warm)] py-24 md:py-32 px-5 md:px-8"
        >
            <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-center">
                {/* Imagen interactiva */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-6"
                >
                    <div
                        className="relative w-full h-[420px] md:h-[540px] overflow-hidden cursor-pointer group bg-[var(--navy-deep)] port-hover"
                        onMouseEnter={() => setLightsOn(true)}
                        onMouseLeave={() => setLightsOn(false)}
                        onTouchStart={() => setLightsOn(true)}
                        onTouchEnd={() => setTimeout(() => setLightsOn(false), 1600)}
                    >
                        <img
                            key={aboutImage}
                            src={aboutImage}
                            alt="Puerto logístico"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-105 filter brightness-75 contrast-110"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />

                        {/* Overlay oscuro */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-deep)]/55 via-[var(--navy-deep)]/40 to-[var(--navy-deep)]/70 mix-blend-multiply" />

                        {/* Luces decorativas (efecto hover) */}
                        <div
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 mix-blend-screen ${
                                lightsOn ? "opacity-100" : "opacity-0"
                            }`}
                            aria-hidden="true"
                        >
                            <div className="absolute top-[25%] right-[18%] w-32 h-32 bg-[var(--gold)]/35 rounded-full blur-2xl" />
                            <div className="absolute top-[40%] left-[28%] w-24 h-24 bg-[var(--gold)]/25 rounded-full blur-xl" />
                            <div className="absolute top-[45%] left-[10%] w-16 h-16 bg-[var(--gold)]/20 rounded-full blur-lg" />
                            <div className="absolute top-[45%] right-[38%] w-20 h-20 bg-[var(--gold)]/25 rounded-full blur-xl" />
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-5 left-5 right-5 p-4 bg-[var(--navy-deep)]/85 backdrop-blur-md border border-white/10 transition-all duration-500 ease-editorial">
                            <span className="label-caps text-[10px] text-[var(--gold)] tracking-widest block mb-1">
                                {t("about.imageEyebrow")}
                            </span>
                            <p className="text-xs text-white/70 font-light">
                                {t("about.imageCaption")}
                            </p>
                        </div>

                        {/* Marco decorativo */}
                        <div className="absolute top-5 left-5 right-5 bottom-5 border border-white/10 pointer-events-none" />
                    </div>
                </motion.div>

                {/* Texto */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-6 space-y-6"
                >
                    <span className="label-caps text-[var(--gold)] flex items-center gap-3">
                        <span className="block w-8 h-px bg-[var(--gold)]" />
                        {t("about.eyebrow")}
                    </span>

                    <h2 className="text-3xl md:text-5xl font-light text-[var(--ink)] tracking-tight leading-[1.05] text-balance">
                        {t("about.title")}
                    </h2>

                    <p className="text-lg text-[var(--ink)] font-light leading-relaxed text-pretty">
                        {t("about.lead")}
                    </p>

                    <p className="text-[var(--ink-soft)] font-light leading-relaxed text-pretty">
                        {t("about.body")}
                    </p>

                    {/* Mini stats */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-6 border-t border-[var(--line-soft)]">
                        {STATS.map((s) => (
                            <div key={s.labelKey} className="flex flex-col gap-1">
                                <span className="text-3xl font-light text-[var(--ink)] tracking-tight">
                                    {t(s.valueKey)}
                                </span>
                                <span className="label-caps text-[var(--ink-muted)]">
                                    {t(s.labelKey)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/nosotros"
                        className="inline-flex items-center gap-2 label-caps text-[var(--ink)] hover:text-[var(--gold)] link-underline pt-2"
                    >
                        {t("about.cta")}
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
