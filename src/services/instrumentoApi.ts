// instrumentoApi.ts
import { getAll, getOne, create, edit, remove, requestFile } from './apiClient';

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

export async function downloadInstrumentoPdf(id: number): Promise<void> {
    const blob = await requestFile(`${endpoint}/${id}/pdf`);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instrumento_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}