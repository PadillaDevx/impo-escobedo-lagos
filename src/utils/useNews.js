import { useEffect, useState } from "react";

// Noticias generadas por scripts/fetch-dof-news.mjs (GitHub Action diaria).
const NEWS_URL = `${process.env.PUBLIC_URL || ""}/data/news.json`;

let cache = null;

export const NEWS_CATEGORIES = ["aranceles", "aduanas", "tratados", "defensa", "comercio", "normas"];

export const useNews = () => {
    const [state, setState] = useState(
        cache ? { status: "ready", ...cache } : { status: "loading", items: [], updatedAt: null }
    );

    useEffect(() => {
        if (cache) return undefined;
        let active = true;
        fetch(NEWS_URL, { cache: "no-cache" })
            .then((res) => {
                if (!res.ok) throw new Error(String(res.status));
                return res.json();
            })
            .then((data) => {
                cache = { items: Array.isArray(data.items) ? data.items : [], updatedAt: data.updatedAt || null };
                if (active) setState({ status: "ready", ...cache });
            })
            .catch(() => {
                if (active) setState({ status: "error", items: [], updatedAt: null });
            });
        return () => {
            active = false;
        };
    }, []);

    return state;
};

/** "2026-10-23" → "23 de octubre de 2026" (sin desfase de zona horaria). */
export const formatNewsDate = (iso, lang) => {
    const [y, m, d] = (iso || "").split("-").map(Number);
    if (!y || !m || !d) return iso || "";
    return new Date(y, m - 1, d).toLocaleDateString(lang === "en" ? "en-US" : "es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
