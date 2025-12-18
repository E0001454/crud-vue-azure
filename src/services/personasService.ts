import type { Persona } from "@/types/persona";
import { mockPersonas } from "@/mock/personas";


const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK =
  String(import.meta.env.VITE_USE_MOCK) === 'true' || !API_URL;

// console.log(USE_MOCK)
// console.log(API_URL)

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const personasService = {
    async getAll(): Promise<Persona[]> {
        if (USE_MOCK) {
            await delay(300); 
            return [...mockPersonas];
        }
        const res = await fetch(`${API_URL}/consultar/clientes`);
        return await res.json();
    },

    async getById(id: string): Promise<Persona | undefined> {
        if (USE_MOCK) {
            await delay(200); 
            return mockPersonas.find(p  => p.id === id);
        }
        const res = await fetch(`${API_URL}/consultar/cliente/${id}`);
        return await res.json();
    },

    async create(data: Omit<Persona, 'id'>): Promise<Persona> {
        if (USE_MOCK) {
             await delay(300);
    
            const newPersona: Persona = {
            ...data,
            id: crypto.randomUUID(),
            };

            mockPersonas.push(newPersona); 

            return newPersona;
        }
        const res = await fetch(`${API_URL}/registrar/cliente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return await res.json();
    },

    async update(id: string, data: Partial<Persona>): Promise<Persona> {
        if (USE_MOCK) {
            await delay(300);

            const index = mockPersonas.findIndex(p => p.id === id);
            if (index === -1) throw new Error("Persona no encontrada");

            const current = mockPersonas[index]!;
            const updated: Persona = {
                id: current.id,
                nombre: data.nombre ?? current.nombre,
                apellidoPaterno: data.apellidoPaterno ?? current.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno ?? current.apellidoMaterno,
                correo: data.correo ?? current.correo,
                edad: data.edad ?? current.edad,
                createdAt: data.createdAt ?? current.createdAt,
            };
            mockPersonas[index] = updated;

            return updated;
        }
        const res = await fetch(`${API_URL}/actualizar/cliente/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    },

    async delete(id: string): Promise<void> {
        if (USE_MOCK) {
           await delay(200);

            const index = mockPersonas.findIndex(p => p.id === id);
            if (index !== -1) mockPersonas.splice(index, 1);

            return;
        }
        await fetch(`${API_URL}/eliminar/cliente/${id}`, {
            method: 'DELETE', 
        });
    }
}
