export interface Service {
    id: number;
    date: string | null;
    client_name: string | null;
    car_model: string | null;
    license_plate: string | null;
    parts_cost: number | null;
    labor_cost: number | null;
    mechanic: string | null;
    service_description: string | null;
    created_at: string | null;
    total_cost: number;
    parts_store_cost: number;
    parts_store_profit: number;
    payment: string | null;
}