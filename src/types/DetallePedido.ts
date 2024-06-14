// DetallePedido.ts
import {Instrumento} from "./Instrumento";

export interface DetallePedido {
    id: number
    cantidad: number
    instrumento: Instrumento
}