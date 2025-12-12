<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Persona } from '@/types/persona';
import { personasService } from '@/services/personasService';

import Modal from '@/components/ui/Modal.vue';
import PersonaForm from '@/components/personas/PersonaForm.vue';
import DeleteModal from '@/components/personas/DeleteModal.vue';

const personas = ref<Persona[]>([]);

const showCreate = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);

const editId = ref<string | null>(null);
const deleteId = ref<string | null>(null);

async function load() {
  personas.value = await personasService.getAll();
}

function openCreate() {
  showCreate.value = true;
}

function openEdit(id: string) {
  editId.value = id;
  showEdit.value = true;
}

function openDelete(id: string) {
  deleteId.value = id;
  showDelete.value = true;
}

onMounted(load);
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Personas</h1>

    <div class="mb-4">
      <button
        @click="openCreate"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Crear Persona
      </button>
    </div>

    <div class="p-4 border rounded-lg bg-white">
      <table class="w-full">
        <thead class="bg-slate-100">
          <tr>
            <th class="p-2 text-left">Nombre</th>
            <th class="p-2 text-left">Correo</th>
            <th class="p-2 text-left">Edad</th>
            <th class="p-2 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr 
            v-for="p in personas" 
            :key="p.id" 
            class="border-t"
          >
            <td class="p-2">
              {{ p.nombre }} {{ p.apellidoPaterno }} {{ p.apellidoMaterno }}
            </td>
            <td class="p-2">{{ p.correo }}</td>
            <td class="p-2">{{ p.edad }}</td>

            <td class="p-2 flex gap-2">
              <button
                @click="openEdit(p.id)"
                class="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Editar
              </button>

              <button
                @click="openDelete(p.id)"
                class="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="!personas.length">
            <td colspan="4" class="p-4 text-center text-slate-500">
              No hay personas registradas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL: Crear -->
    <Modal v-if="showCreate" @close="showCreate = false">
      <PersonaForm
        mode="create"
        :onSuccess="() => { showCreate = false; load(); }"
      />
    </Modal>

    <!-- MODAL: Editar -->
    <Modal v-if="showEdit" @close="showEdit = false">
      <PersonaForm
        :id="editId!"
        mode="edit"
        :onSuccess="() => { showEdit = false; load(); }"
      />
    </Modal>

    <!-- MODAL: Eliminar -->
    <Modal v-if="showDelete" @close="showDelete = false">
      <DeleteModal 
        :id="deleteId!"
        :onDeleted="() => { showDelete = false; load(); }"
      />
    </Modal>
  </div>
</template>