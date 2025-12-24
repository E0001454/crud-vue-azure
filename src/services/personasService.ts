import type { Persona } from "@/types/persona"
import { mockPersonas } from "@/mock/personas"

const USE_MOCK = false
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const API_BASE =
  import.meta.env.VITE_PERSONAS_PROXY_URL ||
  'http://localhost:7071/api/personas-proxy'

export const personasService = {
  async getAll(): Promise<Persona[]> {
    if (USE_MOCK) {
      await delay(300)
      return [...mockPersonas]
    }
    const res = await fetch(API_BASE)
    return await res.json()
  },

  async getById(id: string): Promise<Persona | undefined> {
    if (USE_MOCK) {
      await delay(200)
      return mockPersonas.find(p => p.id === id)
    }
    const res = await fetch(`${API_BASE}?id=${id}`)
    return await res.json()
  },

  async create(data: Omit<Persona, 'id'>): Promise<Persona> {
    if (USE_MOCK) {
      await delay(300)
      const p: Persona = { ...data, id: crypto.randomUUID() }
      mockPersonas.push(p)
      return p
    }
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await res.json()
  },

  async update(id: string, data: Partial<Persona>): Promise<Persona> {
    if (USE_MOCK) {
      await delay(300)
      const i = mockPersonas.findIndex(p => p.id === id)
      if (i === -1) throw new Error('No encontrada')
      mockPersonas[i] = { ...mockPersonas[i], ...data } as Persona
      return mockPersonas[i]
    }
    const res = await fetch(`${API_BASE}?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await res.json()
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK) {
      await delay(200)
      const i = mockPersonas.findIndex(p => p.id === id)
      if (i !== -1) mockPersonas.splice(i, 1)
      return
    }
    await fetch(`${API_BASE}?id=${id}`, { method: 'DELETE' })
  }
}
