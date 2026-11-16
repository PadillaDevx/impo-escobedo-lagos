#!/usr/bin/env node
/**
 * Noticias automáticas desde el Diario Oficial de la Federación (DOF).
 *
 * Usa el servicio web oficial y público del DOF (SIDOF, "Datos abiertos"):
 *   https://sidof.segob.gob.mx/dof/sidof/notas/DD-MM-AAAA
 * Filtra las publicaciones relacionadas con comercio exterior y las guarda en
 * public/data/news.json, que el sitio muestra en /noticias.
 *
 * Se republica solo el título oficial, la fecha y la dependencia, siempre con
 * enlace a la publicación original. Los textos oficiales del DOF no están
 * protegidos por derechos de autor (LFDA, art. 14, fr. VIII).
 *
 * Uso:  node scripts/fetch-dof-news.mjs [--days 10]
 * Lo ejecuta .github/workflows/news.yml dos veces al día (lunes a viernes).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("..", import.meta.url);
const OUTPUT = fileURLToPath(new URL("public/data/news.json", ROOT));
const API = "https://sidof.segob.gob.mx/dof/sidof/notas/";
const USER_AGENT = "ImpoEscobedoNews/1.0 (+https://github.com/PadillaDevx/impo-escobedo-lagos)";
const MAX_ITEMS = 300;
const DELAY_MS = 1200; // pausa entre consultas para no cargar el servicio

const daysArg = process.argv.indexOf("--days");
const DAYS = daysArg > -1 ? Number(process.argv[daysArg + 1]) : 10;

// Categorías (la primera que coincida gana). Se busca en el título oficial.
const CATEGORIES = [
    { id: "aranceles", re: /impuestos generales de importaci[oó]n|tarifa de la ley|arancel|cupo|cuota de importaci|prosec|regla 8a/i },
    { id: "aduanas", re: /aduan|recinto fiscalizado|agente aduanal|tr[aá]nsito (internacional )?de mercanc/i },
    { id: "tratados", re: /tratado de libre comercio|t-mec|acuerdo de asociaci[oó]n|comisi[oó]n administradora|reglas? de origen|certificado de origen|alianza del pac[ií]fico/i },
    { id: "defensa", re: /antidumping|dumping|cuota compensatoria|cuotas compensatorias|subvenci|salvaguarda/i },
    { id: "comercio", re: /comercio exterior|importaci[oó]n|exportaci[oó]n|padr[oó]n de importadores|immex|zona libre|mercanc[ií]as cuya (importaci|exportaci)/i },
];

// Normas oficiales: solo las de la Secretaría de Economía (las de Salud,
// Energía, etc. no suelen ser de comercio exterior).
const isEconomyNom = (title, org) =>
    /norma oficial mexicana|NOM-/i.test(title) && /ECONOMIA/i.test(org || "");

// Publicaciones diarias que no son noticia.
const EXCLUDE = /^tipo de cambio|^tasas de inter[eé]s|^valor de la unidad de inversi|^equivalencia de las monedas|^costo de captaci/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad = (n) => String(n).padStart(2, "0");
const toApiDate = (d) => `${pad(d.getUTCDate())}-${pad(d.getUTCMonth() + 1)}-${d.getUTCFullYear()}`;
const toIso = (apiDate) => {
    const [dd, mm, yyyy] = apiDate.split("-");
    return `${yyyy}-${mm}-${dd}`;
};
const titleCase = (s) =>
    (s || "")
        .toLowerCase()
        .replace(/(^|\s)(\p{L})/gu, (m, sp, ch) => sp + ch.toUpperCase())
        .replace(/\b(De|Del|La|Las|Los|Y|E|En|Para|Por|Con)\b/g, (w) => w.toLowerCase())
        .replace(/\bSecretaria\b/g, "Secretaría")
        .replace(/\bPrevision\b/g, "Previsión")
        .replace(/\bEnergia\b/g, "Energía")
        .replace(/\bCredito\b/g, "Crédito")
        .replace(/\bEconomia\b/g, "Economía")
        .replace(/\bRepublica\b/g, "República")
        .replace(/\bMexico\b/g, "México")
        .replace(/\bPublico\b/g, "Público");
const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

const classify = (title, org) => {
    if (EXCLUDE.test(title)) return null;
    for (const c of CATEGORIES) if (c.re.test(title)) return c.id;
    if (isEconomyNom(title, org)) return "normas";
    return null;
};

async function fetchDay(date) {
    const apiDate = toApiDate(date);
    const res = await fetch(API + apiDate, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error(`DOF ${apiDate}: HTTP ${res.status}`);
    }
    const data = await res.json();
    const notes = [
        ...(data.NotasMatutinas || []).map((n) => ({ ...n, edicion: "Matutina" })),
        ...(data.NotasVespertinas || []).map((n) => ({ ...n, edicion: "Vespertina" })),
        ...(data.NotasExtraordinarias || []).map((n) => ({ ...n, edicion: "Extraordinaria" })),
    ];
    return notes
        .map((n) => {
            const title = clean(n.titulo);
            const category = classify(title, n.codOrgaDos);
            if (!title || !category) return null;
            return {
                id: `dof-${n.codNota}`,
                source: "DOF",
                sourceName: "Diario Oficial de la Federación",
                date: toIso(n.fecha || apiDate),
                edition: n.edicion,
                agency: titleCase(n.codOrgaDos || n.nombreCodOrgaUno),
                category,
                title,
                url: `https://sidof.segob.gob.mx/notas/${n.codNota}`,
            };
        })
        .filter(Boolean);
}

async function main() {
    let existing = [];
    try {
        existing = JSON.parse(await readFile(OUTPUT, "utf8")).items || [];
    } catch (_) {
        // Primera ejecución
    }
    const byId = new Map(existing.map((i) => [i.id, i]));

    const today = new Date();
    let fetched = 0;
    let failures = 0;
    let attempted = 0;
    for (let i = 0; i < DAYS; i++) {
        const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
        const weekday = d.getUTCDay();
        if (weekday === 0 || weekday === 6) continue; // el DOF no publica en fin de semana (salvo extraordinarias)
        attempted++;
        try {
            for (const item of await fetchDay(d)) {
                if (!byId.has(item.id)) fetched++;
                byId.set(item.id, item);
            }
        } catch (err) {
            failures++;
            console.warn(String(err.message || err));
        }
        await sleep(DELAY_MS);
    }

    if (attempted > 0 && failures === attempted) {
        throw new Error("No se pudo consultar el DOF en ningún día; no se modifica news.json.");
    }

    const items = [...byId.values()]
        .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
        .slice(0, MAX_ITEMS);

    const previous = JSON.stringify(existing);
    if (JSON.stringify(items) === previous) {
        console.log(`Sin cambios (${items.length} noticias, ${failures} días con error).`);
        return;
    }

    await mkdir(dirname(OUTPUT), { recursive: true });
    await writeFile(
        OUTPUT,
        JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2) + "\n"
    );
    console.log(`Guardadas ${items.length} noticias (${fetched} nuevas, ${failures} días con error).`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
