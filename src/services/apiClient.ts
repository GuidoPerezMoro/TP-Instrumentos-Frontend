// apiClient.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function request(endpoint: string, options?: RequestInit): Promise<any> {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
}

export function getAll(endpoint: string): Promise<any> {
    return request(endpoint);
}

export function getOne(endpoint: string, id: number): Promise<any> {
    return request(`${endpoint}/${id}`);
}

export function create(endpoint: string, body: object): Promise<any> {
    return request(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function edit(endpoint: string, id: number, body: object): Promise<any> {
    return request(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function remove(endpoint: string, id: number): Promise<any> {
    return request(`${endpoint}/${id}`, {
        method: 'DELETE',
    });
}

export async function requestFile(endpoint: string, options?: RequestInit): Promise<Blob> {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const blob = await res.blob();
    return blob;
}
