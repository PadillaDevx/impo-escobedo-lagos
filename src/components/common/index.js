import { motion } from "framer-motion";

export { Button } from "./Button";
export { Card } from "./Card";
export { BrandMark } from "./BrandMark";

export const PageHero = ({ eyebrow, title, subtitle, align = "left" }) => {
    const alignClass =
        align === "center"
            ? "text-center mx-auto"
            : align === "right"
                ? "text-right ml-auto"
                : "text-left";
    return (
        <section className="relative pt-36 pb-24 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--paper-warm)]" aria-hidden="true" />
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[var(--gold)]/5 blur-3xl"
                aria-hidden="true"
            />
            <div className={`relative max-w-5xl ${alignClass}`}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    {eyebrow && (
                        <span className="label-caps text-[var(--gold-text)] block mb-5">{eyebrow}</span>
                    )}
                    {title && (
                        <h1 className="text-4xl md:text-6xl font-light text-[var(--ink)] tracking-tight text-balance leading-[1.05]">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="mt-6 text-lg md:text-xl text-[var(--ink-soft)] max-w-3xl font-light leading-relaxed text-pretty">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export const SectionHeading = ({ eyebrow, title, subtitle, align = "left" }) => {
    const wrap =
        align === "center"
            ? "text-center items-center"
            : align === "right"
                ? "text-right items-end"
                : "text-left items-start";
    return (
        <div className={`flex flex-col gap-4 mb-14 ${wrap}`}>
            {eyebrow && (
                <span className="label-caps text-[var(--gold-text)] flex items-center gap-3">
                    <span className="block w-8 h-px bg-[var(--gold)]" />
                    {eyebrow}
                </span>
            )}
            {title && (
                <h2 className="text-3xl md:text-5xl font-light text-[var(--ink)] tracking-tight leading-[1.1] text-balance max-w-2xl">
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="text-base md:text-lg text-[var(--ink-soft)] font-light max-w-xl leading-relaxed text-pretty">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export const StatNumber = ({ value, label, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index || 0) * 0.1, duration: 0.6 }}
        className="flex flex-col gap-2"
    >
        <span className="text-4xl md:text-5xl font-light text-[var(--ink)] tracking-tight">
            {value}
        </span>
        <span className="label-caps text-[var(--ink-muted)]">{label}</span>
    </motion.div>
);
