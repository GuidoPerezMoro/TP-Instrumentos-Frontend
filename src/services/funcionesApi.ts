// funcionesApi.ts
const API_URL = import.meta.env.VITE_API_URL;

export function getAllInstrumentos() {
    return fetch(`${API_URL}/Instrumentos`)
        .then(res => res.json())
        .then(json => json);
}

export function getOneInstrumento(id: number) {
    return fetch(`${API_URL}/Instrumentos/${id}`)
        .then(res => res.json())
        .then(json => json);
}
