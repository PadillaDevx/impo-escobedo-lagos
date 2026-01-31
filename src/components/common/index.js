import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

// Re-exports de componentes con archivo propio
export { Button } from './Button';
export { Card } from './Card';

// Componentes inline simples
export const DolphinLogo = ({ className = "w-10 h-10" }) => (
    <img
        src={`${process.env.PUBLIC_URL}/images/delfin2.png`}
        alt="Delfín Impo Escobedo"
        className={`${className} object-contain`}
    />
);

export const LoadingSpinner = ({ message = "Cargando..." }) => (
    <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{message}</p>
    </div>
);

export const ErrorMessage = ({ message, children }) => (
    <div className="max-w-md mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-red-700">{message}</h3>
        </div>
        {children}
    </div>
);

export const PageHero = ({ title, subtitle }) => (
    <section className="hero-gradient text-white py-20">
        <div className="container-custom text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-5xl font-bold mb-6">{title}</h1>
                <p className="text-xl text-cyan-50 max-w-3xl mx-auto">
                    {subtitle}
                </p>
            </motion.div>
        </div>
    </section>
);
