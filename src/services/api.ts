import { useAuthStore } from "@/stores/auth";

export async function apiFetch(
    url:string,
    options: RequestInit = {}
): Promise<Response> {
    const auth = useAuthStore()

    if (!auth.isAuthenticated){
        throw new Error('No estas autenticado')
    }

    return fetch(`/api${url}`,{
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${auth.token}`
        }
    })
}