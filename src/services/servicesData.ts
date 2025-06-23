import { httpClient } from '@src/services/httpClient';
import { Service } from '@src/lib/types';

export interface CreateServiceRequest {
    date: string;
    client_name: string;
    car_model: string;
    license_plate: string;
    parts_cost: string;
    labor_cost: string;
    mechanic: string;
    service_description: string;
    payment: string;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
    id: number;
}

export async function getServices(): Promise<Service[]> {
    const response = await httpClient.get('/services/get');
    return response.data;
}

export async function createService(data: CreateServiceRequest): Promise<Service> {
    const response = await httpClient.post('/services/create', data);
    return response.data;
}

export async function updateService(id: number, data: UpdateServiceRequest): Promise<Service> {
    const response = await httpClient.put(`/services/update/${id}`, data);
    return response.data;
}

export async function deleteService(id: number): Promise<void> {
    await httpClient.post(`/services/delete/${id}`);
}