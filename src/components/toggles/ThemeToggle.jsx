import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import {
    TOGGLE_TRACK,
    TOGGLE_THUMB_BASE,
    TOGGLE_PHANTOM_TEXT,
    SunIcon,
    SunFilled,
    MoonIcon,
    MoonFilled,
} from "./toggleStyles";

export const ThemeToggle = ({ className = "" }) => {
    const { isDark, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const label = isDark ? t("theme.toggle.toLight") : t("theme.toggle.toDark");

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={label}
            aria-pressed={isDark}
            title={label}
            className={`${TOGGLE_TRACK} ${className}`}
        >
            {/* Icono del track: opción a la que se cambiaría al hacer click */}
            {isDark ? (
                <SunIcon className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${TOGGLE_PHANTOM_TEXT}`} />
            ) : (
                <MoonIcon className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${TOGGLE_PHANTOM_TEXT}`} />
            )}

            {/* Thumb dorado con el icono de la selección ACTUAL */}
            <span className={`${TOGGLE_THUMB_BASE} ${isDark ? "left-[33px]" : "left-[3px]"}`}>
                {isDark ? (
                    <MoonFilled className="w-4 h-4" />
                ) : (
                    <SunFilled className="w-4 h-4" />
                )}
                <span className="sr-only">{label}</span>
            </span>
        </button>
    );
};
