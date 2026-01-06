import { defineStore } from 'pinia'

interface AuthState{
    token: string | null
    expiresAt: number | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token:localStorage.getItem('token'),
        expiresAt:Number(localStorage.getItem('expiresAt')) || null        
    }),

    getters: {
        isAuthenticated(state): boolean{
            return !!state.token && !!state.expiresAt && Date.now() < state.expiresAt
        }
    },

    actions: {
        setSession(token: string, expiresIn: number){
            const expiresAt = Date.now() + expiresIn * 1000

            this.token = token
            this.expiresAt = expiresAt

            localStorage.setItem('token', token)
            localStorage.setItem('expiresAt', String(expiresAt))
            
        },

        logout(){
            this.token = null
            this.expiresAt = null

            localStorage.removeItem('token')
            localStorage.removeItem('expiresAt')
        }
    }
})