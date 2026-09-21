import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export const Hero = () => {
    const { t } = useLanguage();
    const [lightsOn, setLightsOn] = useState(false);

    const heroImage = `${process.env.PUBLIC_URL}/images/image.png`;

    return (
        <section
            className="
                relative w-full min-h-[88vh] md:min-h-[92vh]
                bg-[var(--paper-warm)]
                dark:bg-[var(--navy-deepest)]
                text-[var(--ink)]
                dark:text-white
                overflow-hidden flex flex-col justify-end
                transition-colors duration-700 ease-editorial
            "
        >
            {/* Imagen de fondo theme-aware */}
            <div
                className="absolute inset-0 group"
                onMouseEnter={() => setLightsOn(true)}
                onMouseLeave={() => setLightsOn(false)}
                onTouchStart={() => setLightsOn(true)}
                onTouchEnd={() => setTimeout(() => setLightsOn(false), 1800)}
            >
                <img
                    key={heroImage}
                    src={heroImage}
                    alt="Puerto logístico con contenedores"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />

                {/* Luces ámbar — solo en tema oscuro, aparecen al hover */}
                <div
                    className={`
                        absolute inset-0 pointer-events-none
                        transition-opacity duration-1000 ease-editorial
                        dark:mix-blend-screen
                        ${lightsOn ? "opacity-100" : "opacity-0"}
                    `}
                    aria-hidden="true"
                >
                    <div className="absolute top-[18%] right-[14%] w-40 h-40 rounded-full bg-[#FFB347]/45 blur-3xl" />
                    <div className="absolute top-[28%] left-[10%] w-28 h-28 rounded-full bg-[#FFA94D]/35 blur-2xl" />
                    <div className="absolute top-[42%] left-[34%] w-24 h-24 rounded-full bg-[#FFC061]/30 blur-xl" />
                    <div className="absolute top-[50%] right-[36%] w-20 h-20 rounded-full bg-[#FFB347]/35 blur-xl" />
                    <div className="absolute top-[22%] right-[40%] w-16 h-16 rounded-full bg-[#FFD37B]/40 blur-lg" />
                    <div className="absolute top-[60%] left-[22%] w-14 h-14 rounded-full bg-[#FFA94D]/25 blur-md" />
                </div>


            </div>

            {/* Grid sutil decorativo */}
            <div
                className="
                    absolute inset-0 opacity-[0.04] dark:opacity-[0.05] pointer-events-none
                "
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.4) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
                }}
            />

            {/* Contenido */}
            <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 md:px-8 pb-16 md:pb-24 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    {/* Eyebrow con línea dorada */}
                    <div className="flex items-center gap-4 mb-7 border-l-2 border-[var(--gold)] pl-4">
                        <span className="label-caps text-[var(--gold)]">{t("hero.eyebrow")}</span>
                    </div>

                    <h1 className="
                        text-4xl md:text-6xl lg:text-7xl
                        font-light
                        text-[var(--ink)] dark:text-white
                        tracking-tight leading-[1.02]
                        text-balance mb-7
                    ">
                        {t("hero.title")}
                    </h1>

                    <p className="
                        text-base md:text-lg
                        text-[var(--ink-soft)] dark:text-white/80
                        max-w-xl font-light leading-relaxed mb-10 text-pretty
                    ">
                        {t("hero.subtitle")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                document
                                    .getElementById("contacto")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="
                                inline-flex items-center justify-center gap-2
                                bg-[var(--gold)] hover:bg-[var(--gold-dark)]
                                text-[var(--navy-deepest)]
                                px-7 h-12
                                text-[11px] font-medium tracking-[0.22em] uppercase
                                transition-all duration-300 ease-editorial
                                border border-transparent
                                shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]
                            "
                        >
                            {t("hero.cta")}
                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                        </button>

                        <Link
                            to="/servicios"
                            className="
                                inline-flex items-center justify-center gap-2
                                bg-[var(--paper)]/90
                                dark:bg-transparent
                                text-[var(--ink)]
                                dark:text-white
                                border border-[var(--ink)]/30
                                dark:border-white/30
                                hover:border-[var(--gold)]
                                hover:text-[var(--gold)]
                                backdrop-blur-sm
                                px-7 h-12
                                text-[11px] font-medium tracking-[0.22em] uppercase
                                transition-all duration-300 ease-editorial
                            "
                        >
                            {t("hero.secondary")}
                        </Link>
                    </div>
                </motion.div>

                {/* Indicador de scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="
                        absolute right-5 md:right-8 bottom-8
                        hidden md:flex flex-col items-center gap-3
                        text-[var(--ink-muted)] dark:text-white/40
                    "
                >
                    <span
                        className="label-caps"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                        {t("hero.scroll")}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Acento inferior dorado */}
            <div className="
                absolute bottom-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent
            " />
        </section>
    );
};
