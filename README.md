# Impo Escobedo de Lagos

Sitio web corporativo para servicios de importaciones, exportaciones y asesoría logística de comercio exterior.

## 🚀 Inicio Rápido

### Frontend (React)

```bash
npm install
npm start
```

El sitio se abrirá en [http://localhost:3000](http://localhost:3000)

### Backend (API de Contacto)

**IMPORTANTE**: Para que el formulario de contacto funcione, necesitas iniciar el backend.

```bash
cd server
npm install
npm run dev
```

El servidor API correrá en [http://localhost:5000](http://localhost:5000)

📧 **Ver instrucciones completas de configuración del email**: [CONFIGURACION_EMAIL.md](./CONFIGURACION_EMAIL.md)

---

## 📂 Estructura del Proyecto

```
impo-escobedo-lagos/
├── src/                    # Código del frontend (React)
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   └── ...
├── server/                # Backend (Node.js + Express)
│   ├── server.js          # Servidor API
│   ├── .env               # Variables de entorno (NO subir a Git)
│   └── package.json
├── public/                # Archivos estáticos
└── build/                 # Build de producción
```

---

## 🛠️ Scripts Disponibles

### Frontend

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm test` - Ejecuta los tests
- `npm run deploy` - Despliega a GitHub Pages

### Backend

- `npm run dev` - Inicia con auto-reload (desarrollo)
- `npm start` - Inicia en modo producción

---

## 📧 Sistema de Contacto

El formulario de contacto envía emails automáticamente usando:
- **Backend**: Node.js + Express + Nodemailer
- **Email**: Configurado para Gmail/Hotmail
- **Destino**: juriesco2013@hotmail.com

### Configuración Rápida

1. Edita `server/.env` con tus credenciales de email
2. Inicia el backend: `cd server && npm run dev`
3. Inicia el frontend: `npm start`
4. Prueba el formulario en `/contacto`

**Ver guía completa**: [CONFIGURACION_EMAIL.md](./CONFIGURACION_EMAIL.md)

---

## 🌐 Despliegue

### Frontend (GitHub Pages)

```bash
npm run deploy
```

### Backend (Render.com - GRATIS)

1. Crea cuenta en https://render.com
2. New Web Service → Conecta tu repo
3. Root Directory: `server`
4. Build: `npm install`
5. Start: `npm start`
6. Agrega variables de entorno (EMAIL_USER, EMAIL_PASS, EMAIL_RECEIVER)

---

## 🎨 Tecnologías

- **Frontend**: React, Tailwind CSS, Framer Motion, React Router
- **Backend**: Node.js, Express, Nodemailer
- **Iconos**: Lucide React
- **Despliegue**: GitHub Pages (frontend), Render (backend)

---

## 📝 Notas

- Los archivos `.env` están en `.gitignore` por seguridad
- El backend debe estar corriendo para que funcione el formulario de contacto
- En producción, actualiza `REACT_APP_API_URL` con la URL del backend desplegado

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
