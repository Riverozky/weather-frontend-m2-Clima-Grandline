export default class WeatherApp {

    constructor(apiClient) {
        this.apiClient = apiClient;

        this.lugares = [
            { id:1, nombre:"Loguetown", lat:35, lon:139, img:"assets/img/loguetown.png"},
            { id:2, nombre:"Alabasta", lat:26, lon:30, img:"assets/img/alabasta.png"},
            { id:3, nombre:"Water 7", lat:45, lon:12, img:"assets/img/water7.png"},
            { id:4, nombre:"Skypiea", lat:28, lon:-16, img:"assets/img/skypeia.png"},
            { id:5, nombre:"Wano", lat:36, lon:138, img:"assets/img/wano.png"}
        ];
    }

    async cargarClimaLugares() {

        for (let lugar of this.lugares) {

            const data = await this.apiClient.obtenerClima(lugar.lat, lugar.lon);

            lugar.tempActual = data.current_weather.temperature;
            lugar.estadoActual = "Clima variable";

            lugar.pronosticoSemanal = data.daily.time.map((dia, i) => {

                return {
                    dia,
                    min: data.daily.temperature_2m_min[i],
                    max: data.daily.temperature_2m_max[i],
                    estado: "Variable"
                }

            });

        }

        return this.lugares;

    }

    obtenerLugarPorNombre(nombre) {
        return this.lugares.find(l => l.nombre === nombre);
    }

generarAlerta(pronostico){

    const stats = this.calcularEstadisticas(pronostico);

    if(stats.promedio > 35){
        return "🔥 Alerta de calor extremo";
    }

    if(stats.minTemp < 0){
        return "❄️ Alerta de frío extremo";
    }

    return "Clima normal esta semana";
}


    calcularEstadisticas(pronostico) {

        let minTemp = Infinity;
        let maxTemp = -Infinity;
        let suma = 0;

        for (let dia of pronostico) {

            if (dia.min < minTemp) minTemp = dia.min;
            if (dia.max > maxTemp) maxTemp = dia.max;

            suma += (dia.min + dia.max) / 2;

        }

        const promedio = (suma / pronostico.length).toFixed(1);

        return {minTemp, maxTemp, promedio};

    }

}

