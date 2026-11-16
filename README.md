# Impo Escobedo de Lagos

Sitio web de **Impo Escobedo de Lagos**, asesoría en logística y comercio exterior con base en Lagos de Moreno, Jalisco.

> Regla de contenido: es una **asesoría**, no una agencia aduanal. Los textos no deben prometer despacho aduanero, trámite de pedimentos ni representación ante la aduana, ni mostrar cifras, sedes o logros que no sean reales. Todos los textos viven en `src/i18n/translations.js`.

## Arquitectura (un solo repo)

```
├── src/                    React (Create React App + Tailwind)
├── public/                 Estáticos (imágenes optimizadas, manifest)
├── worker/                 Cloudflare Worker: sirve build/ y /api/contact (correo con Resend)
└── wrangler.jsonc          Configuración del Worker
```

- **Hosting:** Cloudflare Workers (Workers Builds), conectado a este repo (`main`). Cada push compila con `npm run build` y despliega con `wrangler deploy`.
- `/api/contact` corre en el mismo dominio (sin CORS, sin servidor aparte). El resto lo sirven los assets estáticos con modo SPA, así que rutas como `/nosotros` funcionan al recargar.
- `keep_vars: true` evita que un despliegue borre las variables configuradas en el panel.

## Variables de entorno (Cloudflare → Workers → impo-escobedo-lagos → Settings → Variables and Secrets)

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | API key de [Resend](https://resend.com) |
| `CONTACT_TO` | Texto | Correo que recibe las solicitudes (admite varios separados por coma) |
| `CONTACT_FROM` | Texto | Remitente verificado en Resend, p. ej. `Impo Escobedo <contacto@dominio.com>` |

Sin un dominio verificado en Resend, `CONTACT_FROM` puede ser `Impo Escobedo <onboarding@resend.dev>`, pero en ese modo Resend solo entrega al correo con el que se creó la cuenta.

## Desarrollo local

```bash
npm install
npm start            # solo frontend en http://localhost:3000
```

Para probar el formulario de punta a punta:

```bash
cp .dev.vars.example .dev.vars   # y pon tu RESEND_API_KEY
npm run dev:api                  # build + wrangler dev en http://localhost:8788
```

Con `npm run dev:api` corriendo, `npm start` también envía `/api/contact` a wrangler (campo `proxy` de `package.json`).

## Anti-spam del formulario

Campo trampa invisible (`website`), tiempo mínimo de llenado de 3 s, validación y límites de longitud en el servidor, verificación de origen y escape del HTML del usuario antes de armar el correo. Si hace falta más, se puede agregar Cloudflare Turnstile o una regla de rate limiting en Cloudflare para `/api/contact`.

## Pendientes de contenido

- Perfil del asesor (`ADVISOR` en `src/config/constants.js`): aparece en /nosotros en cuanto se llena `name`.
- Datos del responsable para el aviso de privacidad (`PRIVACY_OWNER`): nombre y domicilio completo.
- Correo con dominio propio y redes sociales cuando existan.
