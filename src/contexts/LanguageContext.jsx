import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { translations, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "../i18n/translations";

const STORAGE_KEY = "impo-lang";

const LanguageContext = createContext({
    lang: DEFAULT_LANGUAGE,
    setLang: () => {},
    toggleLang: () => {},
    t: (key) => key,
});

const detectInitialLang = () => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
    } catch (_) {
        // Ignorar errores de acceso al storage
    }
    return DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLangState] = useState(detectInitialLang);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, lang);
        } catch (_) {
            // Ignorar
        }
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = useCallback((next) => {
        if (SUPPORTED_LANGUAGES.includes(next)) setLangState(next);
    }, []);

    const toggleLang = useCallback(() => {
        setLangState((prev) => (prev === "es" ? "en" : "es"));
    }, []);

    const t = useCallback(
        (key, vars) => {
            const dict = translations[lang] || translations.es;
            let value = dict[key];
            if (value === undefined) value = translations.es[key];
            if (value === undefined) value = key;
            if (vars && typeof value === "string") {
                Object.keys(vars).forEach((k) => {
                    value = value.replace(new RegExp(`{${k}}`, "g"), vars[k]);
                });
            }
            return value;
        },
        [lang]
    );

    const value = useMemo(
        () => ({ lang, setLang, toggleLang, t }),
        [lang, setLang, toggleLang, t]
    );

    return (
        <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage debe usarse dentro de LanguageProvider");
    }
    return ctx;
};
