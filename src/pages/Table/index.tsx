import React from "react";
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@src/services/servicesData';
import { Loader } from '@src/components/Loader'
import { TableFilter } from "./components/TableFilter";

const TablePage: React.FC = () => {
    const { isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });
    
    if(isLoading) return <Loader />;

    return (
        <>
            <div className="flex flex-col items-center justify-center p-7 w-full">
                <div className="min-h-[100px] w-full max-w-7xl flex items-center justify-between flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-400">
                    <TableFilter />
                </div>
            </div>
        </>
    );
};

export default TablePage;