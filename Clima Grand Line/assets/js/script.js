class WeatherAPI {
    constructor() {
        this.apiKey = "657195df834cd83af020a62e080e1443"; 
        this.baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
    }

    /**
     * Obtiene datos meteorológicos reales de una ciudad.
     * @param {string} ciudadReal 
     */
    async obtenerDatosClima(ciudadReal) {
        try {
            const url = `${this.baseUrl}?q=${ciudadReal}&appid=${this.apiKey}&units=metric&lang=es`;
            const respuesta = await fetch(url);
            
            if (!respuesta.ok) {
                throw new Error(`Error en el Log Pose: ${respuesta.statusText}`);
            }
            
            return await respuesta.json();
        } catch (error) {
            console.error("Fallo en la conexión con la API:", error);
            return null;
        }
    }
}

class WeatherApp {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.islasConfig = [
            { nombre: "Loguetown", ciudadReal: "London", img: "assets/img/loguetown.png" },
            { nombre: "Alabasta", ciudadReal: "Cairo", img: "assets/img/alabasta.png" },
            { nombre: "Water 7", ciudadReal: "Venice", img: "assets/img/water7.png" },
            { nombre: "Skypiea", ciudadReal: "La Paz", img: "assets/img/skypeia.png" },
            { nombre: "Wano", ciudadReal: "Kyoto", img: "assets/img/wano.png" }
        ];
        this.datosProcesados = [];
    }

    // carga de datos de todas las islas
    async cargarTodo() {
        const promesas = this.islasConfig.map(async (isla) => {
            const rawData = await this.apiClient.obtenerDatosClima(isla.ciudadReal);
            if (rawData) return this.mapearDatos(isla, rawData);
        });

        this.datosProcesados = (await Promise.all(promesas)).filter(d => d !== undefined);
        
        localStorage.setItem("datosClima", JSON.stringify(this.datosProcesados));

        this.gestionarPantallaActual();
    }

    // Transformacion de api a la  app
    mapearDatos(isla, data) {
        const pronostico = data.list.filter((_, i) => i % 8 === 0).map(item => ({
            dia: new Date(item.dt_txt).toLocaleDateString('es-ES', { weekday: 'long' }),
            min: Math.round(item.main.temp_min),
            max: Math.round(item.main.temp_max),
            estado: item.weather[0].main 
        }));

        return {
            ...isla,
            tempActual: Math.round(data.list[0].main.temp),
            estadoActual: data.list[0].weather[0].description,
            viento: data.list[0].wind.speed,
            humedad: data.list[0].main.humidity,
            pronosticoSemanal: pronostico
        };
    }

    gestionarPantallaActual() {
        const loading = document.getElementById("estado-carga");
        if (loading) loading.style.display = "none";

        if (document.getElementById("contenedor-tarjetas")) {
            this.renderHome();
        } else if (document.getElementById("nombre-ciudad")) {
            this.renderDetalle();
        }
    }

    // tarjetas de inicio
    renderHome() {
        const contenedor = document.getElementById("contenedor-tarjetas");
        if (!contenedor) return;

        contenedor.innerHTML = this.datosProcesados.map(isla => `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="place-card card h-100 shadow-sm border-0">
                    <img src="${isla.img}" class="card-img-top" style="height:180px; object-fit:cover" alt="${isla.nombre}">
                    <div class="card-body text-center">
                        <h5 class="fw-bold text-primary">${isla.nombre}</h5>
                        <p class="display-6 my-2">${isla.tempActual}°C</p>
                        <p class="text-muted text-capitalize">${isla.estadoActual}</p>
                        <button class="btn btn-primary w-100 rounded-pill btn-detalle" data-isla="${isla.nombre}">
                            Ver Detalle
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

        // Eventos de navegación
        document.querySelectorAll(".btn-detalle").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.setItem("islaSeleccionada", btn.dataset.isla);
                window.location.href = "detalle.html";
            });
        });
    }

    //Carga de info en el detalle 
    renderDetalle() {
        const nombre = localStorage.getItem("islaSeleccionada");
        const datos = JSON.parse(localStorage.getItem("datosClima"));
        if (!datos) return window.location.href = "index.html";

        const isla = datos.find(i => i.nombre === nombre);
        if (!isla) return window.location.href = "index.html";

        //DOM
        document.getElementById("nombre-ciudad").innerText = isla.nombre;
        document.getElementById("temp-actual").innerText = `${isla.tempActual}°C`;
        document.getElementById("estado-clima").innerText = isla.estadoActual;
        document.getElementById("viento").innerText = isla.viento;
        document.getElementById("humedad").innerText = isla.humedad;
        document.getElementById("img-detalle").src = isla.img;

        const tabla = document.getElementById("pronostico-dias");
        if (tabla) {
            tabla.innerHTML = isla.pronosticoSemanal.map(d => `
                <tr>
                    <td class="text-capitalize fw-bold">${d.dia}</td>
                    <td class="text-primary">${d.min}°C</td>
                    <td class="text-danger">${d.max}°C</td>
                    <td>${this.traducirEstado(d.estado)}</td>
                </tr>
            `).join("");
        }

        this.renderStatsYAlertas(isla.pronosticoSemanal);
    }

    //Estadisticas y reportes de clima

    renderStatsYAlertas(pronostico) {
        const temps = pronostico.map(d => (d.min + d.max) / 2);
        const min = Math.min(...pronostico.map(d => d.min));
        const max = Math.max(...pronostico.map(d => d.max));
        const prom = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

        document.getElementById("stat-promedio").innerText = `${prom}°C`;
        document.getElementById("stat-min").innerText = `${min}°C`;
        document.getElementById("stat-max").innerText = `${max}°C`;

        const resumenTexto = document.getElementById("resumen-texto");
        let mensajeResumen = "Ruta estable por la Grand Line.";
        
        const tieneLluvia = pronostico.some(d => d.estado === 'Rain');
        const esMuyCalido = prom > 28;

        if (esMuyCalido) mensajeResumen = "El calor de la zona podría agotar las provisiones. ¡Atención navegantes! ☀️";
        else if (tieneLluvia) mensajeResumen = "Se esperan chubascos intermitentes que podrían dificultar la visibilidad 🌧️.";
        
        if (resumenTexto) resumenTexto.innerText = mensajeResumen;

        const alertaBox = document.getElementById("alerta-clima");
        if (!alertaBox) return;

        alertaBox.className = "p-2 rounded small fw-bold"; // Reset clases

        if (prom > 30) {
            alertaBox.innerText = "🔥 Alerta de Calor: Riesgo de evaporación de reservas.";
            alertaBox.classList.add("bg-danger", "text-white");
        } else if (tieneLluvia) {
            alertaBox.innerText = "🌧️ Alerta de Tormenta: Aseguren el timón y las velas.";
            alertaBox.classList.add("bg-info", "text-dark");
        } else {
            alertaBox.innerText = "⚓ Log Pose estable: Condiciones óptimas para navegar.";
            alertaBox.classList.add("bg-success", "text-white");
        }
    }

    traducirEstado(estado) {
        const iconos = { 'Clear': '☀️ Despejado', 'Clouds': '☁️ Nublado', 'Rain': '🌧️ Lluvia', 'Snow': '❄️ Nieve' };
        return iconos[estado] || estado;
    }
}

const api = new WeatherAPI();
const app = new WeatherApp(api);

document.addEventListener("DOMContentLoaded", () => {
    app.cargarTodo();
});