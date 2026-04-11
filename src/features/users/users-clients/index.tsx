import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { useIndexedData } from '@/shared/utils/useIndexedData';
import { EmptyTable } from '@/shared/components/EmptyTable';
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';
import type { ClientRelatedT } from './types/types';
import { useFetchClients } from './api/hooks/useGetAll';
import { UserClientsAction } from './clients/UserClientsAction';
import { HeaderClient } from './clients/HederClient';



export const UsersClient: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 15;
    const { data: clientsData, isPending, isError, error } = useFetchClients(page, limit);
    const indexedData = useIndexedData(clientsData?.data);
    const totalPages = clientsData?.meta?.total_pages;


    const columns: Column<ClientRelatedT>[] = [
        {
            header: "#",
            accessor: (item: ClientRelatedT) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "اسم الموكل",
            accessor: (item: ClientRelatedT) => item.user?.first_name,
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
                    <span className="text-left">{item.user.phone}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40",
        },
        {
            header: "الإجراءات",
            accessor: (item: ClientRelatedT) => (
                <UserClientsAction client={item}
                    onClientUpdated={(values) => {
                        console.log(values);
                    }} />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];

    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" error={error} />
    return (
        <div className="space-y-6">
            <HeaderClient
                searchTerm={""}
                onSearch={(value) => {
                    console.log(value);
                }}
            />

            <DataTable
                data={indexedData}
                columns={columns}
                rowKey="user_id"
            />


            {indexedData?.length > 0 ? (
                totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )
            ) : (
                <EmptyTable message="لا يوجد عملاء" />
            )}

        </div >
    );
};