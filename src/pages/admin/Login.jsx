import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import { login, isAuthenticated } from "../../utils/auth";
import { useLanguage } from "../../contexts/LanguageContext";

const Login = () => {
    const { t } = useLanguage();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) navigate("/admin/dashboard");
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const result = await login(username, password);
        if (result.success) {
            navigate("/admin/dashboard");
        } else {
            setError(result.message || "Usuario o contraseña incorrectos");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center px-5 relative overflow-hidden">
            <div
                className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--gold)]/8 blur-3xl pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--maritime)]/10 blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-md w-full"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 label-caps text-[var(--ink-muted)] hover:text-[var(--gold)] transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                    {t("nav.home")}
                </Link>

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto h-16 w-16 bg-[var(--navy-deep)] flex items-center justify-center mb-6 ring-1 ring-[var(--gold)]/40"
                    >
                        <Lock className="h-7 w-7 text-[var(--gold)]" strokeWidth={1.5} />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-light text-[var(--ink)] tracking-tight">
                        Panel de administración
                    </h1>
                    <p className="mt-3 text-[var(--ink-soft)] font-light text-sm">
                        Inicia sesión para gestionar el contenido del sitio.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[var(--paper-warm)] border border-[var(--line-soft)] p-7 md:p-9 space-y-6"
                >
                    {error && (
                        <div className="bg-[var(--feedback-errorBg)] border-l-2 border-[var(--feedback-error)] p-4 flex items-center gap-3">
                            <AlertCircle
                                className="h-5 w-5 text-[var(--feedback-errorText)] shrink-0"
                                strokeWidth={1.5}
                            />
                            <p className="text-sm text-[var(--feedback-errorText)]">{error}</p>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="field">
                            <label htmlFor="username" className="field-label">
                                Usuario
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ink-muted)]"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="—"
                                    className="field-input pl-6"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="password" className="field-label">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ink-muted)]"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="—"
                                    className="field-input pl-6"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[var(--navy-deep)] text-white px-7 h-12 label-caps hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors duration-300 disabled:opacity-50"
                    >
                        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                        <LogIn className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                </form>

                <p className="text-center text-xs text-[var(--ink-muted)] mt-6">
                    Sistema de gestión · Impo Escobedo de Lagos
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
