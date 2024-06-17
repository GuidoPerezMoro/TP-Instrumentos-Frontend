// PedidoApi.ts
import User from '../types/User';
import { getAll, getOne, create, edit, remove, request } from './apiClient';

const endpoint = '/usuario';

export function getAllUsuario() {
    return getAll(endpoint);
}

export function getOneUsuario(id: number) {
    return getOne(endpoint, id);
}

export function createUsuario(body: object) {
    return create(endpoint, body);
}

export function editUsuario(id: number, body: object) {
    return edit(endpoint, id, body);
}

export function deleteUsuario(id: number) {
    return remove(endpoint, id);
}

export async function getByUsername(username: string): Promise<User> {
    const endpoint2 = `${endpoint}/getByUsername?username=${encodeURIComponent(username)}`;
    const response = await request(endpoint2, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response as User;
}

export async function getByUsernameAndPassword(username: string, password: string): Promise<User> {
    const endpoint3 = `${endpoint}/getByUsernameAndPassword?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    console.log(endpoint3);
    const response = await request(endpoint3, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response as User;
}

