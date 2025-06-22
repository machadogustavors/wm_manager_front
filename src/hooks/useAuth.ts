import { useContext } from 'react';
import { AuthContext } from '@src/contexts/AuthContext';
import type { AuthContextType } from '@src/lib/types';

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
