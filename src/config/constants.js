// Configuración global de la aplicación
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5555";

// Branding
export const BRANDING = {
    name: "Impo Escobedo de Lagos",
    shortName: "Impo Escobedo",
    tagline: "Conectamos tu negocio con el mundo",
};

// Información de contacto
export const CONTACT_INFO = {
    phone: "+52 (333) 060-4534",
    email: "juriesco2013@hotmail.com",
    whatsapp: "523330604534",
    location: {
        city: "Lagos de Moreno",
        state: "Jalisco",
        country: "México",
    },
};

// Horarios de atención
export const SCHEDULE = {
    weekday: "9:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Cerrado",
};

// Navegación
export const NAV_ITEMS = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Noticias", path: "/blog" },
    { name: "Contacto", path: "/contacto" },
];

// Servicios principales
export const SERVICES_DATA = [
    {
        id: "importaciones",
        title: "Importaciones y Exportaciones",
        shortDescription:
            "Gestionamos todo el proceso de comercio internacional para que tu mercancía llegue a tiempo y en perfectas condiciones.",
        fullDescription:
            "Gestionamos todo el proceso de comercio internacional, desde la documentación hasta la entrega final de tu mercancía.",
        features: [
            "Gestión de documentación aduanal",
            "Coordinación de transporte internacional",
            "Seguimiento en tiempo real",
            "Optimización de costos logísticos",
        ],
    },
    {
        id: "logistica",
        title: "Asesoría Logística",
        shortDescription:
            "Te guiamos en cada paso del proceso logístico, optimizando costos y tiempos de entrega para tu negocio.",
        fullDescription:
            "Te acompañamos en cada etapa del proceso logístico con soluciones personalizadas para tu negocio.",
        features: [
            "Análisis de rutas óptimas",
            "Selección de transportistas",
            "Gestión de almacenamiento",
            "Control de inventarios",
        ],
    },
    {
        id: "aduanal",
        title: "Asesoría Aduanal",
        shortDescription:
            "Expertos en regulaciones aduaneras, facilitamos el despacho de tu mercancía sin complicaciones.",
        fullDescription:
            "Expertos en regulaciones aduaneras nacionales e internacionales para facilitar tus operaciones.",
        features: [
            "Clasificación arancelaria",
            "Cumplimiento normativo",
            "Despacho aduanero express",
            "Resolución de contingencias",
        ],
    },
];

// Valores corporativos
export const VALUES_DATA = [
    {
        id: "mision",
        title: "Misión",
        text: "Facilitar el comercio internacional de nuestros clientes con soluciones eficientes y confiables.",
    },
    {
        id: "vision",
        title: "Visión",
        text: "Ser la empresa líder en servicios de comercio exterior en la región.",
    },
    {
        id: "compromiso",
        title: "Compromiso",
        text: "Excelencia en cada operación, cumplimiento y satisfacción total del cliente.",
    },
];

// Beneficios de contratar nuestros servicios
export const BENEFITS_DATA = [
    { id: "cobertura", icon: "Globe", text: "Cobertura internacional" },
    { id: "cumplimiento", icon: "FileCheck", text: "100% cumplimiento legal" },
    { id: "entregas", icon: "Clock", text: "Entregas a tiempo" },
];

// Categorías de noticias
export const NEWS_CATEGORIES = [
    "Guías",
    "Comercio",
    "Logística",
    "Tendencias",
    "Noticias",
    "General",
];

// Animaciones comunes de Framer Motion
export const ANIMATIONS = {
    fadeInUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    },
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
    },
};
