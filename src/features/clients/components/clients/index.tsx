import React, { useEffect, useState, useMemo } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { HeaderClient } from './clients/components/HederClient';
import { UserClientsAction } from './clients/components/UserClientsAction';
import { useFetchClients } from './clients/hooks/useGetClients';


interface UsersClientsTypes {

}

interface ClientRelatedT {
    id: string;
    user_id: string;
    client_name: string;
    case_count: number;
    phone_number: string;
    rowNumber: number;
    created_at: string;
    updated_at: string;

}


export const ClientsFeature: React.FC<UsersClientsTypes> = () => {
    const { data: clientsData } = useFetchClients();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    console.log(clientsData);

    const totalPages = Math.ceil(clientsData?.length / itemsPerPage);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);


    const indexedData = useMemo(() => {
        return (clientsData ?? []).map((item: any, index: number) => ({
            ...item,
            rowNumber: index + 1,
        }));
    }, [clientsData]);

    const columns: Column<ClientRelatedT>[] = [

        {
            header: "#",
            accessor: (item: ClientRelatedT) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "كود الموكل",
            accessor: (item: ClientRelatedT) => item.user_id,
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
        {
            header: "اسم الموكل",
            accessor: "client_name",
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "عدد القضايا",
            accessor: (item: ClientRelatedT) => (
                <span className="px-3 py-1 bg-[#A6A6A6] text-[#FFFFFF] rounded-lg text-sm">
                    {item.case_count}
                </span>
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: ClientRelatedT) => (
                <div className="flex items-center justify-center " dir="ltr">
                    <span className="text-left">{item.phone_number}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40",
        },
        {
            header: "الإجراءات",
            accessor: (item: ClientRelatedT) => (
                <UserClientsAction caseItem={item} />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];

    return (
        <div className="space-y-6">
            <HeaderClient
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
            />

            <DataTable
                data={indexedData}
                columns={columns}
                rowIdField="id"
            />


            {clientsData?.length > 0 ? (
                totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-lg">لا يوجد عملاء مطابقين لمعايير البحث</p>
                </div>
            )}

        </div>
    );
};