import { createContext } from 'react';
import type { Service } from '@src/lib/types';

export interface ServiceFilter {
  date?: string; // yyyy-mm-dd
  month?: string; // yyyy-mm
  year?: string; // yyyy
}

interface DataContextType {
  services: Service[];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  filter: ServiceFilter;
  setFilter: (filter: ServiceFilter) => void;
}

export const DataContext = createContext<DataContextType>({
  services: [],
  isLoading: false,
  error: null,
  refetch: () => {},
  filter: {},
  setFilter: () => {},
});
