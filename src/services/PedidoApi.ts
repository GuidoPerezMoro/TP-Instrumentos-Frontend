// PedidoApi.ts
import { getAll, getOne, create, edit, remove } from './apiClient';

const endpoint = '/pedido';

export function getAllPedido() {
    return getAll(endpoint);
}

export function getOnePedido(id: number) {
    return getOne(endpoint, id);
}

export function createPedido(body: object) {
    return create(endpoint, body);
}

export function editPedido(id: number, body: object) {
    return edit(endpoint, id, body);
}

export function deletePedido(id: number) {
    return remove(endpoint, id);
}

