import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css' // Ahora sí la encontrará

const app = createApp(App)
app.use(router)
app.mount('#app')