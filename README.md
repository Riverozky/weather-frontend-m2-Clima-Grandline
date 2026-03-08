🏴‍☠️ Weather Grand Line App

Aplicación meteorológica interactiva que fusiona el universo de One Piece con datos climáticos reales. El proyecto ha evolucionado de datos estáticos a una arquitectura profesional basada en objetos y consumo de APIs.
🎯 Resumen del Proyecto

El sistema consulta la API de OpenWeatherMap para obtener el clima de ciudades reales y "mapea" esos datos a islas icónicas del anime. Utiliza JavaScript asíncrono para garantizar que la interfaz no se bloquee mientras se reciben los datos de navegación.
🛠️ Pilares Técnicos

    Arquitectura POO: Estructurado en clases (WeatherAPI para datos y WeatherApp para lógica/interfaz) para cumplir con estándares de desarrollo profesional.

    Consumo de API: Implementación de fetch con async/await y manejo de errores para obtener pronósticos reales.

    Lógica de Negocio: Procesamiento automático de promedios, temperaturas extremas y alertas de navegación dinámicas (Módulo 5).

    Persistencia: Uso de localStorage para transferir la información de las islas entre la vista principal y el detalle.

📂 Organización

    Frontend: HTML5, CSS3 y Bootstrap 5 para un diseño responsivo.

    Backend Simulado: Mapeo de ciudades (ej: Venecia → Water 7) para alimentar la temática.

🚀 Instalación

    Clonar el repositorio.

    Añadir la apiKey en script.js.

    Abrir index.html con Live Server.
