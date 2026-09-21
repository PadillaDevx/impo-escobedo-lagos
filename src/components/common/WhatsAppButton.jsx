import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const PHONE = "523330604534";
const MSG_ES = "Hola, me gustaría recibir asesoría sobre sus servicios de logística y comercio internacional.";
const MSG_EN = "Hello, I would like to receive advisory on your logistics and international trade services.";

// Icono oficial de WhatsApp (path oficial del logo)
const WhatsAppIcon = ({ className = "w-7 h-7" }) => (
    <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.385.7 4.61 1.902 6.479L4 29l7.737-1.85A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.6c-1.79 0-3.485-.5-4.94-1.362l-.354-.213-4.594 1.1 1.123-4.475-.231-.367A9.575 9.575 0 0 1 6.4 15c0-5.302 4.298-9.6 9.6-9.6 5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6zm5.548-7.245c-.302-.151-1.787-.882-2.064-.982-.277-.1-.479-.151-.681.151-.202.302-.781.982-.958 1.184-.176.202-.353.227-.655.076-.302-.151-1.274-.47-2.428-1.498-.898-.801-1.504-1.79-1.681-2.092-.176-.302-.019-.466.133-.617.136-.135.302-.353.453-.53.151-.176.202-.302.302-.504.1-.202.05-.378-.025-.53-.076-.151-.681-1.638-.933-2.243-.246-.59-.497-.51-.681-.519l-.581-.011a1.12 1.12 0 0 0-.807.378c-.277.302-1.058 1.034-1.058 2.522 0 1.488 1.084 2.924 1.235 3.126.151.202 2.134 3.257 5.17 4.568.722.312 1.286.499 1.726.638.726.231 1.386.198 1.908.12.582-.087 1.787-.73 2.039-1.436.252-.706.252-1.31.176-1.436-.076-.126-.277-.202-.58-.353z" />
    </svg>
);

export const WhatsAppButton = () => {
    const [open, setOpen] = useState(false);
    const { t, lang } = useLanguage();
    const text = encodeURIComponent(lang === "en" ? MSG_EN : MSG_ES);
    const href = `https://wa.me/${PHONE}?text=${text}`;

    return (
        <div className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-40">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="
                            absolute bottom-16 right-0
                            w-72
                            bg-[var(--paper)]
                            border border-[var(--line)]
                            shadow-elevated overflow-hidden
                        "
                    >
                        <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                                <WhatsAppIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="label-caps text-[10px] text-[#FFD37B]">WhatsApp</p>
                                <p className="font-medium text-sm leading-tight mt-0.5">{t("whatsapp.tooltip")}</p>
                            </div>
                        </div>
                        <div className="p-5 space-y-3">
                            <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                                {lang === "en"
                                    ? "We typically respond within minutes during business hours."
                                    : "Respondemos en minutos dentro del horario laboral."}
                            </p>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    block w-full text-center py-3
                                    bg-[#25D366] hover:bg-[#1ebe5b]
                                    text-white label-caps
                                    transition-colors
                                    flex items-center justify-center gap-2
                                "
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                {lang === "en" ? "Open chat" : "Abrir chat"}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={t("whatsapp.aria")}
                aria-expanded={open}
                className="
                    relative w-14 h-14
                    bg-[#25D366] hover:bg-[#1ebe5b]
                    text-white
                    flex items-center justify-center
                    shadow-elevated
                    transition-all duration-300 ease-editorial
                    hover:scale-105
                    rounded-full
                    whatsapp-pulse
                "
            >
                {open ? (
                    <X className="w-6 h-6" strokeWidth={2} />
                ) : (
                    <WhatsAppIcon className="w-8 h-8" />
                )}
            </button>
        </div>
    );
};
