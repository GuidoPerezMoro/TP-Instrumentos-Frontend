// Pedido.ts
import { DetallePedido } from "./DetallePedido"
export interface Pedido {
  id: number
  titulo: string
  fecha: Date
  totalPedido: number
  detallesPedido: DetallePedido[]
}