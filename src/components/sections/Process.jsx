import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const STEPS = [
    { key: "step1", num: "01" },
    { key: "step2", num: "02" },
    { key: "step3", num: "03" },
    { key: "step4", num: "04" },
];

export const Process = () => {
    const { t } = useLanguage();

    return (
        <section
            className="
                relative
                bg-[var(--paper-warm)]
                dark:bg-[var(--navy-deepest)]
                text-[var(--ink)]
                dark:text-white
                py-24 md:py-32 px-5 md:px-8 overflow-hidden
                transition-colors duration-700 ease-editorial
            "
        >
            {/* Decoración: glow dorado */}
            <div
                className="
                    absolute -top-32 -right-32 w-96 h-96 rounded-full
                    bg-[var(--gold)]/10 dark:bg-[var(--gold)]/15
                    blur-3xl pointer-events-none
                "
                aria-hidden="true"
            />
            <div
                className="
                    absolute -bottom-32 -left-32 w-96 h-96 rounded-full
                    bg-[var(--maritime)]/15 dark:bg-[var(--maritime)]/10
                    blur-3xl pointer-events-none
                "
                aria-hidden="true"
            />

            <div className="relative max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-12 gap-12 mb-16 md:mb-20">
                    <div className="md:col-span-7">
                        <span className="
                            label-caps text-[var(--gold)]
                            flex items-center gap-3 mb-6
                        ">
                            <span className="block w-8 h-px bg-[var(--gold)]" />
                            {t("process.eyebrow")}
                        </span>
                        <h2 className="
                            text-3xl md:text-5xl lg:text-6xl
                            font-light
                            text-[var(--ink)] dark:text-white
                            tracking-tight leading-[1.05] text-balance
                        ">
                            {t("process.title")}
                        </h2>
                    </div>
                    <div className="md:col-span-5 md:pt-2">
                        <p className="
                            text-[var(--ink-soft)] dark:text-white/65
                            text-base md:text-lg leading-relaxed font-light text-pretty
                        ">
                            {t("process.subtitle")}
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {/* Línea vertical */}
                    <div
                        className="
                            absolute left-[19px] top-3 bottom-3 w-px
                            bg-[var(--line)]
                            dark:bg-white/10
                            hidden md:block
                        "
                    />

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
                        {STEPS.map((step, idx) => (
                            <motion.div
                                key={step.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="relative flex gap-6"
                            >
                                <div className="relative shrink-0">
                                    <div className="
                                        w-10 h-10
                                        border border-[var(--gold)]
                                        bg-[var(--paper-warm)]
                                        dark:bg-[var(--navy-deep)]
                                        flex items-center justify-center
                                    ">
                                        <span className="
                                            label-caps
                                            text-[var(--gold)]
                                            text-[10px]
                                        ">
                                            {step.num}
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <h3 className="
                                        text-xl md:text-2xl
                                        font-light
                                        text-[var(--ink)] dark:text-white
                                        tracking-tight mb-3
                                    ">
                                        {t(`process.${step.key}.title`)}
                                    </h3>
                                    <p className="
                                        text-[var(--ink-soft)] dark:text-white/65
                                        text-[15px] leading-relaxed font-light text-pretty
                                    ">
                                        {t(`process.${step.key}.text`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
