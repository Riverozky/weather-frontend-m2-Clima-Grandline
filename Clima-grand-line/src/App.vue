<template>
  <div class="weather-app d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          Clima Grand Line 🏴‍☠️
        </router-link>
      </div>
    </nav>

    <router-view></router-view>

    <footer class="text-center py-4 mt-auto bg-light">
      <p class="mb-0 text-muted">Proyecto App Clima - Grand Line</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

