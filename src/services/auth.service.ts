interface LoginResponse {
    access_token: string
    expires_in: number
    token_type: string
    refresh_token?: string
}

export async function login(
    username: string,
    password: string
): Promise<LoginResponse>{
    const body = new URLSearchParams({
        grant_type: 'password',
        client_id: import.meta.env.VITE_CLIENT_ID,
        username,
        password,
        scope: import.meta.env.VITE_SCOPE
    })

    const res = await fetch(import.meta.env.VITE_TOKEN_URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })

    if (!res.ok){
        throw new Error('Inicio de sesion fallido')
    }

    return await res.json()
}