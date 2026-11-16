import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/common";
import { HoneypotField, FormStatus, ConsentNote } from "../components/common/FormParts";
import { CONTACT_INFO, SCHEDULE } from "../config/constants";
import { useLanguage } from "../contexts/LanguageContext";
import { useContactForm } from "../utils/useContactForm";

const INITIAL = { name: "", email: "", phone: "", message: "" };

export const Contact = () => {
    const { t } = useLanguage();
    const { form: formData, update, status: submitStatus, loading: isSubmitting, submit: handleSubmit } =
        useContactForm(INITIAL);

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
                            <span className="label-caps text-[var(--gold-text)] flex items-center gap-3 mb-4">
                                <span className="block w-8 h-px bg-[var(--gold)]" />
                                {t("contactPage.info.eyebrow")}
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
                                    <div className="w-11 h-11 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold-text)] shrink-0">
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
                            <h3 className="label-caps text-[var(--gold-text)] mb-4">
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
                        className="relative md:col-span-7 bg-[var(--paper-warm)] border border-[var(--line-soft)] p-7 md:p-10 space-y-7"
                    >
                        <span className="label-caps text-[var(--gold-text)] block mb-2">
                            {t("contactPage.form.title")}
                        </span>

                        <HoneypotField />
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
                                    onChange={update("name")}
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
                                    onChange={update("phone")}
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
                                onChange={update("email")}
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
                                onChange={update("message")}
                                required
                                rows={5}
                                minLength={10}
                                maxLength={2000}
                                placeholder="—"
                                className="field-input resize-none"
                            />
                        </div>

                        <FormStatus status={submitStatus} />

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <ConsentNote />
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
