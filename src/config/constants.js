// Configuración global de la aplicación

// El formulario se envía a la Cloudflare Pages Function en /api/contact
// (mismo dominio). En desarrollo, `npm start` redirige /api a wrangler
// mediante el "proxy" de package.json.
export const API_URL = process.env.REACT_APP_API_URL || "";

// Branding
export const BRANDING = {
    name: "Impo Escobedo de Lagos",
    shortName: "Impo Escobedo",
};

// Información de contacto
export const CONTACT_INFO = {
    phone: "+52 (333) 060-4534",
    phoneHref: "tel:+523330604534",
    email: "juriesco2013@hotmail.com",
    whatsapp: "523330604534",
    location: {
        city: "Lagos de Moreno",
        state: "Jalisco",
        country: "México",
    },
};

export const whatsappLink = (message = "") =>
    `https://wa.me/${CONTACT_INFO.whatsapp}${
        message ? `?text=${encodeURIComponent(message)}` : ""
    }`;

// Horarios de atención
export const SCHEDULE = {
    weekday: "9:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Cerrado",
};

// Perfil del asesor (se muestra en /nosotros SOLO cuando `name` tiene valor).
// Pendiente: completar cuando se tengan los datos.
//   photo: ruta dentro de /public, p. ej. "/images/asesor.jpg"
//   bio:   { es: "...", en: "..." }
export const ADVISOR = {
    name: "",
    title: { es: "", en: "" },
    license: "",
    photo: "",
    bio: { es: "", en: "" },
};

// Datos del responsable para el aviso de privacidad.
// La ley pide nombre y domicilio del responsable: completar cuando se tengan.
export const PRIVACY_OWNER = {
    legalName: "", // nombre de la persona física o razón social
    address: "", // domicilio completo
    lastUpdated: "16 de noviembre de 2026",
};
