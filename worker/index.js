// Worker de Cloudflare: sirve la app (carpeta build/) y la API del formulario.
import { handleContact } from "./contact.js";

export default {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);

        if (pathname === "/api/contact") {
            if (request.method !== "POST") {
                return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
            }
            return handleContact(request, env);
        }

        return env.ASSETS.fetch(request);
    },
};
