import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { CaseStatusesAction } from './components/CaseStatusesAction';
import { CaseStatusesHeader } from './components/CaseStatusesHeader';
import { useFetchCaseStatuses } from './api/hooks/useGetCaseStatuses';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';
import { PaginationApi } from '@/shared/components/PaginationApi';
import { useIndexedData } from '@/shared/utils/useIndexedData';
import type { CaseStatusT } from './types/caseStatuseTypes';
import PageLayout from '@/shared/components/PageLayout';

export const CaseStatusesFeature: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const limit = 15;

    const { data: statusesResponse, isPending, isError, refetch } = useFetchCaseStatuses(page, limit, searchTerm);
    
    const statuses = statusesResponse?.data || [];
    const totalPages = statusesResponse?.meta?.total_pages ?? 1;
    const indexedData = useIndexedData(statuses || []);

    const columns: Column<CaseStatusT>[] = [
        {
            header: "#",
            accessor: (item: CaseStatusT) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center",
        },
        {
            header: "اسم الحالة",
            accessor: "name",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "الإجراءات",
            accessor: (item: CaseStatusT) => (
                <CaseStatusesAction 
                    status={item} 
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
            <CaseStatusesHeader
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
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
                    لا توجد حالات تطابق معايير البحث
                </div>
            )}
        </PageLayout>
    );
};