import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../common";
import { NewsCard } from "../common/NewsCard";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNews } from "../../utils/useNews";

/** Últimas 3 publicaciones oficiales en la página de inicio. */
export const NewsPreview = () => {
    const { t } = useLanguage();
    const { status, items } = useNews();

    // Si no hay noticias (o falló la carga), la sección no se muestra.
    if (status !== "ready" || items.length === 0) return null;

    return (
        <section id="noticias" className="relative bg-[var(--paper)] py-24 md:py-32 px-5 md:px-8">
            <div className="max-w-[1280px] mx-auto">
                <SectionHeading
                    eyebrow={t("nav.news")}
                    title={t("newsHome.title")}
                    subtitle={t("newsHome.subtitle")}
                />

                <div className="grid md:grid-cols-3 gap-6">
                    {items.slice(0, 3).map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                        >
                            <NewsCard item={item} compact />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/noticias"
                        className="inline-flex items-center gap-2 label-caps text-[var(--ink)] hover:text-[var(--gold-text)] link-underline"
                    >
                        {t("news.viewAll")}
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
