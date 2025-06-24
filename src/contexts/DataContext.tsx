import { createContext } from 'react';
import type { Service } from '@src/lib/types';

interface DataContextType {
  services: Service[];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

export const DataContext = createContext<DataContextType>({
  services: [],
  isLoading: false,
  error: null,
  refetch: () => {},
});
