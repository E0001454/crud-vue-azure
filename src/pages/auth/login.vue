<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { login } from '@/services/auth.service';

const username = ref<string>('')
const password = ref<string>('')
const error = ref<string | null>(null)

const router = useRouter()
const auth = useAuthStore()

const submit = async (): Promise<void> => {
    error.value = null
    try {
        const res = await login(username.value, password.value)
        auth.setSession(res.access_token, res.expires_in)
        router.push('/')
    } catch {
        error.value = 'Credenciales incorrectas'
    }
}

</script>

<template>
    <form @submit.prevent="submit">
        <input v-model="username" placeholder="usuario" type="text">
        <input v-model="password"  type="password" placeholder="Contraseña">
        <button>Entrar</button>
        <p v-if="error">{{  error  }}</p>
    </form>

</template>