// Instrumento.ts
import { Categoria } from './Categoria';
export interface Instrumento {
    id: number
    instrumento: string
    marca: string
    modelo: string
    imagen: string
    precio: number
    costoEnvio: string
    cantidadVendida: number
    descripcion: string
    categoria: Categoria
}