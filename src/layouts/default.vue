<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppSidebar from '@/components/layout/AppSidebar.vue';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex font-sans text-slate-900">
    <AppSidebar />

    <main class="flex-1 ml-64 min-h-screen flex flex-col transition-all duration-300">

      <header class="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between shadow-sm">
        <h2 class="text-lg font-semibold text-slate-800 capitalize">
          {{ route.name || 'Panel CRUD' }}
        </h2>
      </header>

      <div class="p-8 flex-1 overflow-y-auto">
        <slot />
      </div>

    </main>
  </div>
</template>