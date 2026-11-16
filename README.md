# Impo Escobedo de Lagos

Sitio web de **Impo Escobedo de Lagos**, asesoría en logística y comercio exterior con base en Lagos de Moreno, Jalisco.

> Regla de contenido: es una **asesoría**, no una agencia aduanal. Los textos no deben prometer despacho aduanero, trámite de pedimentos ni representación ante la aduana, ni mostrar cifras, sedes o logros que no sean reales. Todos los textos viven en `src/i18n/translations.js`.

## Arquitectura (un solo repo)

```
├── src/                    React (Create React App + Tailwind)
├── public/                 Estáticos (imágenes optimizadas, manifest)
├── public/data/news.json   Noticias del DOF (las actualiza la GitHub Action)
├── scripts/fetch-dof-news.mjs  Lee el DOF y filtra lo de comercio exterior
├── .github/workflows/news.yml  Corre el script lun-vie (9:30 y 20:00, hora del centro)
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

## Noticias automáticas (sin IA, sin base de datos)

- Fuente: servicio web oficial y público del Diario Oficial de la Federación (SIDOF, "Datos abiertos").
- El script filtra por categoría (aranceles, aduanas, tratados, antidumping, comercio exterior y NOM de Economía) y guarda título, fecha, dependencia y enlace oficial.
- Solo se republica el título oficial con enlace a la fuente. Los textos oficiales no tienen derechos de autor (LFDA, art. 14, fr. VIII).
- Si hay noticias nuevas, la Action hace commit de `public/data/news.json` y Cloudflare vuelve a publicar.
- Para ejecutarlo a mano: `node scripts/fetch-dof-news.mjs --days 10`, o en GitHub → Actions → "Noticias DOF" → Run workflow.

## Anti-spam del formulario

Campo trampa invisible (`website`), tiempo mínimo de llenado de 3 s, validación y límites de longitud en el servidor, verificación de origen y escape del HTML del usuario antes de armar el correo. Si hace falta más, se puede agregar Cloudflare Turnstile o una regla de rate limiting en Cloudflare para `/api/contact`.

## Pendientes de contenido

- Perfil del asesor (`ADVISOR` en `src/config/constants.js`): aparece en /nosotros en cuanto se llena `name`.
- Datos del responsable para el aviso de privacidad (`PRIVACY_OWNER`): nombre y domicilio completo.
- Correo con dominio propio y redes sociales cuando existan.
