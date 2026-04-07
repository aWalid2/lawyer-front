import React, { useState, useMemo } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { UsersTaskActions } from './components/UsersTaskActions';
import { HeaderTasksUser } from './components/HeaderTasksUser';
import { useFetchTasks } from './api/hooks/useGetTasks';
import { useFetchLawyers } from '../users/users-lawyers/api/hooks/useLawyersGet';
import { useFetchCases } from './api/hooks/useGetCase';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';
import type { TaskRelatedT } from './types/types';
import { statusMapping } from './types/types';
import { getStatusStyle } from './types/types';
import { PaginationApi } from '@/shared/components/PaginationApi';
import { useIndexedData } from '@/shared/utils/useIndexedData';

const StatusCell: React.FC<{ status: string }> = ({ status }) => {
    const cleanStatus = status?.trim() || "";
    const arabicStatus = statusMapping[cleanStatus] || cleanStatus;
    return (
        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(cleanStatus)}`}>
            {arabicStatus}
        </span>
    );
};

export const UsersTask: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: lawyers } = useFetchLawyers();
    const { data: cases } = useFetchCases();
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const limit = 15;
    const { data: tasksResponse, isPending, isError, refetch } = useFetchTasks(page, limit, statusFilter, searchTerm);
    const tasks = tasksResponse?.data;
    const totalPages = tasksResponse?.meta?.total_pages ?? 1;
    const indexedData = useIndexedData(tasks || []);

    const lawyersMap = useMemo(() => {
        if (!lawyers) return new Map();
        return new Map(lawyers.map((lawyer: any) => [lawyer.user_id, lawyer.user?.first_name || `محامي ${lawyer.user_id}`]));
    }, [lawyers]);

    const getLawyerName = (userId: number): string => {
        return lawyersMap.get(userId) || `محامي ${userId}`;
    };

    const casesMap = useMemo(() => {
        if (!cases?.data) return new Map();
        return new Map(cases.data.map((caseItem: any) => [
            String(caseItem.id || caseItem.case_id),
            caseItem.case_title
        ]));
    }, [cases]);

    const getTaskTypeDisplay = (taskType: string): string => {
        if (!taskType) return "-";
        if (casesMap.has(String(taskType))) {
            return casesMap.get(String(taskType));
        }
        return taskType;
    };

    const columns: Column<TaskRelatedT>[] = [
        {
            header: "#",
            accessor: (item: TaskRelatedT) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center",
        },
        {
            header: "عنوان المهمة",
            accessor: "task_title",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "نوع المهمة",
            accessor: (item: TaskRelatedT) => getTaskTypeDisplay(item.task_type),
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "المُكلف",
            accessor: (item: TaskRelatedT) => getLawyerName(item.assigned_to),
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "الحالة",
            accessor: (item: TaskRelatedT) => <StatusCell status={item.status} />,
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "تاريخ التسليم",
            accessor: (item: TaskRelatedT) => {
                if (!item.delivery_date) return "-";
                const date = new Date(item.delivery_date);
                return date.toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                });
            },
            headerClassName: "w-35 text-center",
            className: "w-35 text-center font-medium",
        },
        {
            header: "إجراء",
            accessor: (item: TaskRelatedT) => (
                <UsersTaskActions 
                    caseItem={item} 
                    onTaskUpdated={() => {
                        refetch();
                    }} 
                />
            ),
            headerClassName: "w-35",
            className: "w-35",
        },
    ];

    const filterOptions = useMemo(() => {
        return [
            { value: "all", label: "الكل" },
            { value: "in_progress", label: "قيد التنفيذ" },
            { value: "pending", label: "قيد الانتظار" },
            { value: "done", label: "مُنجزة" },
            { value: "late", label: "متأخرة" }
        ];
    }, []);

    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

    return (
        <div className="space-y-4">
            <HeaderTasksUser
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onFilterChange={setStatusFilter}
                statusFilter={statusFilter}
                filterOptions={filterOptions}
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
                    لا توجد مهام تطابق معايير البحث
                </div>
            )}
        </div>
    );
};