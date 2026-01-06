import {createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
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
    {
        path: '/uploads',
        name: 'Uploads',
        component: () => import('@/pages/uploads/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/auth/login.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Guard
router.beforeEach( (to) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated){
        return { name: 'Login' }
    }

    if (to.name === 'Login' && auth.isAuthenticated){
        return { name: 'Home' }
    }
})

export default router