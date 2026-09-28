import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

// Esquema de cobertura (posición sobre el lienzo, no coordenadas geográficas)
const OPERATION = [
    { id: "nuevoLaredo", x: 272, y: 66, anchor: "start", dx: 12, dy: 4 },
    { id: "reynosa", x: 348, y: 96, anchor: "start", dx: 12, dy: 4 },
    { id: "matamoros", x: 390, y: 132, anchor: "end", dx: -12, dy: 4 },
    { id: "mexicali", x: 72, y: 120, anchor: "start", dx: 12, dy: 4 },
];

const CORRESPONDENTS = [
    { id: "colombiaNl", x: 296, y: 152, anchor: "start", dx: 12, dy: 4 },
    { id: "altamira", x: 378, y: 226, anchor: "end", dx: -12, dy: 4 },
    { id: "veracruz", x: 326, y: 264, anchor: "end", dx: -12, dy: 4 },
    { id: "manzanillo", x: 128, y: 286, anchor: "start", dx: 12, dy: 4 },
];

const OperationNode = ({ node, label }) => (
    <g>
        <circle cx={node.x} cy={node.y} r={11} className="fill-[var(--gold)] opacity-20" />
        <circle cx={node.x} cy={node.y} r={4.5} className="fill-[var(--gold)]" />
        <text
            x={node.x + node.dx}
            y={node.y + node.dy}
            textAnchor={node.anchor}
            fontSize="10"
            letterSpacing="1.5"
            fontWeight="500"
            className="fill-[rgba(255,255,255,0.78)]"
        >
            {label.toUpperCase()}
        </text>
    </g>
);

const CorrespondentNode = ({ node, label }) => (
    <g>
        <circle cx={node.x} cy={node.y} r={11} className="fill-[var(--maritime)] opacity-25" />
        <circle
            cx={node.x}
            cy={node.y}
            r={4.5}
            className="fill-[var(--navy-deepest)] stroke-[var(--navy-fixed)]"
            strokeWidth={1.5}
        />
        <text
            x={node.x + node.dx}
            y={node.y + node.dy}
            textAnchor={node.anchor}
            fontSize="10"
            letterSpacing="1.5"
            fontWeight="500"
            className="fill-[rgba(255,255,255,0.62)]"
        >
            {label.toUpperCase()}
        </text>
    </g>
);

const LocationCard = ({ labelKey, items, variant }) => {
    const { t } = useLanguage();
    const isOperation = variant === "operation";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`
                bg-white/[0.04] p-6 md:p-7 border-t-2
                ${isOperation ? "border-[var(--gold)]" : "border-[var(--maritime)]"}
            `}
        >
            <div className="flex items-start justify-between mb-5">
                <h3
                    className={`label-caps flex items-center gap-3 ${
                        isOperation ? "text-[var(--gold)]" : "text-[var(--navy-fixed)]"
                    }`}
                >
                    <span
                        className={`block w-2.5 h-2.5 shrink-0 ${
                            isOperation
                                ? "bg-[var(--gold)]"
                                : "border border-[var(--navy-fixed)] rounded-full"
                        }`}
                    />
                    {t(labelKey)}
                </h3>
                <span className="text-3xl md:text-4xl font-light leading-none text-white/20">
                    0{items.length}
                </span>
            </div>

            <ul className="divide-y divide-white/10">
                {items.map((item, idx) => (
                    <li key={item.id} className="flex items-center gap-4 py-3">
                        <span className="label-caps text-[10px] text-white/35 w-6 shrink-0">
                            0{idx + 1}
                        </span>
                        <span className="text-base md:text-lg font-light text-white/85 tracking-tight">
                            {t(`coverage.city.${item.id}`)}
                        </span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

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
                    {/* Esquema territorial (solo tablet/desktop) */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden md:flex md:col-span-7 flex-col border border-white/10 bg-white/[0.03] p-6 lg:p-8"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <span className="label-caps text-white/40">
                                {t("coverage.map.label")}
                            </span>
                            <div className="flex items-center gap-5">
                                <span className="flex items-center gap-2 label-caps text-[10px] text-[var(--gold)]">
                                    <span className="block w-2 h-2 bg-[var(--gold)]" />
                                    {t("coverage.operation.label")}
                                </span>
                                <span className="flex items-center gap-2 label-caps text-[10px] text-[var(--navy-fixed)]">
                                    <span className="block w-2 h-2 border border-[var(--navy-fixed)] rounded-full" />
                                    {t("coverage.correspondent.label")}
                                </span>
                            </div>
                        </div>

                        <div
                            className="relative flex-1 flex items-center"
                            style={{
                                backgroundImage:
                                    "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                            aria-hidden="true"
                        >
                            <svg viewBox="0 0 480 340" className="w-full h-auto">
                                {OPERATION.map((node) => (
                                    <OperationNode
                                        key={node.id}
                                        node={node}
                                        label={t(`coverage.city.${node.id}`)}
                                    />
                                ))}
                                {CORRESPONDENTS.map((node) => (
                                    <CorrespondentNode
                                        key={node.id}
                                        node={node}
                                        label={t(`coverage.city.${node.id}`)}
                                    />
                                ))}
                            </svg>
                        </div>
                    </motion.div>

                    {/* Listas por categoría */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <LocationCard
                            labelKey="coverage.operation.label"
                            items={OPERATION}
                            variant="operation"
                        />
                        <LocationCard
                            labelKey="coverage.correspondent.label"
                            items={CORRESPONDENTS}
                            variant="correspondent"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
