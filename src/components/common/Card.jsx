import { motion } from 'framer-motion';

export const Card = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={`card ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    {children}
  </motion.div>
);