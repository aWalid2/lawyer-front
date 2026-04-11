import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { ProsecutionsAction } from './components/ProsecutionsAction';
import { ProsecutionsHeader } from './components/ProsecutionsHeader';
import { useFetchProsecutions } from './api/hooks/useGetProsecutions';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';
import { PaginationApi } from '@/shared/components/PaginationApi';
import { useIndexedData } from '@/shared/utils/useIndexedData';
import type { ProsecutionT } from './types/prosecutionsTypes';
import PageLayout from '@/shared/components/PageLayout';

export const PublicProsecutionsFeature: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const limit = 15;

    const { data: prosecutionsResponse, isPending, isError, refetch } = useFetchProsecutions(page, limit, searchTerm);

    const prosecutions = prosecutionsResponse?.data || [];
    const totalPages = prosecutionsResponse?.meta?.total_pages ?? 1;
    const indexedData = useIndexedData(prosecutions || []);

    const columns: Column<ProsecutionT>[] = [
        {
            header: "#",
            accessor: (item: ProsecutionT) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center",
        },
        {
            header: "اسم النيابة",
            accessor: "name",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "العنوان",
            accessor: "address",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "الإجراءات",
            accessor: (item: ProsecutionT) => (
                <ProsecutionsAction
                    prosecution={item}
                    onProsecutionUpdated={() => {
                        refetch();
                    }}
                />
            ),
            headerClassName: "w-35",
            className: "w-35",
        },
    ];

    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

    return (
        <PageLayout>
            <ProsecutionsHeader
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onProsecutionAdded={() => {
                    refetch();
                }}
            />

            <DataTable
                data={indexedData}
                columns={columns}
                rowIdField="id"
            />

            {totalPages > 1 && (
                <PaginationApi
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}

            {indexedData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد نيابات تطابق معايير البحث
                </div>
            )}
        </PageLayout>
    );
};