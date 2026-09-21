import { useLanguage } from "../../contexts/LanguageContext";
import {
    TOGGLE_TRACK,
    TOGGLE_THUMB_BASE,
    TOGGLE_PHANTOM_TEXT,
} from "./toggleStyles";

export const LanguageToggle = ({ className = "" }) => {
    const { lang, toggleLang, t } = useLanguage();
    const isEs = lang === "es";
    const label = `${t("lang.label")}: ${t("lang.name")}`;

    return (
        <button
            type="button"
            onClick={toggleLang}
            aria-label={label}
            aria-pressed={!isEs}
            title={t("lang.name")}
            className={`${TOGGLE_TRACK} ${className}`}
        >
            {/* Texto del track: idioma al que se cambiaría */}
            {!isEs ? (
                <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wider pointer-events-none ${TOGGLE_PHANTOM_TEXT}`}>
                    ES
                </span>
            ) : (
                <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wider pointer-events-none ${TOGGLE_PHANTOM_TEXT}`}>
                    EN
                </span>
            )}

            {/* Thumb dorado con el idioma ACTUAL en texto navy bold */}
            <span className={`${TOGGLE_THUMB_BASE} ${isEs ? "left-[3px]" : "left-[33px]"}`}>
                <span className="text-[10px] font-bold tracking-wider text-[var(--navy-deepest)] leading-none">
                    {isEs ? "ES" : "EN"}
                </span>
                <span className="sr-only">{t("lang.name")}</span>
            </span>
        </button>
    );
};
