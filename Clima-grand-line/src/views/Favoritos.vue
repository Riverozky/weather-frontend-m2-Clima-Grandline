<template>
  <div class="container my-4">
    <h2 class="fw-bold text-primary mb-4">Mis Islas Favoritas</h2>
    
    <div v-if="misFavoritos.length === 0" class="alert alert-info">
      Aún no has marcado ninguna isla como favorita en tu Log Pose.
    </div>

    <div class="row" v-else>
      <div class="col-md-4 mb-4" v-for="isla in misFavoritos" :key="isla.nombre">
        <div class="card h-100 shadow-sm border-0">
          <img :src="isla.img" class="card-img-top" style="height:150px; object-fit:cover">
          <div class="card-body text-center">
            <h5 class="fw-bold">{{ isla.nombre }}</h5>
            <button class="btn btn-sm btn-danger mt-2" @click="quitarFav(isla.nombre)">Quitar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    misFavoritos() {
      const todasLasIslas = JSON.parse(localStorage.getItem("datosClima")) || [];
      const nombresFavs = this.$store.state.user?.favorites || [];
      
      return todasLasIslas.filter(isla => nombresFavs.includes(isla.nombre));
    }
  },
  methods: {
    quitarFav(nombre) {
      this.$store.commit('TOGGLE_FAVORITE', nombre);
    }
  }
}
</script>