// instrumentoApi.ts
import { getAll, getOne, create, edit, remove } from './apiClient';

const endpoint = '/instrumento';

export function getAllInstrumentos() {
    return getAll(endpoint);
}

export function getOneInstrumento(id: number) {
    return getOne(endpoint, id);
}

export function createInstrumento(body: object) {
    return create(endpoint, body);
}

export function editInstrumento(id: number, body: object) {
    return edit(endpoint, id, body);
}

export function deleteInstrumento(id: number) {
    return remove(endpoint, id);
}
