import React from "react";
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@src/services/servicesData';
import { Loader } from '@src/components/Loader'

const TablePage: React.FC = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });

    if(isLoading) return <Loader />;

    return (
        <>
            <div>
                
            </div>
        </>
    );
};

export default TablePage;