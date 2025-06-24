import { useContext } from 'react';
import { DataContext } from '@src/contexts/DataContext';

export function useData() {
  return useContext(DataContext);
}
