import { ReactNode, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@src/services/servicesData';
import { DataContext } from '@src/contexts/DataContext';
import { useAuth } from '@src/hooks/useAuth';
import type { Service, ServiceFilter } from '@src/lib/types';

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
    const { user } = useAuth();
    const [filter, setFilter] = useState<ServiceFilter>({});
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
        enabled: !!user
    });

    // Filtra os serviços conforme o filtro global
    const filteredServices = useMemo(() => {
      if (!data) return [];
      return data.filter((service: Service) => {
        if (filter.date && service.date !== filter.date) return false;
        if (filter.month && service.date && !service.date.startsWith(filter.month)) return false;
        if (filter.year && service.date && !service.date.startsWith(filter.year)) return false;
        return true;
      });
    }, [data, filter]);

    return (
        <DataContext.Provider value={{
            services: filteredServices,
            isLoading,
            error,
            refetch,
            filter,
            setFilter,
        }}>
            {children}
        </DataContext.Provider>
    );
}
