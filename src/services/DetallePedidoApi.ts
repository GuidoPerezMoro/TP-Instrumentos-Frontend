// DetallePedidoApi.ts
import { getAll, getOne, create, edit, remove } from './apiClient';

const endpoint = '/detalle-pedido';

export function getAllDetallePedido() {
    return getAll(endpoint);
}

export function getOneDetallePedido(id: number) {
    return getOne(endpoint, id);
}

export function createDetallePedido(body: object) {
    return create(endpoint, body);
}

export function editDetallePedido(id: number, body: object) {
    return edit(endpoint, id, body);
}

export function deleteDetallePedido(id: number) {
    return remove(endpoint, id);
}
