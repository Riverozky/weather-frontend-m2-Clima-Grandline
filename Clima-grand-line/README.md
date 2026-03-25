🏴‍☠️ Weather Grand Line App (Vue.js Edition)

Aplicación meteorológica interactiva que fusiona el universo de One Piece con datos climáticos reales, ahora potenciada por Vue 3. Esta versión marca la transición de una web estática a una Single Page Application (SPA) profesional con gestión de usuarios.
🎯 Resumen del Proyecto

El sistema consume la API de Open-Meteo/OpenWeather para obtener datos climáticos de ciudades reales que han sido "mapeadas" a islas icónicas del Grand Line. Gracias a la reactividad de Vue, la navegación es instantánea y la interfaz se actualiza sin recargar la página.
👤 Sistema de Usuarios y Estado Global

La aplicación ahora incorpora un sistema de gestión de estado centralizado mediante Vuex, que permite:

    Perfil del Navegante: Almacenamiento del email y nombre de usuario tras el inicio de sesión.

    Gestión de Favoritos: Los usuarios pueden marcar sus islas preferidas con una estrella (★), guardando esta información en un estado global accesible desde cualquier vista.

    Persistencia: El estado de autenticación se mantiene durante la sesión activa del usuario.

🖼️ Vistas Principales

    Home (Inicio): Panel principal que muestra el mapa del Grand Line con un buscador dinámico y tarjetas reactivas de cada isla.

    Detalle de Isla: Vista profunda que muestra estadísticas avanzadas (promedios, máximas y mínimas) y el pronóstico extendido.

    Login: Formulario de acceso para que los piratas puedan identificarse y personalizar su experiencia.

    Favoritos (Privada): Sección exclusiva que lista únicamente las islas que el usuario ha marcado como favoritas.

🛣️ Rutas Configuradas (Vue Router)

La aplicación utiliza vue-router para gestionar la navegación interna y la seguridad:

    /: Ruta raíz que carga el componente HomeView.

    /login: Vista de inicio de sesión.

    /lugar/:nombre: Ruta dinámica para mostrar información específica de una isla.

    /favoritos: Ruta protegida mediante Navigation Guards que requiere autenticación previa para ser visualizada.

🛠️ Pilares Técnicos (Módulo 6)

    Arquitectura Componentizada: Uso de componentes .vue para separar la lógica, el diseño y la estructura.

    Navegación SPA: Implementación de rutas dinámicas y protegidas que optimizan la experiencia de usuario.

    Gestión de Estado (Vuex): Centralización de la lógica de usuario y favoritos, eliminando la redundancia de datos.

    Consumo Asíncrono: Servicio centralizado en WeatherAPI.js para la gestión de peticiones con fetch y async/await.

    Estilos: Integración de Bootstrap 5 con diseños personalizados para mantener la estética pirata.

🚀 Instrucciones de Ejecución

Para correr este proyecto en tu entorno local, sigue estos pasos:

    Clonar el repositorio:
    Bash

    git clone https://github.com/Riverozky/weather-frontend-m2-Clima-Grandline

    Entrar a la carpeta del proyecto:
    Bash

    cd Clima-grand-line

    Instalar las dependencias:
    Bash

    npm install

    Ejecutar el servidor de desarrollo:
    Bash

    npm run dev

    Abrir en el navegador:
    Sigue el enlace que aparecerá en tu terminal (normalmente http://localhost:5173).

🔗 Repositorio Público

Puedes encontrar el código fuente y el historial de versiones en:
👉 https://github.com/Riverozky/weather-frontend-m2-Clima-Grandline