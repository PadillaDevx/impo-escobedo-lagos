import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { LoadingSpinner, ErrorMessage } from "../components/common";
import { API_URL } from "../config/constants";
import { useLanguage } from "../contexts/LanguageContext";

export const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/news/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNews(data);
                } else if (response.status === 404) {
                    setError(lang === "en" ? "News not found" : "Noticia no encontrada");
                } else {
                    setError(lang === "en" ? "Error loading news" : "Error al cargar la noticia");
                }
            } catch (err) {
                setError(t("error.connection"));
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [id, lang, t]);

    const dateLocale = lang === "en" ? "en-US" : "es-MX";

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 bg-[var(--paper)] flex items-center justify-center">
                <LoadingSpinner message={t("blogPage.loading")} />
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen pt-32 bg-[var(--paper)] flex items-center justify-center px-5">
                <ErrorMessage message={error || t("blogPage.empty")}>
                    <button
                        onClick={() => navigate("/blog")}
                        className="mt-4 inline-flex items-center gap-2 label-caps text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                        {t("newsDetail.back")}
                    </button>
                </ErrorMessage>
            </div>
        );
    }

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)] min-h-screen">
            <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-32 pb-12">
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/blog")}
                    className="inline-flex items-center gap-2 label-caps text-[var(--ink-muted)] hover:text-[var(--gold)] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    {t("newsDetail.back")}
                </motion.button>
            </div>

            <article className="max-w-4xl mx-auto px-5 md:px-8 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--gold)]/10 text-[var(--gold)] label-caps text-[10px]">
                            <Tag className="w-3 h-3" strokeWidth={1.5} />
                            {news.category}
                        </span>
                        <span className="inline-flex items-center gap-2 text-[var(--ink-muted)] text-xs tracking-wider">
                            <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                            {new Date(news.createdAt).toLocaleDateString(dateLocale, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>

                    {/* Título */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[var(--ink)] tracking-tight leading-[1.05] mb-8 text-balance">
                        {news.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-lg md:text-xl text-[var(--ink-soft)] font-light leading-relaxed pb-8 mb-10 border-b border-[var(--line-soft)] text-pretty">
                        {news.excerpt}
                    </p>
                </motion.div>

                {/* Imagen */}
                {news.imageUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mb-12 overflow-hidden bg-[var(--navy-deep)] border border-[var(--line-soft)]"
                    >
                        <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </motion.div>
                )}

                {/* Contenido */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="space-y-5 text-[var(--ink-soft)] text-base md:text-[17px] leading-[1.75] font-light"
                >
                    {news.content
                        .split("\n")
                        .map((paragraph, index) =>
                            paragraph.trim() ? (
                                <p key={index} className="text-pretty">
                                    {paragraph}
                                </p>
                            ) : null
                        )}
                </motion.div>

                {/* Autor */}
                <div className="mt-14 pt-8 border-t border-[var(--line-soft)]">
                    <p className="text-[var(--ink-muted)] text-sm">
                        <span className="label-caps text-[var(--ink)] mr-2">
                            {t("newsDetail.publishedBy")}:
                        </span>
                        {news.author || t("newsDetail.author")}
                    </p>
                </div>

                {/* Back button */}
                <div className="mt-10">
                    <button
                        onClick={() => navigate("/blog")}
                        className="inline-flex items-center gap-2 bg-[var(--navy-deep)] text-white px-6 h-12 label-caps hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                        {t("newsDetail.back")}
                    </button>
                </div>
            </article>
        </div>
    );
};
