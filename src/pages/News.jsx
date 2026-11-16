import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { PageHero } from "../components/common";
import { NewsCard } from "../components/common/NewsCard";
import { useLanguage } from "../contexts/LanguageContext";
import { useNews, NEWS_CATEGORIES, formatNewsDate } from "../utils/useNews";

const PAGE_SIZE = 12;

export const News = () => {
    const { t, lang } = useLanguage();
    const { status, items, updatedAt } = useNews();
    const [category, setCategory] = useState("all");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const available = useMemo(
        () => NEWS_CATEGORIES.filter((c) => items.some((i) => i.category === c)),
        [items]
    );
    const filtered = useMemo(
        () => (category === "all" ? items : items.filter((i) => i.category === category)),
        [items, category]
    );

    const chip = (id, label) => (
        <button
            key={id}
            type="button"
            onClick={() => {
                setCategory(id);
                setVisible(PAGE_SIZE);
            }}
            aria-pressed={category === id}
            className={`px-4 h-10 text-sm border transition-colors ${
                category === id
                    ? "bg-[var(--navy-deep)] text-white border-[var(--navy-deep)] dark:bg-[var(--gold)] dark:text-[var(--navy-deepest)] dark:border-[var(--gold)]"
                    : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--gold)]"
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)]">
            <PageHero
                eyebrow={t("nav.news")}
                title={t("newsPage.title")}
                subtitle={t("newsPage.subtitle")}
            />

            <section className="py-16 md:py-24 px-5 md:px-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex items-start gap-4 border-l-2 border-[var(--gold)] bg-[var(--paper-warm)] p-5 md:p-6 mb-10">
                        <Info className="w-5 h-5 text-[var(--gold-text)] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="text-sm text-[var(--ink-soft)] leading-relaxed space-y-1">
                            <p>{t("news.disclaimer")}</p>
                            {lang === "en" && <p>{t("news.languageNote")}</p>}
                            {updatedAt && (
                                <p className="text-[var(--ink-muted)]">
                                    {t("news.updated")}: {formatNewsDate(updatedAt.slice(0, 10), lang)}
                                </p>
                            )}
                        </div>
                    </div>

                    {status === "ready" && items.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={t("news.filter")}>
                            {chip("all", t("news.all"))}
                            {available.map((c) => chip(c, t(`news.category.${c}`)))}
                        </div>
                    )}

                    {status === "loading" && (
                        <p className="label-caps text-[var(--ink-muted)] py-16 text-center">{t("news.loading")}</p>
                    )}
                    {status === "error" && (
                        <p className="text-[var(--ink-soft)] py-16 text-center">{t("news.error")}</p>
                    )}
                    {status === "ready" && filtered.length === 0 && (
                        <p className="text-[var(--ink-soft)] py-16 text-center">{t("news.empty")}</p>
                    )}

                    {filtered.length > 0 && (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.slice(0, visible).map((item) => (
                                    <NewsCard key={item.id} item={item} />
                                ))}
                            </div>
                            {visible < filtered.length && (
                                <div className="mt-12 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                                        className="inline-flex items-center gap-2 border border-[var(--ink)] dark:border-white/40 px-7 h-12 label-caps text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold-text)] transition-colors"
                                    >
                                        {t("news.more")}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};
