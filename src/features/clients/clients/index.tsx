import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { HeaderClient } from './components/HederClient';
import { UserClientsAction } from './components/UserClientsAction';
import { useFetchClients } from './api/hooks/useGetClients';
import { useIndexedData } from '@/shared/utils/useIndexedData';
import { EmptyTable } from '@/shared/components/EmptyTable';
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';
import type { ClientRelatedT } from './types/clientT';
import { usePagination } from '@/shared/hooks/usePagination';


export const ClientsFeature: React.FC = () => {
    const { data: clientsData, isPending, isError } = useFetchClients();
    const indexedData = useIndexedData(clientsData);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        currentPage,
        setCurrentPage,
        totalPages,
    } = usePagination<ClientRelatedT>(indexedData || [], 15);


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
            accessor: (item: ClientRelatedT) => item.client_name,
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

    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )
            ) : (
                <EmptyTable message="لا يوجد عملاء مطابقين لمعايير البحث" />
            )}

        </div >
    );
};