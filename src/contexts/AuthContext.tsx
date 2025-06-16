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
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
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
      const response = await httpClient.post('/auth/login', {
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

  const signUp = useCallback(async ({ name, email, password }: SignUpData) => {
    try {
      await httpClient.post('/auth/register', {
        name,
        email,
        password,
      });
    } catch (error) {
      throw new Error('Error creating account');
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@WMManager:token');
    localStorage.removeItem('@WMManager:user');
    setUser(null);
    delete httpClient.defaults.headers.common.Authorization;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
