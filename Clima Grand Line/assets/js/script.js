const ciudades = [
    { nombre: "Loguetown", temp: 24, estado: "Lluvioso", img: "assets/img/loguetown.png", viento: 15, humedad: 80 },
    { nombre: "Alabasta", temp: 45, estado: "Soleado", img: "assets/img/alabasta.png", viento: 10, humedad: 10 },
    { nombre: "Water 7", temp: 22, estado: "Nublado", img: "assets/img/water7.png", viento: 30, humedad: 90 },
    { nombre: "Skypiea", temp: 15, estado: "Ventoso", img: "assets/img/skypeia.png", viento: 50, humedad: 60 },
    { nombre: "Wano", temp: 18, estado: "Nieve", img: "assets/img/wano.png", viento: 20, humedad: 50 },
    { nombre: "Dressrosa", temp: 30, estado: "Soleado", img: "assets/img/dressrosa.png", viento: 12, humedad: 40 },
    { nombre: "Whole Cake", temp: 28, estado: "Dulce", img: "assets/img/whole cake.png", viento: 5, humedad: 70 },
    { nombre: "Zou", temp: 26, estado: "Húmedo", img: "assets/img/zou.png", viento: 25, humedad: 85 },
    { nombre: "Marineford", temp: 20, estado: "Tormenta", img: "assets/img/marineford.png", viento: 60, humedad: 75 },
    { nombre: "Laugh Tale", temp: 25, estado: "Despejado", img: "assets/img/laughtale.png", viento: 10, humedad: 55 },
];

document.addEventListener("DOMContentLoaded", function() {

    const contenedor = document.getElementById("contenedor-tarjetas");

    if (contenedor) {
        ciudades.forEach((ciudad, index) => {
            const tarjetaHTML = `
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${ciudad.img}" class="card-img-top" alt="${ciudad.nombre}" style="height: 150px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title text-danger fw-bold">${ciudad.nombre}</h5>
                            <p class="card-text display-6">${ciudad.temp}°C</p>
                            <p class="card-text text-muted">${ciudad.estado}</p>
                            <button class="btn btn-primary w-100 btn-detalle" data-index="${index}">Ver Detalle</button>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += tarjetaHTML;
        });

        const botones = document.querySelectorAll(".btn-detalle");
        botones.forEach(btn => {
            btn.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                localStorage.setItem("ciudadSeleccionada", JSON.stringify(ciudades[index]));
                window.location.href = "detalle.html";
            });
        });
    }

    const tituloCiudad = document.getElementById("nombre-ciudad");
    
    if (tituloCiudad) {
        const ciudadGuardada = localStorage.getItem("ciudadSeleccionada");
        
        if (ciudadGuardada) {
            const datos = JSON.parse(ciudadGuardada);

            document.getElementById("nombre-ciudad").innerText = datos.nombre;
            document.getElementById("temp-actual").innerText = datos.temp + "°C";
            document.getElementById("estado-clima").innerText = datos.estado;
            document.getElementById("viento").innerText = datos.viento;
            document.getElementById("humedad").innerText = datos.humedad;
            document.getElementById("img-detalle").src = datos.img;
        } else {
            window.location.href = "index.html";
        }
    }
});