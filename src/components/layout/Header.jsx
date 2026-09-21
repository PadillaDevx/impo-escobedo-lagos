import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark } from "../common/BrandMark";
import { ThemeToggle } from "../toggles/ThemeToggle";
import { LanguageToggle } from "../toggles/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

const NAV_ITEMS = [
    { path: "/", key: "nav.home" },
    { path: "/servicios", key: "nav.services" },
    { path: "/nosotros", key: "nav.about" },
    { path: "/blog", key: "nav.blog" },
];

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const linkClass = ({ isActive }) =>
        `relative text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
            isActive
                ? "text-[var(--gold)]"
                : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
        }`;

    return (
        <>
            <header
                className={`
                    fixed top-0 w-full z-50
                    transition-all duration-500 ease-editorial pt-safe
                    bg-[var(--paper)]
                    dark:bg-[var(--navy-deepest)]
                    ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]" : ""}
                `}
            >
                <div className="h-16 md:h-20 max-w-[1280px] mx-auto px-5 md:px-8 flex items-center justify-between">
                    <Link to="/" className="group" aria-label={t("brand.name")}>
                        <BrandMark />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-10">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.path} to={item.path} className={linkClass} end={item.path === "/"}>
                                {({ isActive }) => (
                                    <span className="flex items-center gap-2">
                                        {t(item.key)}
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                                        )}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden sm:flex items-center gap-2">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>

                        <Link
                            to="/contacto"
                            className="
                                hidden md:inline-flex items-center gap-2
                                bg-[var(--gold)]
                                hover:bg-[var(--gold-dark)]
                                text-[var(--navy-deepest)]
                                px-5 h-10
                                text-[10px] tracking-[0.22em] uppercase font-medium
                                transition-all duration-300 ease-editorial
                                border border-[var(--gold)]
                            "
                        >
                            {t("nav.contact")}
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
                        </Link>

                        <button
                            className="
                                lg:hidden inline-flex h-10 w-10 items-center justify-center
                                text-[var(--ink)]
                                dark:text-white
                                border border-[var(--ink-faint)]
                                dark:border-white/20
                            "
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? t("nav.menu.close") : t("nav.menu.open")}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="
                            fixed inset-x-0 top-16 z-40
                            bg-[var(--paper)] dark:bg-[var(--navy-deepest)]
                            border-b border-[var(--line-soft)]
                            shadow-editorial
                            lg:hidden
                        "
                    >
                        <nav
                            className="px-6 py-6 flex flex-col gap-1"
                            aria-label={t("nav.mobileNav.label")}
                        >
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between py-3 border-b border-[var(--line-soft)]
                                         text-[var(--ink)] dark:text-white
                                         ${isActive ? "text-[var(--gold)]" : ""}`
                                    }
                                >
                                    <span className="text-sm tracking-[0.22em] uppercase font-medium">
                                        {t(item.key)}
                                    </span>
                                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                                </NavLink>
                            ))}
                            <Link
                                to="/contacto"
                                onClick={() => setIsOpen(false)}
                                className="
                                    mt-4 inline-flex items-center justify-center gap-2
                                    bg-[var(--gold)] hover:bg-[var(--gold-dark)]
                                    text-[var(--navy-deepest)]
                                    px-5 h-12
                                    text-[11px] tracking-[0.22em] uppercase font-medium
                                "
                            >
                                {t("nav.contact")}
                                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[var(--line-soft)] sm:hidden">
                                <span className="label-caps text-[var(--ink-muted)]">{t("theme.toggle.label")}</span>
                                <ThemeToggle />
                                <span className="label-caps text-[var(--ink-muted)] ml-4">{t("lang.label")}</span>
                                <LanguageToggle />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile bottom nav */}
            <nav
                className="
                    lg:hidden fixed bottom-0 inset-x-0 z-40
                    bg-[var(--paper)]/95 dark:bg-[var(--navy-deepest)]/95
                    backdrop-blur-xl
                    border-t border-[var(--line-soft)]
                    pb-safe
                "
                aria-label={t("nav.mobileNav.label")}
            >
                <div className="flex justify-around items-stretch h-16">
                    <BottomLink to="/" label={t("nav.bottom.home")} icon="home" />
                    <BottomLink to="/servicios" label={t("nav.bottom.services")} icon="services" />
                    <BottomLink to="/nosotros" label={t("nav.bottom.about")} icon="about" />
                    <BottomLink to="/contacto" label={t("nav.bottom.contact")} icon="contact" />
                </div>
            </nav>
        </>
    );
};

const ICONS = {
    home: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1V10z" />
        </svg>
    ),
    services: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3M12 18v3M21 12h-3M6 12H3M18.36 5.64l-2.12 2.12M7.76 16.24l-2.12 2.12M18.36 18.36l-2.12-2.12M7.76 7.76L5.64 5.64" />
        </svg>
    ),
    about: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M4 4h16v16H4z" />
            <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
    ),
    contact: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 7l9 6 9-6" />
        </svg>
    ),
};

const BottomLink = ({ to, label, icon }) => (
    <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
            `relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                    ? "text-[var(--ink)] dark:text-white"
                    : "text-[var(--ink-muted)]"
            }`
        }
    >
        {({ isActive }) => (
            <>
                <span
                    className={`absolute top-0 h-0.5 w-10 transition-all ${
                        isActive ? "bg-[var(--gold)]" : "bg-transparent"
                    }`}
                />
                {ICONS[icon]}
                <span className="text-[9px] tracking-[0.18em] uppercase">{label}</span>
            </>
        )}
    </NavLink>
);
