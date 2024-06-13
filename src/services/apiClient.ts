// apiClient.ts
const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint: string, options?: RequestInit) {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
}

export function getAll(endpoint: string) {
    return request(endpoint);
}

export function getOne(endpoint: string, id: number) {
    return request(`${endpoint}/${id}`);
}

export function create(endpoint: string, body: object) {
    return request(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function edit(endpoint: string, id: number, body: object) {
    return request(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function remove(endpoint: string, id: number) {
    return request(`${endpoint}/${id}`, {
        method: 'DELETE',
    });
}
