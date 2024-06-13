import { Categoria } from './Categoria';

export interface Instrumento {
    id: number
    instrumento: string
    marca: string
    modelo: string
    imagen: string
    precio: number
    costoEnvio: string
    cantidadVendida: string
    descripcion: string
    categoria: Categoria
}