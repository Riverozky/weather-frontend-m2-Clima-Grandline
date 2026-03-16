<template>
  <main class="container flex-grow-1 my-4">
    <header class="text-center mb-5">
      <h1 class="display-4 fw-bold text-primary">El clima en la Grand Line</h1>
      <p class="lead text-muted">Datos reales obtenidos mediante Log Pose (API)</p>
    </header>

    <div class="row justify-content-center mb-4">
      <div class="col-md-6">
        <input 
          type="text" 
          class="form-control form-control-lg" 
          placeholder="Buscador de islas..." 
          v-model="busqueda"
        >
      </div>
    </div>

    <div v-if="cargando" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 fw-bold">Sincronizando Log Pose...</p>
    </div>

    <section v-else class="row">
      <div v-show="islasFiltradas.length === 0" class="col-12 text-center text-muted">
        <h4>No se encontró ninguna isla con ese nombre.</h4>
      </div>

      <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="isla in islasFiltradas" :key="isla.nombre">
        <div class="card h-100 shadow-sm border-0">
          <img :src="isla.img" class="card-img-top" style="height:180px; object-fit:cover" :alt="isla.nombre">
          <div class="card-body text-center">
            <h5 class="fw-bold text-primary">{{ isla.nombre }}</h5>
            <p class="display-6 my-2">{{ isla.tempActual }}°C</p>
            <p class="text-muted text-capitalize">{{ isla.estadoActual }}</p>
            <button class="btn btn-primary w-100 rounded-pill" @click="verDetalle(isla.nombre)">
              Ver Detalle
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { weatherAPI } from '../services/WeatherAPI';

export default {
  name: 'Home',
  data() {
    return {
      islas: [],
      cargando: true,
      busqueda: '' // Variable atada al input con v-model
    };
  },
  computed: {
    islasFiltradas() {
      // Filtra de forma reactiva a medida que el usuario escribe
      return this.islas.filter(isla => 
        isla.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  },
  async mounted() {
    this.islas = await weatherAPI.cargarTodo();
    this.cargando = false;
  },
  methods: {
    verDetalle(nombre) {
      // Navegación con Vue Router
      this.$router.push({ name: 'Detalle', params: { nombre: nombre } });
    }
  }
}
</script>