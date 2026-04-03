import React, { useState, useMemo } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { UsersTaskActions } from './components/UsersTaskActions';
import { HeaderTasksUser } from './components/HeaderTasksUser';
import { Pagination } from "@/shared/components/Pagination";
import { usePagination } from '@/shared/hooks/usePagination';
import { useFetchTasks } from './api/hooks/useGetTasks';
import { useFetchClients } from '@/features/clients/clients/api/hooks/useGetClients'; // استورد الـ hook

interface TaskRelatedT {
    id: string;
    task_title: string;
    task_type: string;
    assigned_to: number;
    status: string;
    delivery_date: string;
}

// خريطة لتحويل الحالات من إنجليزي إلى عربي
const statusMapping: Record<string, string> = {
    "in_progress": "قيد التنفيذ",
    "pending": "قيد الانتظار",
    "done": "مُنجزة",
    "late": "متأخرة"
};

const StatusCell: React.FC<{ status: string }> = ({ status }) => {
    // تنظيف القيمة من المسافات
    const cleanStatus = status.trim();
    // تحويل القيمة الإنجليزية إلى العربية للعرض
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
    const { data: tasks, isPending, isError } = useFetchTasks();
    const { data: clientsData, isPending: isClientsLoading } = useFetchClients(); // جلب بيانات العملاء
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // عمل Map للعملاء عشان نقدر نجيب الاسم بسرعة من الـ ID
    const clientsMap = useMemo(() => {
        if (!clientsData) return new Map();
        return new Map(clientsData.map((client: any) => [client.user_id, client.user?.first_name || `موكل ${client.user_id}`]));
    }, [clientsData]);

    // دالة لجلب اسم الموكل من الـ ID
    const getClientName = (userId: number): string => {
        return clientsMap.get(userId) || `موكل ${userId}`;
    };

    // فلترة المهام حسب البحث والحالة
    const filteredTasks = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];

        return tasks.filter((task: TaskRelatedT) => {
            // تنظيف القيمة من المسافات
            const cleanStatus = task.status.trim();

            // فلترة حسب الحالة (المقارنة بالقيم الإنجليزية)
            if (statusFilter !== "all" && cleanStatus !== statusFilter) {
                return false;
            }

            // فلترة حسب البحث (يبحث في القيم المعروضة بالعربي)
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const clientName = getClientName(task.assigned_to).toLowerCase();
                return (
                    task.task_title.toLowerCase().includes(searchLower) ||
                    task.task_type.toLowerCase().includes(searchLower) ||
                    task.assigned_to.toString().includes(searchLower) ||
                    clientName.includes(searchLower) || // البحث في اسم الموكل
                    statusMapping[cleanStatus].includes(searchLower)
                );
            }

            return true;
        });
    }, [searchTerm, statusFilter, tasks, clientsMap]);

    const {
        currentPage,
        setCurrentPage,
        totalPages,
    } = usePagination<TaskRelatedT>(filteredTasks || [], 15);

    // الحصول على بيانات الصفحة الحالية
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
            accessor: "task_type",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "المُكلف",
            accessor: (item: TaskRelatedT) => getClientName(item.assigned_to), // عرض الاسم بدل الرقم
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
                const date = new Date(item.delivery_date);
                return date.toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            },
            headerClassName: "w-35 text-center",
            className: "w-35 text-center font-medium",
        },
        {
            header: "إجراء",
            accessor: (item: TaskRelatedT) => (
                <UsersTaskActions caseItem={item} />
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

    // حالة التحميل
    if (isPending || isClientsLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">جاري تحميل المهام...</div>
            </div>
        );
    }

    // حالة الخطأ
    if (isError) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-500">حدث خطأ في تحميل المهام</div>
            </div>
        );
    }

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