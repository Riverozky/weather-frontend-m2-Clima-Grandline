<template>
  <div class="container my-5" style="max-width: 450px;">
    <div class="card shadow border-0 p-4">
      <h2 class="text-center text-primary fw-bold mb-4">Ingreso a la Tripulación</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email del Pirata</label>
          <input v-model="email" type="email" class="form-control" placeholder="nombre@grandline.com" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" required>
        </div>
        <div v-if="error" class="alert alert-danger p-2 small">{{ error }}</div>
        <button type="submit" class="btn btn-primary w-100 rounded-pill">Zarpar ⚓</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { email: '', password: '', error: null }
  },
  methods: {
    async handleLogin() {
      const success = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      });
      if (success) {
        this.$router.push('/'); 
      } else {
        this.error = "Credenciales incorrectas. ¡Revisa tu Log Pose!";
      }
    }
  }
}
</script>