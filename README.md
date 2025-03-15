Proyecto desarrollado con Next.js y JavaScript.

 ## Requisitos

Asegúrate de tener instalado:

 - Node.js (versión recomendada: 18.x o superior)

## Instalación

Clona el repositorio y ejecuta:

```bash
npm install
```

## Ejecución en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```
El proyecto estará disponible en http://localhost:3000/

## Construcción y despliegue

Para construir la aplicación para producción:
```bash
npm run build
```
Para ejecutar la aplicación en modo producción:
```bash
npm start
```
## Pruebas

Para ejecutar los tests:
```bash
npm test
```
## Arquitectura y estructura del proyecto

El proyecto sigue una arquitectura modular y desacoplada:

* services/: Contiene la lógica y las llamadas al backend. Las peticiones HTTP se manejan a través de fetchApi.js en lib/, utilizando axios.

* lib/: Incluye utilidades genéricas como fetchApi.js para manejar las solicitudes a la API.

* hooks/: Contiene cartStore.js, un store global manejado con Zustand para gestionar el carrito sin re-renderizaciones innecesarias.

* styles/: Contiene los archivos de estilos escritos en SCSS.

* pages/: Usa el sistema de rutas de Next.js para la navegación entre páginas.

## Información adicional

Configura la variable de entorno *NEXT_PUBLICK_API_KEY* en un archivo .env (Clave autenticación para API)

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
