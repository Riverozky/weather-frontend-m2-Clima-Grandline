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
          class="form-control form-control-lg shadow-sm" 
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
        <div class="card h-100 shadow-sm border-0 position-relative">
          
          <div 
            class="position-absolute top-0 end-0 p-3" 
            style="z-index: 10; cursor: pointer; font-size: 1.5rem;"
            @click.stop="toggleFav(isla.nombre)"
          >
            <span :class="esFavorito(isla.nombre) ? 'text-warning' : 'text-light'" style="text-shadow: 0 0 5px rgba(0,0,0,0.5);">
              {{ esFavorito(isla.nombre) ? '★' : '☆' }}
            </span>
          </div>

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
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      islas: [],
      cargando: true,
      busqueda: ''
    };
  },
  computed: {
    // Traemos el estado del usuario para saber si está logueado y sus favoritos
    ...mapState(['user', 'isAuthenticated']),
    
    islasFiltradas() {
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
      this.$router.push({ name: 'Detalle', params: { nombre: nombre } });
    },
    
    // Función para agregar o quitar de favoritos
    toggleFav(nombreIsla) {
      if (!this.isAuthenticated) {
        alert("¡Paren las máquinas! Debes iniciar sesión para marcar favoritos.");
        this.$router.push('/login');
        return;
      }
      // Llamamos a la mutación de Vuex
      this.$store.commit('TOGGLE_FAVORITE', nombreIsla);
    },

    // Función para verificar si una isla ya es favorita
    esFavorito(nombreIsla) {
      if (!this.isAuthenticated || !this.user.favorites) return false;
      return this.user.favorites.includes(nombreIsla);
    }
  }
}
</script>

<style scoped>
/* Un pequeño efecto visual para la estrella */
.text-warning {
  transition: transform 0.2s;
}
.text-warning:hover {
  transform: scale(1.2);
}
</style>