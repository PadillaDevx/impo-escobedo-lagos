import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { MEXICO_PATH, MEXICO_VIEWBOX } from "./mexicoMap";

const OPERATION = [
    { id: "nuevoLaredo", x: 575.6, y: 231.2, anchor: "start", dx: 14, dy: 6 },
    { id: "reynosa", x: 614.7, y: 278, anchor: "end", dx: -14, dy: 6 },
    { id: "matamoros", x: 638.8, y: 285.7, anchor: "start", dx: 14, dy: 6 },
    { id: "mexicali", x: 105.7, y: 35.1, anchor: "start", dx: 14, dy: 6 },
];

const CORRESPONDENTS = [
    { id: "colombiaNl", x: 564.4, y: 219.8, anchor: "end", dx: -14, dy: 6 },
    { id: "altamira", x: 631.2, y: 403.3, anchor: "start", dx: 14, dy: 6 },
    { id: "veracruz", x: 690.6, y: 513.6, anchor: "start", dx: 14, dy: 6 },
    { id: "manzanillo", x: 424.2, y: 521.1, anchor: "end", dx: -14, dy: 6 },
];

const NodeLabel = ({ node, label, fill }) => (
    <text
        x={node.x + node.dx}
        y={node.y + node.dy}
        textAnchor={node.anchor}
        fontSize="19"
        letterSpacing="2"
        fontWeight="500"
        className={`hidden md:block ${fill}`}
    >
        {label.toUpperCase()}
    </text>
);

const OperationNode = ({ node, label }) => (
    <g className="group">
        <circle
            cx={node.x}
            cy={node.y}
            r={14}
            className="fill-[var(--gold)] opacity-20 transition-opacity duration-300 group-hover:opacity-45"
        />
        <circle cx={node.x} cy={node.y} r={7} className="fill-[var(--gold)]" />
        <NodeLabel node={node} label={label} fill="fill-[rgba(255,255,255,0.78)]" />
    </g>
);

const CorrespondentNode = ({ node, label }) => (
    <g className="group">
        <circle
            cx={node.x}
            cy={node.y}
            r={14}
            className="fill-[var(--maritime)] opacity-25 transition-opacity duration-300 group-hover:opacity-50"
        />
        <circle
            cx={node.x}
            cy={node.y}
            r={7}
            className="fill-[var(--navy-deepest)] stroke-[var(--navy-fixed)]"
            strokeWidth={1.5}
        />
        <NodeLabel node={node} label={label} fill="fill-[rgba(255,255,255,0.62)]" />
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

                        <div className="relative flex-1 flex items-center" aria-hidden="true">
                            <svg viewBox={MEXICO_VIEWBOX} className="w-full h-auto">
                                <path
                                    d={MEXICO_PATH}
                                    className="fill-[var(--navy-elevated)] stroke-[rgba(255,255,255,0.16)]"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
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
