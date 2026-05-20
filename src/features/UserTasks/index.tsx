import { DataTable, type Column } from '@/shared/components/DataTable';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';
import { PaginationApi } from '@/shared/components/PaginationApi';
import { useIndexedData } from '@/shared/utils/useIndexedData';
import React, { useMemo, useState } from 'react';
import { useFetchTasks } from './api/hooks/useGetTasks';
import { HeaderTasksUser } from './components/HeaderTasksUser';
import { UsersTaskActions } from './components/UsersTaskActions';
import type { TaskRelatedT } from './types/types';
import { getStatusStyle, statusMapping } from './types/types';

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
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [deliverDateFrom, setDeliverDateFrom] = useState<Date | undefined>(undefined);
    const [deliverDateTo, setDeliverDateTo] = useState<Date | undefined>(undefined);
    const [page, setPage] = useState(1);
    const limit = 15;
    const { data: tasksResponse, isPending, isError, error, isFetching } = useFetchTasks(
        page,
        limit,
        deliverDateFrom,
        deliverDateTo
    );
    const tasks = tasksResponse?.data;

    const handleDateFilterChange = (key: "deliverDateFrom" | "deliverDateTo", value: Date | undefined) => {
        setPage(1);
        if (key === "deliverDateFrom") {
            setDeliverDateFrom(value);
        } else {
            setDeliverDateTo(value);
        }
    };
    const totalPages = tasksResponse?.meta?.total_pages ?? 1;
    const indexedData = useIndexedData(tasks || []);


    const getTaskTypeDisplay = (taskType: string): string => {
        if (!taskType) return "-";
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
            accessor: (item: TaskRelatedT) => item.assignee.first_name,
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

    if (isPending && !tasks) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

    return (
        <div className="space-y-4">
            <HeaderTasksUser
                searchTerm={searchTerm}
                onSearch={(term) => {
                    setSearchTerm(term);
                    setPage(1);
                }}
                onFilterChange={(status) => {
                    setStatusFilter(status);
                    setPage(1);
                }}
                statusFilter={statusFilter}
                filterOptions={filterOptions}
                deliverDateFrom={deliverDateFrom}
                deliverDateTo={deliverDateTo}
                onDateFilterChange={handleDateFilterChange}
            />

            <div className="relative">
                {isFetching ? (
                    <div className="absolute inset-0 z-10 bg-white/70 dark:bg-backgroundDark/70 flex items-center justify-center">
                        <LoadingPage fullScreen={false} />
                    </div>
                ) : null}

                <DataTable
                    data={indexedData}
                    columns={columns}
                    rowIdField="id"
                />
            </div>

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