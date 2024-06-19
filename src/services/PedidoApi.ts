// PedidoApi.ts
import { getAll, getOne, create, edit, remove, request } from './apiClient';

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

export function getPedidosByMonthYear() {
    return request(`${endpoint}/getByMonthYear`);
}

export async function downloadPedidosExcel(startDate: string, endDate: string): Promise<void> {
    if (!startDate || !endDate) {
        alert('Por favor, selecciona ambas fechas.');
        return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}/excel?fechaDesde=${formattedStartDate}&fechaHasta=${formattedEndDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error: ${response.status} - ${response.statusText}: ${errorText}`);
            alert('Failed to download Excel file');
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Pedidos_${formattedStartDate}_to_${formattedEndDate}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading Excel:', error);
        alert('Failed to download Excel file');
    }
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

