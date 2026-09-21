import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Calendar } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { API_URL } from "../../config/constants";

export const BlogPreview = () => {
    const { t } = useLanguage();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/news`);
                if (response.ok) {
                    const data = await response.json();
                    const list = Array.isArray(data) ? data : [];
                    setPosts(list.slice(0, 3));
                } else {
                    setPosts([]);
                }
            } catch (err) {
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <section className="relative bg-[var(--paper)] py-24 md:py-28 px-5 md:px-8 border-t border-[var(--line-soft)]">
            <div className="max-w-[1280px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <span className="label-caps text-[var(--gold)] flex items-center gap-3 mb-4">
                            <span className="block w-8 h-px bg-[var(--gold)]" />
                            {t("nav.blog")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light text-[var(--ink)] tracking-tight leading-[1.1] max-w-2xl text-balance">
                            {t("blogPage.hero.subtitle")}
                        </h2>
                    </div>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 label-caps text-[var(--ink)] hover:text-[var(--gold)] link-underline shrink-0"
                    >
                        {t("blogPage.viewAll")}
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </Link>
                </div>

                {/* Contenido */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-10 h-10 border border-[var(--ink-faint)] border-t-[var(--gold)] rounded-full animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="border border-dashed border-[var(--line)] py-16 px-8 text-center">
                        <FileText
                            className="w-10 h-10 mx-auto text-[var(--ink-soft)] mb-4"
                            strokeWidth={1.2}
                        />
                        <p className="text-[var(--ink-soft)] text-base">{t("blogPage.empty")}</p>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 mt-5 label-caps text-[var(--gold)] hover:text-[var(--gold-dark)] link-underline"
                        >
                            {t("blogPage.viewAll")}
                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, idx) => (
                            <motion.article
                                key={post._id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="group flex flex-col"
                            >
                                <Link
                                    to={`/blog/${post._id}`}
                                    className="block relative h-56 overflow-hidden bg-[var(--navy-deep)] mb-5"
                                >
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

                                <div className="flex items-center gap-4 label-caps text-[var(--ink-muted)] mb-3">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" strokeWidth={1.5} />
                                        {new Date(post.createdAt).toLocaleDateString(
                                            t("lang.short") === "EN" ? "en-US" : "es-MX",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-[1.4rem] font-light text-[var(--ink)] tracking-tight mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors text-balance">
                                    <Link to={`/blog/${post._id}`}>{post.title}</Link>
                                </h3>
                                <p className="text-[var(--ink-soft)] text-[15px] font-light leading-relaxed line-clamp-3 text-pretty">
                                    {post.excerpt}
                                </p>
                                <Link
                                    to={`/blog/${post._id}`}
                                    className="mt-4 inline-flex items-center gap-2 label-caps text-[var(--gold)] hover:text-[var(--gold-dark)] link-underline self-start"
                                >
                                    {t("blogPage.readMore")}
                                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
