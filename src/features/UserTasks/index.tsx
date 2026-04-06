import React, { useState, useMemo } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { UsersTaskActions } from './components/UsersTaskActions';
import { HeaderTasksUser } from './components/HeaderTasksUser';
import { Pagination } from "@/shared/components/Pagination";
import { usePagination } from '@/shared/hooks/usePagination';
import { useFetchTasks } from './api/hooks/useGetTasks';
import { useFetchLawyers } from '../users/users-lawyers/api/hooks/useLawyersGet';
import { useFetchCases } from './api/hooks/useGetCase';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';

interface TaskRelatedT {
    id: string;
    task_title: string;
    task_type: string;
    assigned_to: number;
    status: string;
    delivery_date: string;
}

const statusMapping: Record<string, string> = {
    "in_progress": "قيد التنفيذ",
    "pending": "قيد الانتظار",
    "done": "مُنجزة",
    "late": "متأخرة"
};

const StatusCell: React.FC<{ status: string }> = ({ status }) => {
    const cleanStatus = status?.trim() || "";
    const arabicStatus = statusMapping[cleanStatus] || cleanStatus;

    const getStatusStyle = (statusValue: string): string => {
        switch (statusValue.trim()) {
            case "done":
                return "bg-[#11B32433] text-[#0B6E1F]";
            case "late":
                return "bg-[#C600001F] text-[#C60000]";
            case "in_progress":
                return "bg-[#DBC33B29] text-[#9E7F0F]";
            case "pending":
                return "bg-[#FFA50029] text-[#FF8C00]";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(cleanStatus)}`}>
            {arabicStatus}
        </span>
    );
};

export const UsersTask: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: tasksResponse, isPending, isError, refetch } = useFetchTasks();
    const tasks = tasksResponse?.data;
    const { data: lawyers } = useFetchLawyers();
    const { data: cases } = useFetchCases();
    const [statusFilter, setStatusFilter] = useState<string>("all");

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
        
        // لو كان رقم (ID) وموجود في الخريطة → يعرض اسم القضية
        if (casesMap.has(String(taskType))) {
            return casesMap.get(String(taskType));
        }
        
        // لو مش رقم أو مش موجود → يعرض النص الأصلي
        return taskType;
    };

    const filteredTasks = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];

        return tasks.filter((task: TaskRelatedT) => {
            const cleanStatus = task.status?.trim() || "";

            if (statusFilter !== "all" && cleanStatus !== statusFilter) {
                return false;
            }

            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const lawyerName = getLawyerName(task.assigned_to).toLowerCase();
                const taskTypeDisplay = getTaskTypeDisplay(task.task_type).toLowerCase();

                return (
                    task.task_title?.toLowerCase().includes(searchLower) ||
                    taskTypeDisplay.includes(searchLower) ||
                    lawyerName.includes(searchLower) ||
                    statusMapping[cleanStatus]?.includes(searchLower)
                );
            }

            return true;
        });
    }, [searchTerm, statusFilter, tasks, lawyersMap, casesMap]);

    const {
        currentPage,
        setCurrentPage,
        totalPages,
    } = usePagination<TaskRelatedT>(filteredTasks || [], 15);

    const currentPageData = useMemo(() => {
        const startIndex = (currentPage - 1) * 15;
        const endIndex = startIndex + 15;
        return filteredTasks.slice(startIndex, endIndex);
    }, [filteredTasks, currentPage]);

    const columns: Column<TaskRelatedT>[] = [
        {
            header: "#",
            accessor: (item: TaskRelatedT) => {
                const indexInFiltered = filteredTasks.findIndex((t: TaskRelatedT) => t.id === item.id);
                return indexInFiltered + 1;
            },
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
                data={currentPageData}
                columns={columns}
                rowIdField="id"
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {filteredTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد مهام تطابق معايير البحث
                </div>
            )}
        </div>
    );
};