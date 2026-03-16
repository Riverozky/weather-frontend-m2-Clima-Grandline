// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Detalle from './views/Detalle.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/lugar/:nombre', // Ruta dinámica usando el nombre de la isla
        name: 'Detalle',
        component: Detalle,
        props: true 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;