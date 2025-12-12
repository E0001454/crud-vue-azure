<script setup lang="ts">
  import DefaultLayout from '@/layouts/default.vue'
</script>

<template>
  <DefaultLayout>
    <Suspense>
      <RouterView/>
    </Suspense>
  </DefaultLayout>
</template>