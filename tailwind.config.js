/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Marca
        gold: {
          DEFAULT: "#C6A15B",
          dark: "#A7864A",
          light: "#D9B775",
          muted: "rgba(198, 161, 91, 0.12)",
        },
        navy: {
          deepest: "#061522",
          deep: "#0B2239",
          elevated: "#102A40",
          surface: "#0E1D2A",
          light: "#1B3A5C",
          pale: "#D5E4F7",
          dim: "#778596",
          fixed: "#B9C8DA",
        },
        maritime: {
          DEFAULT: "#2875A6",
          dark: "#066494",
        },
        // Semánticas Light
        cream: {
          DEFAULT: "#FCF9F2",
          warm: "#F6F3EC",
          soft: "#F1EEE7",
          high: "#EBE8E1",
          dim: "#DCDAD3",
          elev: "#E5E2DB",
          white: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1C1C18",
          soft: "#44474C",
          muted: "#74777C",
          faint: "#C4C6CC",
        },
        // Semánticas Dark
        surface: {
          DEFAULT: "#0F1B2A",
          card: "#15263B",
          high: "#1B3050",
          line: "rgba(196, 198, 204, 0.14)",
        },
        text: {
          DEFAULT: "#F3F0E9",
          soft: "#C7CCD4",
          muted: "#8A93A0",
        },
        accent: {
          gold: "#C6A15B",
          goldSoft: "rgba(198, 161, 91, 0.16)",
        },
        feedback: {
          error: "#BA1A1A",
          errorBg: "#FFdad6",
          errorText: "#93000A",
          success: "#3FB57F",
          successBg: "#D6F5E5",
          successText: "#0F5132",
        },
        whatsapp: "#25D366",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        label: "0.18em",
      },
      fontSize: {
        "label-xs": ["10px", { lineHeight: "1.2", letterSpacing: "0.2em" }],
        "label-sm": ["11px", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        "label-base": ["12px", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        "display-sm": ["2rem", { lineHeight: "1.1" }],
        "display-md": ["2.5rem", { lineHeight: "1.05" }],
        "display-lg": ["3.25rem", { lineHeight: "1.02" }],
        "display-xl": ["4rem", { lineHeight: "1" }],
      },
      boxShadow: {
        editorial: "0 1px 8px rgba(0,0,0,0.04)",
        card: "0 4px 20px -6px rgba(11, 34, 57, 0.08)",
        elevated: "0 24px 60px -20px rgba(11, 34, 57, 0.25)",
        gold: "0 8px 24px -8px rgba(198, 161, 91, 0.35)",
      },
      backgroundImage: {
        "gold-shine":
          "linear-gradient(135deg, #D9B775 0%, #C6A15B 40%, #A7864A 100%)",
        "navy-gradient":
          "linear-gradient(160deg, #061522 0%, #0B2239 55%, #102A40 100%)",
        "hero-overlay":
          "linear-gradient(180deg, rgba(6,21,34,0.2) 0%, rgba(6,21,34,0.55) 55%, rgba(6,21,34,0.95) 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        shine: "shine 6s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
