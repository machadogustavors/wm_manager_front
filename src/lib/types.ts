// Tipo do servico padrao
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

// Tipos e interfaces de autenticação
export interface User {
  id: string;
  name: string;
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