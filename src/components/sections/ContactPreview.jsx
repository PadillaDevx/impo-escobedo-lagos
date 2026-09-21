import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { API_URL } from "../../config/constants";

const INITIAL = {
    name: "",
    company: "",
    email: "",
    interest: "shipping",
    message: "",
};

export const ContactPreview = () => {
    const { t } = useLanguage();
    const [form, setForm] = useState(INITIAL);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    const update = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    company: form.company,
                    email: form.email,
                    interest: form.interest,
                    message: form.message,
                }),
            });
            const data = await response.json().catch(() => ({}));
            if (response.ok && data.success !== false) {
                setStatus({ type: "success", message: t("contactPage.success") });
                setForm(INITIAL);
            } else {
                setStatus({
                    type: "error",
                    message: data.message || t("contactPage.error"),
                });
            }
        } catch (err) {
            setStatus({ type: "error", message: t("contactPage.error") });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contacto"
            className="relative bg-[var(--paper-soft)] py-24 md:py-32 px-5 md:px-8"
        >
            <div className="max-w-[1100px] mx-auto">
                <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                    {/* Texto lateral */}
                    <div className="md:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="label-caps text-[var(--gold)] flex items-center gap-3 mb-5">
                                <span className="block w-8 h-px bg-[var(--gold)]" />
                                {t("contact.eyebrow")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-light text-[var(--ink)] tracking-tight leading-[1.05] text-balance">
                                {t("contact.title")}
                            </h2>
                            <p className="text-[var(--ink-soft)] text-base md:text-lg font-light leading-relaxed mt-6 text-pretty">
                                {t("contact.subtitle")}
                            </p>

                            <div className="mt-8 pt-8 border-t border-[var(--line-soft)] space-y-2 text-sm text-[var(--ink-soft)]">
                                <p className="label-caps text-[var(--ink-muted)] mb-3">
                                    {t("contact.direct")}
                                </p>
                                <p>
                                    <a
                                        href="mailto:juriesco2013@hotmail.com"
                                        className="link-underline text-[var(--ink)]"
                                    >
                                        juriesco2013@hotmail.com
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href="tel:+523330604534"
                                        className="link-underline text-[var(--ink)]"
                                    >
                                        +52 (333) 060-4534
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        onSubmit={submit}
                        className="md:col-span-7 space-y-7 bg-[var(--paper)] p-7 md:p-10 border border-[var(--line-soft)]"
                    >
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="field">
                                <label htmlFor="cp-name" className="field-label">
                                    {t("contact.fields.name")}
                                </label>
                                <input
                                    id="cp-name"
                                    type="text"
                                    value={form.name}
                                    onChange={update("name")}
                                    required
                                    placeholder={t("contact.fields.name.placeholder")}
                                    className="field-input"
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="cp-company" className="field-label">
                                    {t("contact.fields.company")}
                                </label>
                                <input
                                    id="cp-company"
                                    type="text"
                                    value={form.company}
                                    onChange={update("company")}
                                    placeholder={t("contact.fields.company.placeholder")}
                                    className="field-input"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="cp-email" className="field-label">
                                {t("contact.fields.email")}
                            </label>
                            <input
                                id="cp-email"
                                type="email"
                                value={form.email}
                                onChange={update("email")}
                                required
                                placeholder={t("contact.fields.email.placeholder")}
                                className="field-input"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="cp-interest" className="field-label">
                                {t("contact.fields.interest")}
                            </label>
                            <div className="relative">
                                <select
                                    id="cp-interest"
                                    value={form.interest}
                                    onChange={update("interest")}
                                    className="field-input appearance-none pr-8 cursor-pointer"
                                >
                                    <option value="shipping">
                                        {t("contact.interest.shipping")}
                                    </option>
                                    <option value="land">{t("contact.interest.land")}</option>
                                    <option value="consulting">
                                        {t("contact.interest.consulting")}
                                    </option>
                                    <option value="audit">{t("contact.interest.audit")}</option>
                                </select>
                                <ChevronDown
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-muted)] pointer-events-none"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="cp-message" className="field-label">
                                {t("contact.fields.message")}
                            </label>
                            <textarea
                                id="cp-message"
                                value={form.message}
                                onChange={update("message")}
                                rows={3}
                                placeholder={t("contact.fields.message.placeholder")}
                                className="field-input resize-none"
                            />
                        </div>

                        {status.message && (
                            <div
                                className={`text-sm border-l-2 pl-4 py-2 ${
                                    status.type === "success"
                                        ? "border-[var(--feedback-success)] text-[var(--feedback-successText)] bg-[var(--feedback-successBg)]"
                                        : "border-[var(--feedback-error)] text-[var(--feedback-errorText)] bg-[var(--feedback-errorBg)]"
                                }`}
                            >
                                {status.message}
                            </div>
                        )}

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-xs text-[var(--ink-muted)]">
                                {t("contactPage.form.required")}
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 bg-[var(--navy-deep)] text-white px-7 h-12 label-caps hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors duration-300 disabled:opacity-50"
                            >
                                {loading ? t("contactPage.form.sending") : t("contact.cta")}
                                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};
