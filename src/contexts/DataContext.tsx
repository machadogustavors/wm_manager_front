import { createContext } from 'react';
import type { Service, ServiceFilter } from '@src/lib/types';

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
