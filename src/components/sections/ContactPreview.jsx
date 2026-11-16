import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { CONTACT_INFO } from "../../config/constants";
import { useContactForm } from "../../utils/useContactForm";
import { HoneypotField, FormStatus, ConsentNote } from "../common/FormParts";

const INITIAL = {
    name: "",
    company: "",
    email: "",
    interest: "import",
    message: "",
};

const INTERESTS = ["import", "export", "logistics", "trade", "other"];

export const ContactPreview = () => {
    const { t } = useLanguage();
    const { form, update, status, loading, submit } = useContactForm(INITIAL);

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
                                        href={`mailto:${CONTACT_INFO.email}`}
                                        className="link-underline text-[var(--ink)]"
                                    >
                                        {CONTACT_INFO.email}
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href={CONTACT_INFO.phoneHref}
                                        className="link-underline text-[var(--ink)]"
                                    >
                                        {CONTACT_INFO.phone}
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
                        className="relative md:col-span-7 space-y-7 bg-[var(--paper)] p-7 md:p-10 border border-[var(--line-soft)]"
                    >
                        <HoneypotField />
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
                                    {INTERESTS.map((key) => (
                                        <option key={key} value={key}>
                                            {t(`contact.interest.${key}`)}
                                        </option>
                                    ))}
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
                                required
                                minLength={10}
                                maxLength={2000}
                                placeholder={t("contact.fields.message.placeholder")}
                                className="field-input resize-none"
                            />
                        </div>

                        <FormStatus status={status} />

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <ConsentNote />
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
