import {createRouter, createWebHistory } from 'vue-router';

export const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/Home.vue')
        },
        {
            path: '/personas',
            name: 'Personas',
            component: () => import('@/pages/personas/index.vue')
        },
    ]

});