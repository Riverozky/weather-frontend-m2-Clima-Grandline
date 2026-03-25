import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Detalle from './views/Detalle.vue';
import Login from './views/Login.vue'; 
import store from './store'; 

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/lugar/:nombre', name: 'Detalle', component: Detalle, props: true },
  { 
    path: '/favoritos', 
    name: 'Favoritos', 
    component: () => import('./views/Favoritos.vue'), 
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;