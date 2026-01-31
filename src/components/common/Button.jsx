import { motion } from 'framer-motion';

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
};

export const Button = ({ children, variant = 'primary', className = '', ...props }) => (
  <motion.button
    className={`btn-base ${variantClasses[variant]} ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    {children}
  </motion.button>
);