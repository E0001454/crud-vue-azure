<script setup lang="ts">
import { personasService } from '@/services/personasService';

const props = defineProps<{
  id: string;
  onDeleted: () => void;
}>();

async function eliminar() {
  await personasService.delete(props.id);
  props.onDeleted();
}
</script>

<template>
  <div class="text-center space-y-6">
    <h2 class="text-xl font-semibold text-red-600">Eliminar Persona</h2>
    <p>¿Seguro que deseas eliminar esta persona?</p>

    <div class="flex justify-center gap-4">
      <button
        class="px-4 py-2 bg-slate-300 rounded-lg"
        @click="$emit('close')"
      >
        Cancelar
      </button>

      <button
        class="px-4 py-2 bg-red-600 text-white rounded-lg"
        @click="eliminar"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>