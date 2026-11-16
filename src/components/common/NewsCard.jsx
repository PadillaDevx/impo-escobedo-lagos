import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { formatNewsDate } from "../../utils/useNews";

/** Tarjeta de una publicación oficial (título tal cual, con fuente y enlace). */
export const NewsCard = ({ item, compact = false }) => {
    const { t, lang } = useLanguage();

    return (
        <article
            className={`
                group relative flex flex-col gap-4 h-full
                bg-[var(--paper)] border border-[var(--line-soft)]
                hover:border-[var(--gold)] transition-colors duration-300
                ${compact ? "p-6" : "p-6 md:p-8"}
            `}
        >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <time dateTime={item.date} className="label-caps text-[var(--gold-text)]">
                    {formatNewsDate(item.date, lang)}
                </time>
                <span className="text-xs px-2 py-0.5 border border-[var(--line)] text-[var(--ink-soft)]">
                    {t(`news.category.${item.category}`)}
                </span>
            </div>

            <h3
                lang="es"
                className={`font-light text-[var(--ink)] leading-snug text-pretty ${
                    compact ? "text-base line-clamp-4" : "text-lg md:text-xl"
                }`}
            >
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0 group-hover:text-[var(--gold-text)] transition-colors"
                >
                    {item.title}
                </a>
            </h3>

            <p className="text-sm text-[var(--ink-muted)]">{item.agency}</p>

            <div className="mt-auto pt-4 border-t border-[var(--line-soft)] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[var(--ink-muted)]">
                    {t("news.source")}: {item.sourceName}
                </span>
                <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 label-caps text-[var(--ink)] group-hover:text-[var(--gold-text)]">
                        {t("news.view")}
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                </div>
            </div>
        </article>
    );
};
