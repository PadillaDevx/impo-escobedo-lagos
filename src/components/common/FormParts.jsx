import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { whatsappLink } from "../../config/constants";

/**
 * Campo trampa anti-spam: invisible para personas, los bots lo llenan.
 * El servidor descarta en silencio cualquier envío que lo traiga lleno.
 */
export const HoneypotField = () => (
    <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
    >
        <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
    </div>
);

/** Mensaje de éxito / error del formulario, con WhatsApp como alternativa. */
export const FormStatus = ({ status }) => {
    const { t } = useLanguage();
    if (!status.message) return null;
    const ok = status.type === "success";

    return (
        <div
            role={ok ? "status" : "alert"}
            className={`text-sm border-l-2 pl-4 py-3 ${
                ok
                    ? "border-[var(--feedback-success)] text-[var(--feedback-successText)] bg-[var(--feedback-successBg)]"
                    : "border-[var(--feedback-error)] text-[var(--feedback-errorText)] bg-[var(--feedback-errorBg)]"
            }`}
        >
            {status.message}
            {status.fallback && (
                <>
                    {" "}
                    <a
                        href={whatsappLink(t("whatsapp.message"))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-medium"
                    >
                        {t("contactPage.error.whatsapp")}
                    </a>
                </>
            )}
        </div>
    );
};

/** Nota de consentimiento con enlace al aviso de privacidad. */
export const ConsentNote = () => {
    const { t } = useLanguage();
    return (
        <p className="text-xs text-[var(--ink-muted)] leading-relaxed max-w-sm">
            {t("contactPage.form.consent")}{" "}
            <Link to="/aviso-de-privacidad" className="underline hover:text-[var(--gold)]">
                {t("contactPage.form.privacyLink")}
            </Link>
            .
        </p>
    );
};
