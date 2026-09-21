import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/common";
import { API_URL, CONTACT_INFO, SCHEDULE } from "../config/constants";
import { useLanguage } from "../contexts/LanguageContext";

export const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json().catch(() => ({}));
            if (response.ok && data.success !== false) {
                setSubmitStatus({ type: "success", message: t("contactPage.success") });
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.message || t("contactPage.error"),
                });
            }
        } catch (err) {
            setSubmitStatus({ type: "error", message: t("contactPage.error") });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Phone,
            title: t("contactPage.info.phone"),
            value: CONTACT_INFO.phone,
        },
        {
            icon: Mail,
            title: t("contactPage.info.email"),
            value: CONTACT_INFO.email,
        },
        {
            icon: MapPin,
            title: t("contactPage.info.location"),
            value: `${CONTACT_INFO.location.city}, ${CONTACT_INFO.location.state}`,
            extra: CONTACT_INFO.location.country,
        },
    ];

    return (
        <div className="bg-[var(--paper)] text-[var(--ink)]">
            <PageHero
                eyebrow={t("nav.contact")}
                title={t("contactPage.hero.title")}
                subtitle={t("contactPage.hero.subtitle")}
            />

            <section className="py-24 md:py-28 px-5 md:px-8">
                <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="md:col-span-5 space-y-8"
                    >
                        <div>
                            <span className="label-caps text-[var(--gold)] flex items-center gap-3 mb-4">
                                <span className="block w-8 h-px bg-[var(--gold)]" />
                                {t("contactPage.info.title")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-light text-[var(--ink)] tracking-tight leading-[1.1] text-balance">
                                {t("contactPage.info.title")}
                            </h2>
                            <p className="mt-5 text-[var(--ink-soft)] font-light leading-relaxed text-pretty">
                                {t("contactPage.info.body")}
                            </p>
                        </div>

                        <div className="space-y-5 pt-4">
                            {contactInfo.map(({ icon: Icon, title, value, extra }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-4 pb-5 border-b border-[var(--line-soft)]"
                                >
                                    <div className="w-11 h-11 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shrink-0">
                                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="label-caps text-[var(--ink-muted)] mb-1.5">
                                            {title}
                                        </h3>
                                        <p className="text-[var(--ink)]">{value}</p>
                                        {extra && (
                                            <p className="text-[var(--ink-soft)] text-sm">{extra}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Schedule */}
                        <div className="bg-[var(--paper-warm)] border border-[var(--line-soft)] p-6">
                            <h3 className="label-caps text-[var(--gold)] mb-4">
                                {t("contactPage.schedule.title")}
                            </h3>
                            <div className="space-y-3 text-sm text-[var(--ink-soft)]">
                                <div className="flex justify-between gap-4 pb-3 border-b border-[var(--line-soft)]">
                                    <span className="font-medium text-[var(--ink)]">
                                        {t("contactPage.schedule.weekdays")}
                                    </span>
                                    <span>{SCHEDULE.weekday}</span>
                                </div>
                                <div className="flex justify-between gap-4 pb-3 border-b border-[var(--line-soft)]">
                                    <span className="font-medium text-[var(--ink)]">
                                        {t("contactPage.schedule.saturday")}
                                    </span>
                                    <span>{SCHEDULE.saturday}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="font-medium text-[var(--ink)]">
                                        {t("contactPage.schedule.sunday")}
                                    </span>
                                    <span>{SCHEDULE.sunday}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="md:col-span-7 bg-[var(--paper-warm)] border border-[var(--line-soft)] p-7 md:p-10 space-y-7"
                    >
                        <span className="label-caps text-[var(--gold)] block mb-2">
                            {t("contactPage.form.title")}
                        </span>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="field">
                                <label htmlFor="name" className="field-label">
                                    {t("contactPage.form.name")} *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="—"
                                    className="field-input"
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="phone" className="field-label">
                                    {t("contactPage.form.phone")}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="—"
                                    className="field-input"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="email" className="field-label">
                                {t("contactPage.form.email")} *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="—"
                                className="field-input"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="message" className="field-label">
                                {t("contactPage.form.message")} *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="—"
                                className="field-input resize-none"
                            />
                        </div>

                        {submitStatus.message && (
                            <div
                                className={`text-sm border-l-2 pl-4 py-3 ${
                                    submitStatus.type === "success"
                                        ? "border-[var(--feedback-success)] text-[var(--feedback-successText)] bg-[var(--feedback-successBg)]"
                                        : "border-[var(--feedback-error)] text-[var(--feedback-errorText)] bg-[var(--feedback-errorBg)]"
                                }`}
                            >
                                {submitStatus.message}
                            </div>
                        )}

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-xs text-[var(--ink-muted)]">
                                {t("contactPage.form.required")}
                            </p>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 bg-[var(--navy-deep)] text-white px-7 h-12 label-caps hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors duration-300 disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? t("contactPage.form.sending")
                                    : t("contactPage.form.submit")}
                                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>
        </div>
    );
};
