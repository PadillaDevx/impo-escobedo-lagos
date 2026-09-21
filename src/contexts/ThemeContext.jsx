import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const STORAGE_KEY = "impo-theme";
const VALID_THEMES = ["light", "dark"];
const DEFAULT_THEME = "light";

const ThemeContext = createContext({
    theme: DEFAULT_THEME,
    isDark: false,
    setTheme: () => {},
    toggleTheme: () => {},
});

const detectInitialTheme = () => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && VALID_THEMES.includes(stored)) return stored;
    } catch (_) {
        // Ignorar
    }
    return DEFAULT_THEME;
};

const applyThemeClass = (theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
    // Color del navegador
    root.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(detectInitialTheme);

    useEffect(() => {
        applyThemeClass(theme);
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (_) {
            // Ignorar
        }
    }, [theme]);

    const setTheme = useCallback((next) => {
        if (VALID_THEMES.includes(next)) setThemeState(next);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    const value = useMemo(
        () => ({
            theme,
            isDark: theme === "dark",
            setTheme,
            toggleTheme,
        }),
        [theme, setTheme, toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme debe usarse dentro de ThemeProvider");
    }
    return ctx;
};
