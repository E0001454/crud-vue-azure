<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';
import { LayoutDashboard, Users, LogOut } from 'lucide-vue-next'
import { useMicrofrontendStore } from '@/stores/microfrontend';

const router = useRouter();
const route = useRoute();
const mfStore = useMicrofrontendStore();

const handleClick = (item: any) => {
    if(item.type === 'internal') {
        mfStore.clear()
        router.push(item.path)
    } else {
        mfStore.setExternal(item.url)
        router.push('/')
    }
}

const isActiveItem = (item:any) => {
    if(item.type === 'external'){
        return mfStore.currentUrl === item.url
    }
    return route.path === item.path && !mfStore.currentUrl
}

const menuItems = [
    {name: 'Dashboard', type:'internal',  path: '/', icon: LayoutDashboard },
    {name: 'People', type:'internal',  path: '/personas', icon: Users },
    {name: 'Responsys', type:'external',  url: 'https://wonderful-ground-09f55cc1e.3.azurestaticapps.net', icon: Users },
    // {name: 'Configuración', path: '/settings', icon: Settings },
];


</script>

<template>
    <aside class="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 shadow-xl z-20">
        <div class="h-16 flex items-center px-6 border-b border-slate-800">
            <div class="flex items-center gap-2 text-blue-400 font-bold text-xl tracking-tight">
                Sistema CRUD
            </div>
        </div>

        <nav class="flex-1 py-6 px-3 space-y-1">
            <div
                v-for="item in menuItems"
                :key="item.name"
                @click="handleClick(item)"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
                :class="isActiveItem(item)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'"
            >
            <span class="font-medium text-sm">{{ item.name }}</span>
        </div>
        </nav>

        <div class="p-4 border-t border-slate-800">
            <button class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-red-400">
                <LogOut class="w-5 h-5" />
                <span class="text-sm font-medium">Cerrar Sesión</span>
            </button>

        </div>

    </aside>
</template>