import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { httpClient } from '@src/services/httpClient';
import type { User, SignInCredentials, SignUpData } from '@src/lib/types';

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

  useEffect(() => {
    const loginAt = localStorage.getItem('@WMManager:loginAt');
    if (loginAt) {
      const now = Date.now();
      const diff = now - Number(loginAt);
      const twelveHours = 12 * 60 * 60 * 1000;
      if (diff > twelveHours) {
        signOut();
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const signIn = useCallback(async ({ username, password }: SignInCredentials) => {
    try {
      const response = await httpClient.post('/auth/sign-in', {
        username,
        password,
      });

      const token = response.data.tokens.AccessToken;

      const user = {
        id: response.data.tokens.IdToken,
        name: username,
        email: response.data.email,
        access_token: token
      }

      localStorage.setItem('@WMManager:token', token);
      localStorage.setItem('@WMManager:user', JSON.stringify(user));
      localStorage.setItem('@WMManager:loginAt', String(Date.now()));

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
    localStorage.removeItem('@WMManager:loginAt');
    setUser(null);
    delete httpClient.defaults.headers.common.Authorization;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut, confirmAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
