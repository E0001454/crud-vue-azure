import type { Persona } from "@/types/persona"
import { mockPersonas } from "@/mock/personas"

const USE_MOCK = false

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const PROXY_URL =
  import.meta.env.VITE_PERSONAS_PROXY_URL ||
  'http://localhost:7071/api/personas-proxy' 

export const personasService = { 
  async getAll(): Promise<Persona[]> {
    if (USE_MOCK) {
      await delay(300)
      return [...mockPersonas]
    }

    const res = await fetch(PROXY_URL)
    if (!res.ok) throw new Error('Error al obtener personas')
    return await res.json()
  },

  async getById(id: string): Promise<Persona | undefined> {
    if (USE_MOCK) {
      await delay(200)
      return mockPersonas.find(p => p.id === id)
    }

    const res = await fetch(`${PROXY_URL}?id=${id}`)
    if (!res.ok) throw new Error('Error al obtener persona')
    return await res.json()
  },

  async create(data: Omit<Persona, 'id'>): Promise<Persona> {
    if (USE_MOCK) {
      await delay(300)
      const newPersona: Persona = { ...data, id: crypto.randomUUID() }
      mockPersonas.push(newPersona)
      return newPersona
    }

    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error('Error al crear persona')
    return await res.json()
  },

  async update(id: string, data: Partial<Persona>): Promise<Persona> {
    if (USE_MOCK) {
      await delay(300)
      const index = mockPersonas.findIndex(p => p.id === id)
      if (index === -1) throw new Error('Persona no encontrada')

      const updated = { ...mockPersonas[index], ...data } as Persona
      mockPersonas[index] = updated
      return updated
    }

    const res = await fetch(`${PROXY_URL}?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error('Error al actualizar persona')
    return await res.json()
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK) {
      await delay(200)
      const index = mockPersonas.findIndex(p => p.id === id)
      if (index !== -1) mockPersonas.splice(index, 1)
      return
    }

    const res = await fetch(`${PROXY_URL}?id=${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) throw new Error('Error al eliminar persona')
  }
}