// categoriaApi.ts
import { getAll, getOne, create, edit, remove } from './apiClient';

const endpoint = '/categoria';

export function getAllCategorias() {
    return getAll(endpoint);
}

export function getOneCategoria(id: number) {
    return getOne(endpoint, id);
}

export function createCategoria(body: object) {
    return create(endpoint, body);
}

export function editCategoria(id: number, body: object) {
    return edit(endpoint, id, body);
}

export function deleteCategoria(id: number) {
    return remove(endpoint, id);
}
