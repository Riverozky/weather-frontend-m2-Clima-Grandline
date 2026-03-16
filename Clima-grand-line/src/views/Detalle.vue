<template>
  <main class="container my-4">
    <div class="mb-4">
      <router-link to="/" class="btn btn-outline-primary">
         Volver al Mapa
      </router-link>
    </div>

    <div v-if="!isla" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 fw-bold">Calculando coordenadas...</p>
    </div>

    <div v-else>
      <section class="card shadow mb-5 border-0 overflow-hidden">
        <div class="row g-0 align-items-center">
          <div class="col-md-5">
            <img :src="isla.img" class="img-fluid h-100 w-100" style="object-fit: cover; min-height: 300px;" :alt="isla.nombre">
          </div>
          <div class="col-md-7">
            <div class="card-body p-4 text-center text-md-start">
              <h2 class="display-5 fw-bold text-primary mb-0">{{ isla.nombre }}</h2>
              <p class="text-muted small mb-3">Conectado con: {{ isla.ciudadReal }}</p>
              
              <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-3">
                <h3 class="display-3 fw-bold mb-0">{{ isla.tempActual }}°C</h3>
                <span class="badge bg-light text-dark border p-2 fs-6 text-capitalize">{{ isla.estadoActual }}</span>
              </div>

              <div class="d-flex gap-2 justify-content-center justify-content-md-start">
                <span class="badge bg-info bg-opacity-10 text-info border border-info p-2">💨 Viento: {{ isla.viento }} km/h</span>
                <span class="badge bg-warning bg-opacity-10 text-warning border border-warning p-2">💧 Humedad: {{ isla.humedad }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="row">
        <div class="col-lg-7 mb-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-white fw-bold py-3 text-primary">📅 Pronóstico de la Semana</div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0 text-center align-middle">
                  <thead class="table-light">
                    <tr><th>Día</th><th class="text-primary">Min</th><th class="text-danger">Max</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="(dia, index) in isla.pronosticoSemanal" :key="index">
                      <td class="text-capitalize fw-bold">{{ dia.dia }}</td>
                      <td class="text-primary">{{ dia.min }}°C</td>
                      <td class="text-danger">{{ dia.max }}°C</td>
                      <td>{{ traducirEstado(dia.estado) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 mb-4">
          <div class="card shadow-sm border-0 h-100 bg-primary text-white">
            <div class="card-body">
              <h4 class="card-title fw-bold mb-4">📊 Análisis de Ruta</h4>
              <div class="row text-center mb-4">
                <div class="col-4">
                  <span class="d-block small opacity-75">Promedio</span>
                  <span class="fs-2 fw-bold">{{ estadisticas.promedio }}°C</span>
                </div>
                <div class="col-4 border-start border-white border-opacity-25">
                  <span class="d-block small opacity-75">Mínima</span>
                  <span class="fs-4">{{ estadisticas.min }}°C</span>
                </div>
                <div class="col-4 border-start border-white border-opacity-25">
                  <span class="d-block small opacity-75">Máxima</span>
                  <span class="fs-4">{{ estadisticas.max }}°C</span>
                </div>
              </div>

              <div class="alert border-0 shadow-sm mb-4" :class="alertaClase">
                <h6 class="fw-bold mb-1">⚠️ Alerta de Navegación:</h6>
                <p class="mb-0 small fw-bold">{{ mensajeAlerta }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Detalle',
  data() {
    return {
      isla: null
    };
  },
  computed: {
    estadisticas() {
      if (!this.isla) return {};
      const pronostico = this.isla.pronosticoSemanal;
      const temps = pronostico.map(d => (d.min + d.max) / 2);
      const min = Math.min(...pronostico.map(d => d.min));
      const max = Math.max(...pronostico.map(d => d.max));
      const promedio = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
      return { min, max, promedio };
    },
    tieneLluvia() {
      return this.isla?.pronosticoSemanal.some(d => d.estado === 'Rain');
    },
    mensajeAlerta() {
      if (!this.isla) return '';
      if (this.estadisticas.promedio > 30) return "🔥 Alerta de Calor: Riesgo de evaporación.";
      if (this.tieneLluvia) return "🌧️ Alerta de Tormenta: Aseguren el timón.";
      return "⚓ Log Pose estable: Condiciones óptimas.";
    },
    alertaClase() {
      if (this.estadisticas.promedio > 30) return "bg-danger text-white";
      if (this.tieneLluvia) return "bg-info text-dark";
      return "bg-success text-white";
    }
  },
  mounted() {
    // Leemos los datos desde el localStorage que guardamos en la vista principal
    const datos = JSON.parse(localStorage.getItem("datosClima"));
    const nombreRuta = this.$route.params.nombre; // Obtenemos el parámetro de Vue Router
    
    if (datos) {
      this.isla = datos.find(i => i.nombre === nombreRuta);
    }
    
    // Si recarga directamente en detalle y no hay datos, lo mandamos al inicio
    if (!this.isla) {
      this.$router.push('/');
    }
  },
  methods: {
    traducirEstado(estado) {
      const iconos = { 'Clear': '☀️ Despejado', 'Clouds': '☁️ Nublado', 'Rain': '🌧️ Lluvia', 'Snow': '❄️ Nieve' };
      return iconos[estado] || estado;
    }
  }
}
</script>