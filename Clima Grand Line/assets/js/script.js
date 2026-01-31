const lugares = [
    {
        id: 1,
        nombre: "Loguetown",
        tempActual: 24,
        estadoActual: "Lluvioso",
        img: "assets/img/loguetown.png",
        viento: 15,
        humedad: 80,
        pronosticoSemanal: [
            { dia: "Lunes", min: 20, max: 25, estado: "Lluvioso" },
            { dia: "Martes", min: 19, max: 24, estado: "Nublado" },
            { dia: "Miércoles", min: 21, max: 26, estado: "Lluvioso" },
            { dia: "Jueves", min: 22, max: 27, estado: "Soleado" },
            { dia: "Viernes", min: 20, max: 24, estado: "Lluvioso" }
        ]
    },
    {
        id: 2,
        nombre: "Alabasta",
        tempActual: 45,
        estadoActual: "Soleado",
        img: "assets/img/alabasta.png",
        viento: 10,
        humedad: 10,
        pronosticoSemanal: [
            { dia: "Lunes", min: 38, max: 45, estado: "Soleado" },
            { dia: "Martes", min: 40, max: 46, estado: "Soleado" },
            { dia: "Miércoles", min: 39, max: 44, estado: "Soleado" },
            { dia: "Jueves", min: 37, max: 43, estado: "Soleado" },
            { dia: "Viernes", min: 36, max: 42, estado: "Soleado" }
        ]
    },
    {
        id: 3,
        nombre: "Water 7",
        tempActual: 22,
        estadoActual: "Nublado",
        img: "assets/img/water7.png",
        viento: 30,
        humedad: 90,
        pronosticoSemanal: [
            { dia: "Lunes", min: 18, max: 22, estado: "Lluvioso" },
            { dia: "Martes", min: 19, max: 23, estado: "Nublado" },
            { dia: "Miércoles", min: 20, max: 24, estado: "Nublado" },
            { dia: "Jueves", min: 21, max: 25, estado: "Lluvioso" },
            { dia: "Viernes", min: 19, max: 23, estado: "Nublado" }
        ]
    },
    {
        id: 4,
        nombre: "Skypiea",
        tempActual: 15,
        estadoActual: "Ventoso",
        img: "assets/img/skypeia.png",
        viento: 50,
        humedad: 60,
        pronosticoSemanal: [
            { dia: "Lunes", min: 12, max: 16, estado: "Ventoso" },
            { dia: "Martes", min: 13, max: 17, estado: "Ventoso" },
            { dia: "Miércoles", min: 14, max: 18, estado: "Soleado" },
            { dia: "Jueves", min: 13, max: 17, estado: "Ventoso" },
            { dia: "Viernes", min: 12, max: 16, estado: "Nublado" }
        ]
    },
    {
        id: 5,
        nombre: "Wano",
        tempActual: 18,
        estadoActual: "Nieve",
        img: "assets/img/wano.png",
        viento: 20,
        humedad: 50,
        pronosticoSemanal: [
            { dia: "Lunes", min: 5, max: 10, estado: "Nieve" },
            { dia: "Martes", min: 6, max: 11, estado: "Nieve" },
            { dia: "Miércoles", min: 7, max: 12, estado: "Nublado" },
            { dia: "Jueves", min: 6, max: 11, estado: "Nieve" },
            { dia: "Viernes", min: 5, max: 10, estado: "Nieve" }
        ]
    }
];

function obtenerLugarPorNombre(nombre) {
    return lugares.find(lugar => lugar.nombre === nombre);
}

function calcularEstadisticas(pronostico) {
    let minTemp = Infinity;
    let maxTemp = -Infinity;
    let suma = 0;
    let conteoEstados = { "Soleado": 0, "Lluvioso": 0, "Nieve": 0 };

    for (let dia of pronostico) {
        if (dia.min < minTemp) minTemp = dia.min;
        if (dia.max > maxTemp) maxTemp = dia.max;

        suma += (dia.min + dia.max) / 2;

        let estado = dia.estado.toLowerCase();
        if(estado.includes("sol")) conteoEstados["Soleado"]++;
        else if(estado.includes("lluv")) conteoEstados["Lluvioso"]++;
        else if(estado.includes("nieve")) conteoEstados["Nieve"]++;
    }

    const promedio = (suma / pronostico.length).toFixed(1);

    let resumen = "Semana con clima variable.";
    if (conteoEstados["Soleado"] > 2) {
        resumen = "Semana mayormente soleada ☀️.";
    } else if (conteoEstados["Lluvioso"] >= 2) {
        resumen = "Semana inestable con lluvias 🌧️.";
    } else if (conteoEstados["Nieve"] >= 2) {
        resumen = "Semana muy fría con nieve ❄️.";
    }

    return { minTemp, maxTemp, promedio, conteoEstados, resumen };
}

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("contenedor-tarjetas");

    if (contenedor) {
        lugares.forEach(lugar => {
            contenedor.innerHTML += `
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="place-card card h-100 shadow-sm border-0">
                        <img src="${lugar.img}" class="card-img-top" style="height:150px; object-fit:cover">
                        <div class="card-body text-center">
                            <h5 class="place-card__name card-title fw-bold">${lugar.nombre}</h5>
                            <p class="place-card__temp my-2 display-6">${lugar.tempActual}°C</p>
                            <p class="text-muted mb-3">${lugar.estadoActual}</p>
                            <button class="btn btn-primary w-100 rounded-pill btn-detalle" data-nombre="${lugar.nombre}">
                                Ver Detalle
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelectorAll(".btn-detalle").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.setItem("lugarSeleccionado", btn.dataset.nombre);
                window.location.href = "detalle.html";
            });
        });
    }

    if (document.getElementById("nombre-ciudad")) {
        const nombreGuardado = localStorage.getItem("lugarSeleccionado");
        const lugar = obtenerLugarPorNombre(nombreGuardado);

        if (!lugar) {
            window.location.href = "index.html";
            return;
        }

        document.getElementById("nombre-ciudad").innerText = lugar.nombre;
        document.getElementById("temp-actual").innerText = lugar.tempActual + "°C";
        document.getElementById("estado-clima").innerText = lugar.estadoActual;
        document.getElementById("viento").innerText = lugar.viento;
        document.getElementById("humedad").innerText = lugar.humedad;
        document.getElementById("img-detalle").src = lugar.img;

        const tablaBody = document.getElementById("pronostico-dias"); 
        if (tablaBody) {
            tablaBody.innerHTML = lugar.pronosticoSemanal
                .map(d => `
                    <tr>
                        <td class="fw-bold">${d.dia}</td>
                        <td class="text-primary">${d.min}°C</td>
                        <td class="text-danger">${d.max}°C</td>
                        <td>${d.estado}</td>
                    </tr>
                `)
                .join("");
        }

        const stats = calcularEstadisticas(lugar.pronosticoSemanal);

        const statProm = document.getElementById("stat-promedio");
        const statMin = document.getElementById("stat-min");
        const statMax = document.getElementById("stat-max");
        const statResumen = document.getElementById("resumen-texto");
        const statSol = document.getElementById("dias-soleados");
        const statLluvia = document.getElementById("dias-lluviosos");

        if (statProm) statProm.innerText = stats.promedio + "°C";
        if (statMin) statMin.innerText = stats.minTemp + "°C";
        if (statMax) statMax.innerText = stats.maxTemp + "°C";
        if (statResumen) statResumen.innerText = stats.resumen;
        if (statSol) statSol.innerText = stats.conteoEstados["Soleado"] || 0;
        if (statLluvia) statLluvia.innerText = stats.conteoEstados["Lluvioso"] || 0;
    }
});