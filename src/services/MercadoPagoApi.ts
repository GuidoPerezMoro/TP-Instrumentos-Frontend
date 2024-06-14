// MercadoPagoApi.ts
import { Pedido } from '../types/Pedido';
import { PreferenceMp } from '../types/PreferenceMp';
import { request } from './apiClient';

const endpoint = '/pedido/create-preference-mp';

export async function createPreferenceMP(pedido?: Pedido): Promise<PreferenceMp> {
    const response = await request(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
    });
    return response as PreferenceMp;
}