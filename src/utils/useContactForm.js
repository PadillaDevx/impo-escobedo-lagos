import { useRef, useState } from "react";
import { API_URL } from "../config/constants";
import { useLanguage } from "../contexts/LanguageContext";

const REQUEST_TIMEOUT_MS = 15000;

/**
 * Lógica compartida de los formularios de contacto.
 * - Envía a /api/contact (Cloudflare Pages Function).
 * - Incluye el campo trampa `website` y el tiempo de llenado (`elapsedMs`)
 *   que el servidor usa para descartar bots.
 * - Traduce los errores a mensajes amables.
 */
export const useContactForm = (initialValues) => {
    const { t } = useLanguage();
    const [form, setForm] = useState(initialValues);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);
    const startedAt = useRef(Date.now());

    const update = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        const website = e.currentTarget.elements.website?.value || "";

        setLoading(true);
        setStatus({ type: "", message: "" });

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    website,
                    elapsedMs: Date.now() - startedAt.current,
                }),
                signal: controller.signal,
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok && data.ok) {
                setStatus({ type: "success", message: t("contactPage.success") });
                setForm(initialValues);
                startedAt.current = Date.now();
            } else if (data.code === "invalid") {
                setStatus({ type: "error", message: t("contactPage.error.invalid") });
            } else {
                setStatus({ type: "error", message: t("contactPage.error"), fallback: true });
            }
        } catch (_) {
            setStatus({ type: "error", message: t("contactPage.error"), fallback: true });
        } finally {
            clearTimeout(timer);
            setLoading(false);
        }
    };

    return { form, update, status, loading, submit };
};
