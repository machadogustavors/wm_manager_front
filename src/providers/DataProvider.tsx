import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@src/services/servicesData';
import { DataContext } from '@src/contexts/DataContext';
import { useAuth } from '@src/hooks/useAuth';

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
    const { user } = useAuth();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
        enabled: !!user
    });

    return (
        <DataContext.Provider value={{
            services: data || [],
            isLoading,
            error,
            refetch,
        }}>
            {children}
        </DataContext.Provider>
    );
}
