<template>
  <div class="weather-app d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">Clima Grand Line 🏴‍☠️</router-link>
        
        <div class="ms-auto d-flex align-items-center">
          <template v-if="isAuthenticated">
            <span class="text-white me-3 small">Bienvenido, <strong>{{ user.username }}</strong></span>
            <router-link to="/favoritos" class="btn btn-sm btn-warning me-2">Favoritos</router-link>
            <button @click="logout" class="btn btn-sm btn-outline-light">Cerrar Sesión</button>
          </template>
          
          <router-link v-else to="/login" class="btn btn-light btn-sm">Iniciar Sesión</router-link>
        </div>
      </div>
    </nav>

    <router-view></router-view>

    <footer class="text-center py-4 mt-auto bg-light">
      <p class="mb-0 text-muted">Proyecto App Clima - Usuario: {{ isAuthenticated ? user.username : 'Invitado' }}</p>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT');
      this.$router.push('/login');
    }
  }
}
</script>