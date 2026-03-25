class WeatherAPI {
    constructor() {
        this.apiKey = "657195df834cd83af020a62e080e1443"; 
        this.baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
        this.islasConfig = [
            { nombre: "Loguetown", ciudadReal: "London", img: "/assets/img/loguetown.png" },
            { nombre: "Alabasta", ciudadReal: "Cairo", img: "/assets/img/alabasta.png" },
            { nombre: "Water 7", ciudadReal: "Venice", img: "/assets/img/water7.png" },
            { nombre: "Skypiea", ciudadReal: "La Paz", img: "/assets/img/skypeia.png" },
            { nombre: "Wano", ciudadReal: "Kyoto", img: "/assets/img/wano.png" }
        ];
    }

    async obtenerDatosClima(ciudadReal) {
        try {
            const url = `${this.baseUrl}?q=${ciudadReal}&appid=${this.apiKey}&units=metric&lang=es`;
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error("Error en el Log Pose");
            return await respuesta.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async cargarTodo() {
        const promesas = this.islasConfig.map(async (isla) => {
            const rawData = await this.obtenerDatosClima(isla.ciudadReal);
            if (rawData) return this.mapearDatos(isla, rawData);
        });
        const datos = (await Promise.all(promesas)).filter(d => d !== undefined);
        // Guardamos en localStorage para persistir entre recargas rápidas si es necesario
        localStorage.setItem("datosClima", JSON.stringify(datos));
        return datos;
    }

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
}

export const weatherAPI = new WeatherAPI();