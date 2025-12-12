<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { personasService } from '@/services/personasService';

const props = defineProps<{
  id?: string;
  mode: "create" | "edit";
  onSuccess: () => void;
}>();

const nombre = ref('');
const apellidoPaterno = ref('');
const apellidoMaterno = ref('');
const correo = ref('');
const edad = ref<number | null>(null);

const isLoading = ref(false);

async function loadData() {
  if (props.mode === "edit" && props.id) {
    const persona = await personasService.getById(props.id);
    if (!persona) return;

    nombre.value = persona.nombre;
    apellidoPaterno.value = persona.apellidoPaterno;
    apellidoMaterno.value = persona.apellidoMaterno;
    correo.value = persona.correo;
    edad.value = persona.edad;
  }
}

onMounted(loadData);

async function submit() {
  if (!nombre.value || !apellidoPaterno.value || !correo.value || !edad.value) return;

  isLoading.value = true;

  if (props.mode === "create") {
    await personasService.create({
      nombre: nombre.value,
      apellidoPaterno: apellidoPaterno.value,
      apellidoMaterno: apellidoMaterno.value,
      correo: correo.value,
      edad: edad.value,
    });
  } else if (props.mode === "edit" && props.id) {
    await personasService.update(props.id, {
      nombre: nombre.value,
      apellidoPaterno: apellidoPaterno.value,
      apellidoMaterno: apellidoMaterno.value,
      correo: correo.value,
      edad: edad.value,
    });
  }

  isLoading.value = false;
  props.onSuccess();
}
</script>

<template>
  <div class="space-y-5">
    <h2 class="text-xl font-semibold">
      {{ props.mode === 'create' ? 'Crear persona' : 'Editar persona' }}
    </h2>

    <div class="grid grid-cols-2 gap-4">
      <input v-model="nombre" placeholder="Nombre" class="border rounded-lg p-2">
      <input v-model="apellidoPaterno" placeholder="Apellido Paterno" class="border rounded-lg p-2">
      <input v-model="apellidoMaterno" placeholder="Apellido Materno" class="border rounded-lg p-2">
      <input v-model="correo" placeholder="Correo" class="border rounded-lg p-2">
      <input type="number" v-model="edad" placeholder="Edad" class="border rounded-lg p-2">
    </div>

    <button
      @click="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      {{ isLoading ? 'Guardando...' : 'Guardar' }}
    </button>
  </div>
</template>