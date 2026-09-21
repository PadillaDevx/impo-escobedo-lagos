import { motion } from "framer-motion";

export const Card = ({ children, className = "", delay = 0, hoverable = true }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={hoverable ? { y: -4 } : undefined}
        className={`bg-[var(--paper)] border border-[var(--line-soft)] p-7 relative transition-shadow duration-300 hover:shadow-[var(--shadow-card)] hover:border-[var(--gold)] ${className}`}
    >
        {children}
    </motion.div>
);
