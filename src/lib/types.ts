// Tipo base para criação de serviço
export interface ServiceBase {
    date?: string | null;
    client_name?: string | null;
    car_model?: string | null;
    license_plate?: string | null;
    parts_cost?: number | null;
    labor_cost?: number | null;
    mechanic?: string | null;
    service_description?: string | null;
    payment?: string | null;
}

export interface Service extends ServiceBase {
    id_servico: number;
    created_at: string | null;
    total_cost: number;
    parts_store_cost: number;
    parts_store_profit: number;
}

// Tipos e interfaces de autenticação
export interface User {
  id: string;
  name: string;
  access_token: string;
  email: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  birthdate: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  confirmAccount: (data: { username: string; confirmation_code: string }) => Promise<void>;
}

export interface ServiceFilter {
  date?: string; // yyyy-mm-dd
  month?: string; // yyyy-mm
  year?: string; // yyyy
  client_name?: string;
  car_model?: string;
  license_plate?: string;
  mechanic?: string;
}