import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, FileText } from "lucide-react";
import { PageHero, LoadingSpinner, ErrorMessage } from "../components/common";
import { API_URL } from "../config/constants";
import { useLanguage } from "../contexts/LanguageContext";

export const Blog = () => {
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/news`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(Array.isArray(data) ? data : []);
                } else {
                    setError("No se pudieron cargar las noticias");
                    setPosts([]);
                }
            } catch (err) {
                setError("Error de conexión con el servidor");
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const dateLocale = lang === "en" ? "en-US" : "es-MX";

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)]">
            <PageHero
                eyebrow={t("nav.blog")}
                title={t("blogPage.hero.title")}
                subtitle={t("blogPage.hero.subtitle")}
            />

            <section className="py-24 md:py-28 px-5 md:px-8">
                <div className="max-w-[1280px] mx-auto">
                    {isLoading ? (
                        <LoadingSpinner message={t("blogPage.loading")} />
                    ) : error ? (
                        <ErrorMessage message={error} />
                        ) : posts.length === 0 ? (
                        <div className="border border-dashed border-[var(--line)] py-20 px-8 text-center">
                            <FileText
                                className="w-12 h-12 mx-auto text-[var(--ink-soft)] mb-4"
                                strokeWidth={1.2}
                            />
                            <p className="text-[var(--ink-soft)] text-lg mb-4">
                                {t("blogPage.empty")}
                            </p>
                            <Link
                                to="/contacto"
                                className="inline-flex items-center gap-2 label-caps text-[var(--gold)] hover:text-[var(--gold-dark)] link-underline"
                            >
                                {t("nav.contact")}
                                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.08, duration: 0.6 }}
                                    onClick={() => navigate(`/blog/${post._id}`)}
                                    className="group bg-[var(--paper-warm)] border border-[var(--line-soft)] hover:border-[var(--gold)] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Link to={`/blog/${post._id}`} className="block relative h-52 overflow-hidden bg-[var(--navy-deep)]">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[var(--navy-deep)] via-[var(--navy-surface)] to-[var(--maritime)]" />
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2.5 py-1 bg-[var(--gold)] text-[var(--navy-deep)] label-caps text-[9px]">
                                                {post.category}
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="p-6 md:p-7">
                                        <div className="flex items-center gap-4 label-caps text-[var(--ink-muted)] mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" strokeWidth={1.5} />
                                                {new Date(post.createdAt).toLocaleDateString(
                                                    dateLocale,
                                                    { year: "numeric", month: "short", day: "numeric" }
                                                )}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-[1.4rem] font-light text-[var(--ink)] tracking-tight mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors text-balance">
                                            {post.title}
                                        </h3>
                                        <p className="text-[var(--ink-soft)] text-[15px] font-light leading-relaxed line-clamp-3 text-pretty">
                                            {post.excerpt}
                                        </p>
                                        <span className="mt-5 inline-flex items-center gap-2 label-caps text-[var(--gold)] group-hover:text-[var(--gold-dark)] transition-colors">
                                            {t("blogPage.readMore")}
                                            <ArrowUpRight
                                                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                strokeWidth={1.5}
                                            />
                                        </span>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
