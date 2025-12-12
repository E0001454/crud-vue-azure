// mock/personas.json.ts
import type { Persona } from "@/types/persona";

export const mockPersonas: Persona[] = [
    { id: '1', nombre: 'Luis', apellidoPaterno: 'Vasquez', apellidoMaterno: 'Gomez', correo: 'luis@demo.com', edad: 28, createdAt: '2024-01-15' },
    { id: '2', nombre: 'Ana', apellidoPaterno: 'Lopez', apellidoMaterno: 'Martinez', correo: 'ana@demo.com', edad: 34, createdAt: '2024-02-20' },
    { id: '3', nombre: 'Carlos', apellidoPaterno: 'Ramirez', apellidoMaterno: 'Hernandez', correo: 'carlos@demo.com', edad: 45, createdAt: '2024-03-10' },
];