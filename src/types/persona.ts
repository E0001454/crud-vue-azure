// types/persona.ts
export interface Persona {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  edad: number;
  createdAt?:string
}