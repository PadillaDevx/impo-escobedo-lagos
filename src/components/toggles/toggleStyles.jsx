// Constantes compartidas para los toggles deslizantes
// Track theme-aware: claro en tema claro, oscuro en tema oscuro
export const TOGGLE_TRACK =
    "relative w-[64px] h-[30px] rounded-full bg-[var(--paper-high)] dark:bg-[var(--navy-deepest)] border border-[var(--ink-faint)] dark:border-white/10 transition-colors duration-500 ease-editorial hover:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40";

// Thumb dorado siempre con contenido navy para máximo contraste
export const TOGGLE_THUMB_BASE =
    "absolute top-[3px] w-[28px] h-[24px] rounded-full bg-[var(--gold)] shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-[left] duration-500 ease-editorial flex items-center justify-center";

// Color del texto/icono "fantasma" del track (opción a la que cambiaría)
export const TOGGLE_PHANTOM_TEXT =
    "text-[var(--ink-muted)] dark:text-white/30";

/* Iconos SVG inline */
export const SunIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5l1.5-1.5" />
    </svg>
);

export const SunFilled = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-[var(--navy-deepest)] ${className}`}
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5l1.5-1.5" />
    </svg>
);

export const MoonIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
);

export const MoonFilled = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-[var(--navy-deepest)] ${className}`}
        aria-hidden="true"
    >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
);
