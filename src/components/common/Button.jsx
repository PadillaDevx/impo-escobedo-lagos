import { motion } from "framer-motion";

const variantClasses = {
    primary:
        "bg-[var(--navy-deep)] text-white border border-[var(--navy-deep)] hover:bg-[var(--navy-elevated)] hover:border-[var(--gold)]",
    gold:
        "bg-[var(--gold)] text-[var(--navy-deep)] border border-[var(--gold)] hover:bg-[var(--gold-dark)] hover:border-[var(--gold-dark)]",
    outline:
        "bg-transparent text-[var(--ink)] border border-[var(--ink-faint)] hover:border-[var(--gold)] hover:text-[var(--gold)]",
    ghost:
        "bg-transparent text-[var(--ink)] border-none hover:text-[var(--gold)] px-0",
};

const sizeClasses = {
    sm: "text-[10px] py-2.5 px-4",
    md: "text-[11px] py-3.5 px-5",
    lg: "text-[11px] py-4 px-7",
};

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon = null,
    iconPosition = "right",
    as: Component = motion.button,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-editorial cursor-pointer rounded-none whitespace-nowrap leading-none disabled:opacity-50 disabled:cursor-not-allowed";
    return (
        <Component
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
        </Component>
    );
};
