import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@src/services/servicesData';
import { Loader } from '@src/components/Loader'
import { TableFilter } from "./components/TableFilter";
import { Table } from "./components/Table";
import { NewService } from "./components/NewService";

const TablePage: React.FC = () => {
    const { isLoading, refetch } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });
    const [showNewService, setShowNewService] = useState(false);
    // Filtro de data pode ser implementado depois

    if(isLoading) return <Loader />;

    return (
        <>
            <div className="flex flex-col items-center justify-center p-7 w-full">
                <TableFilter onNewService={() => setShowNewService(true)} />
                <Table />
            </div>
            {showNewService && (
                <NewService
                    onSuccess={() => {
                        setShowNewService(false);
                        refetch();
                    }}
                    onCancel={() => setShowNewService(false)}
                />
            )}
        </>
    );
};

export default TablePage;