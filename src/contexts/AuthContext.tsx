import { createContext } from 'react';
import type { AuthContextType } from '@src/lib/types';

export const AuthContext = createContext({} as AuthContextType);
