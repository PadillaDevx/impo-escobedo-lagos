import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { MapPin, Video, Phone } from "lucide-react";
import { MEXICO_PATH, MEXICO_VIEWBOX } from "./mexicoMap";

// Lagos de Moreno, Jalisco (21.36°N, 101.93°O) en el sistema de coordenadas del mapa.
const BASE = { x: 502, y: 440 };

const MODES = [
    { key: "coverage.mode.inPerson", Icon: MapPin },
    { key: "coverage.mode.video", Icon: Video },
    { key: "coverage.mode.phone", Icon: Phone },
];

const BaseNode = ({ label }) => (
    <g>
        <circle cx={BASE.x} cy={BASE.y} r={34} className="fill-[var(--gold)] opacity-10" />
        <circle cx={BASE.x} cy={BASE.y} r={18} className="fill-[var(--gold)] opacity-25" />
        <circle cx={BASE.x} cy={BASE.y} r={8} className="fill-[var(--gold)]" />
        <text
            x={BASE.x + 26}
            y={BASE.y + 7}
            fontSize="20"
            letterSpacing="2"
            fontWeight="500"
            className="hidden md:block fill-[rgba(255,255,255,0.85)]"
        >
            {label.toUpperCase()}
        </text>
    </g>
);

const InfoCard = ({ label, accent, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`bg-white/[0.04] p-6 md:p-7 border-t-2 ${
            accent ? "border-[var(--gold)]" : "border-[var(--maritime)]"
        }`}
    >
        <h3
            className={`label-caps mb-5 ${
                accent ? "text-[var(--gold)]" : "text-[var(--navy-fixed)]"
            }`}
        >
            {label}
        </h3>
        {children}
    </motion.div>
);

export const Coverage = () => {
    const { t } = useLanguage();

    return (
        <section
            id="cobertura"
            className="
                relative overflow-hidden
                bg-[var(--navy-deepest)] dark:bg-[var(--navy-surface)]
                text-white
                py-24 md:py-32 px-5 md:px-8
                transition-colors duration-700 ease-editorial
            "
        >
            {/* Decoración: glows */}
            <div
                className="
                    absolute -top-32 -left-32 w-96 h-96 rounded-full
                    bg-[var(--gold)]/10 blur-3xl pointer-events-none
                "
                aria-hidden="true"
            />
            <div
                className="
                    absolute -bottom-40 -right-24 w-[26rem] h-[26rem] rounded-full
                    bg-[var(--maritime)]/15 blur-3xl pointer-events-none
                "
                aria-hidden="true"
            />

            <div className="relative max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14 md:mb-20">
                    <div className="md:col-span-7">
                        <span className="label-caps text-[var(--gold)] flex items-center gap-3 mb-6">
                            <span className="block w-8 h-px bg-[var(--gold)]" />
                            {t("coverage.eyebrow")}
                        </span>
                        <h2 className="
                            text-3xl md:text-5xl lg:text-6xl
                            font-light text-white
                            tracking-tight leading-[1.05] text-balance
                        ">
                            {t("coverage.title")}
                        </h2>
                    </div>
                    <div className="md:col-span-5 md:pt-2">
                        <p className="
                            text-white/65 text-base md:text-lg
                            leading-relaxed font-light text-pretty
                        ">
                            {t("coverage.subtitle")}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
                    {/* Mapa de México con sedes (tableta/escritorio) */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex md:col-span-7 flex-col border border-white/10 bg-white/[0.03] p-6 lg:p-8"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <span className="label-caps text-white/40">
                                {t("coverage.map.label")}
                            </span>
                        </div>

                        <div className="relative flex-1 flex items-center" aria-hidden="true">
                            <svg viewBox={MEXICO_VIEWBOX} className="w-full h-auto">
                                <path
                                    d={MEXICO_PATH}
                                    className="fill-[var(--navy-elevated)] stroke-[rgba(255,255,255,0.16)]"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                                <BaseNode label={t("coverage.base.city")} />
                            </svg>
                        </div>
                    </motion.div>

                    <div className="md:col-span-5 flex flex-col gap-6">
                        <InfoCard label={t("coverage.base.label")} accent>
                            <p className="text-2xl md:text-3xl font-light text-white tracking-tight">
                                {t("coverage.base.city")}
                            </p>
                            <p className="mt-1 text-white/60 font-light">
                                {t("coverage.base.region")}
                            </p>
                        </InfoCard>
                        <InfoCard label={t("coverage.modes.label")}>
                            <ul className="divide-y divide-white/10">
                                {MODES.map(({ key, Icon }) => (
                                    <li key={key} className="flex items-center gap-4 py-3">
                                        <Icon className="w-4 h-4 text-[var(--gold)] shrink-0" strokeWidth={1.5} />
                                        <span className="text-base md:text-lg font-light text-white/85 tracking-tight">
                                            {t(key)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </InfoCard>
                    </div>
                </div>
            </div>
        </section>
    );
};
