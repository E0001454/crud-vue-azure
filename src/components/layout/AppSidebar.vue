<script setup lang="ts">

import { RouterLink, useRoute } from 'vue-router';
import { LayoutDashboard, Users, LogOut } from 'lucide-vue-next'

const route = useRoute();

const menuItems = [
    {name: 'Dashboard', path: '/', icon: LayoutDashboard },
    {name: 'Clientes', path: '/personas', icon: Users },
    // {name: 'Reportes', path: '/reportes', icon: PieChart },
    // {name: 'Configuración', path: '/settings', icon: Settings },
];

const isActive = (path:string) => route.path === path || (path !== '/' && route.path.startsWith(path))
</script>

<template>
    <aside class="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 shadow-xl z-20">
        <div class="h-16 flex items-center px-6 border-b border-slate-800">
            <div class="flex items-center gap-2 text-blue-400 font-bold text-xl tracking-tight">
                Sistema CRUD
            </div>
        </div>

        <nav class="flex-1 py-6 px-3 space-y-1">
            <RouterLink
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
                :class="isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'"
            >
            <span class="font-medium text-sm">{{ item.name }}</span>
            </RouterLink>
        </nav>

        <div class="p-4 border-t border-slate-800">
            <button class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-red-400">
                <LogOut class="w-5 h-5" />
                <span class="text-sm font-medium">Cerrar Sesión</span>
            </button>

        </div>

    </aside>
</template>