import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { httpClient } from '@src/services/httpClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  confirmAccount: (data: { username: string; confirmation_code: string }) => Promise<void>;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  birthdate: string;
}

const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@WMManager:user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const isAuthenticated = !!user;

  const signIn = useCallback(async ({ username, password }: SignInCredentials) => {
    try {
      const response = await httpClient.post('/auth/sign-in', {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@WMManager:token', token);
      localStorage.setItem('@WMManager:user', JSON.stringify(user));

      httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    try {
      await httpClient.post('/auth/sign-up', data);
    } catch (error) {
      throw new Error('Error creating account');
    }
  }, []);

  const confirmAccount = useCallback(async (data: { username: string; confirmation_code: string }) => {
    try {
      await httpClient.post('/auth/confirm', data);
    } catch (error) {
      throw new Error('Erro ao confirmar conta');
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@WMManager:token');
    localStorage.removeItem('@WMManager:user');
    setUser(null);
    delete httpClient.defaults.headers.common.Authorization;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut, confirmAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
