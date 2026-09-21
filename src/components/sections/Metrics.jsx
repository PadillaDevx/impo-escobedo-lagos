import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const METRICS = [
    { valueKey: "metric.years.value", labelKey: "metrics.years.label" },
    { valueKey: "metric.teus.value", labelKey: "metrics.teus.label" },
    { valueKey: "metric.routes.value", labelKey: "metrics.routes.label" },
    { valueKey: "metric.accuracy.value", labelKey: "metrics.accuracy.label" },
];

export const Metrics = () => {
    const { t } = useLanguage();

    return (
        <section className="relative bg-[var(--paper-soft)] border-y border-[var(--line-soft)]">
            <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-10 md:py-14">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6"
                >
                    {METRICS.map((metric, i) => (
                        <div
                            key={metric.labelKey}
                            className={`flex flex-col gap-2 ${
                                i < METRICS.length - 1 ? "lg:border-r lg:border-[var(--line-soft)] lg:pr-6" : ""
                            } ${i % 2 === 0 ? "md:border-r md:border-[var(--line-soft)] md:pr-6" : ""} lg:[&:nth-child(n)]:border-r-0 lg:[&:not(:last-child)]:border-r`}
                        >
                            <span className="text-4xl md:text-5xl font-light text-[var(--ink)] tracking-tight">
                                {t(metric.valueKey)}
                            </span>
                            <span className="label-caps text-[var(--ink-muted)]">
                                {t(metric.labelKey)}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
