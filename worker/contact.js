/**
 * POST /api/contact — manejado por el Worker (worker/index.js)
 *
 * Recibe el formulario de contacto y lo envía por correo con Resend.
 *
 * Variables de entorno (Cloudflare → Workers → impo-escobedo-lagos →
 * Settings → Variables and Secrets, o archivo .dev.vars en local):
 *   RESEND_API_KEY  (secreto)  API key de Resend
 *   CONTACT_TO      correo que recibe las solicitudes
 *   CONTACT_FROM    remitente verificado en Resend, p. ej.
 *                   "Impo Escobedo <contacto@tudominio.com>"
 *                   (sin dominio verificado: "Impo Escobedo <onboarding@resend.dev>",
 *                   que solo entrega al correo dueño de la cuenta de Resend)
 *
 * Anti-spam: campo trampa `website`, tiempo mínimo de llenado, límites de
 * longitud, verificación de origen y escape de todo el HTML del usuario.
 */

const MIN_FILL_MS = 3000;

const LIMITS = {
    name: [2, 100],
    email: [5, 254],
    phone: [0, 30],
    company: [0, 120],
    message: [10, 2000],
};

const INTERESTS = {
    import: "Importación",
    export: "Exportación",
    logistics: "Asesoría logística",
    trade: "Clasificación, impuestos y regulaciones",
    other: "Otro",
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[0-9+\-\s().]*$/;

const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const clean = (value) =>
    typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim() : "";

const sameOrigin = (request) => {
    const origin = request.headers.get("Origin");
    if (!origin) return true;
    try {
        return new URL(origin).host === new URL(request.url).host;
    } catch (_) {
        return false;
    }
};

export async function handleContact(request, env) {
    if (!sameOrigin(request)) return json({ ok: false, code: "forbidden" }, 403);

    let body;
    try {
        body = await request.json();
    } catch (_) {
        return json({ ok: false, code: "invalid" }, 400);
    }

    // Bots: respondemos "ok" para no darles pistas, pero no enviamos nada.
    const elapsed = Number(body.elapsedMs);
    if (clean(body.website) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
        return json({ ok: true });
    }

    const data = {
        name: clean(body.name),
        email: clean(body.email).toLowerCase(),
        phone: clean(body.phone),
        company: clean(body.company),
        message: clean(body.message),
    };
    const interest = INTERESTS[body.interest] || "";

    const invalid =
        Object.entries(LIMITS).some(([key, [min, max]]) => data[key].length < min || data[key].length > max) ||
        !EMAIL_RE.test(data.email) ||
        !PHONE_RE.test(data.phone) ||
        /[\r\n]/.test(data.name);
    if (invalid) return json({ ok: false, code: "invalid" }, 400);

    if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
        console.error("Faltan RESEND_API_KEY o CONTACT_TO");
        return json({ ok: false, code: "server" }, 500);
    }

    const rows = [
        ["Nombre", data.name],
        ["Correo", data.email],
        ["Teléfono", data.phone],
        ["Empresa", data.company],
        ["Interés", interest],
    ].filter(([, value]) => value);

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#0F1B2A">
  <h2 style="margin:0 0 4px">Nueva solicitud de información</h2>
  <p style="margin:0 0 20px;color:#666">Formulario del sitio web · Impo Escobedo de Lagos</p>
  <table style="border-collapse:collapse;width:100%">
    ${rows
        .map(
            ([label, value]) =>
                `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
  </table>
  <div style="margin-top:20px;padding:16px;background:#F5F1E8;border-left:3px solid #B8924A">
    <p style="margin:0 0 8px;color:#666">Mensaje</p>
    <p style="margin:0;white-space:pre-wrap;line-height:1.5">${escapeHtml(data.message)}</p>
  </div>
  <p style="margin-top:20px;color:#999;font-size:12px">Responda a este correo para contestarle directamente.</p>
</div>`;

    const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", "Mensaje:", data.message].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: env.CONTACT_FROM || "Impo Escobedo <onboarding@resend.dev>",
            to: env.CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean),
            reply_to: data.email,
            subject: `Solicitud de información: ${data.name}`,
            html,
            text,
        }),
    });

    if (!resendResponse.ok) {
        console.error("Resend error", resendResponse.status, await resendResponse.text());
        return json({ ok: false, code: "server" }, 502);
    }

    return json({ ok: true });
}
