import React, { useEffect, useState, useMemo } from 'react'
import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { UsersTaskActions } from './components/UsersTaskActions';
import { HeaderTasksUser } from './components/HeaderTasksUser';
import { Pagination } from "@/components/shared/components/Pagination";

interface UsersTaskTypes {
    // يمكن إضافة خصائص هنا إذا لزم الأمر
}

interface TaskRelatedT {
    id: string;
    TaskTitle: string;
    TaskType: string;
    PersonInCharge: string;
    status: string;
    DeliveryDate: string;
}

const tasks: TaskRelatedT[] = [
    { id: "1", TaskTitle: "مراجعة عقد القضية رقم 254", TaskType: "نوع المهمة 1", PersonInCharge: "المسؤول 1", status: "متأخرة", DeliveryDate: "2024-06-01" },
    { id: "2", TaskTitle: "مراجعة عقد القضية رقم 24", TaskType: "نوع المهمة 2", PersonInCharge: "المسؤول 2", status: "مُنجزة", DeliveryDate: "2024-06-02" },
    { id: "3", TaskTitle: "مراجعة عقد القضية رقم 254", TaskType: "نوع المهمة 3", PersonInCharge: "المسؤول 3", status: "قيد التنفيذ ", DeliveryDate: "2024-06-03" },
    { id: "4", TaskTitle: "مراجعة عقد القضية رقم 254", TaskType: "نوع المهمة 4", PersonInCharge: "المسؤول 4", status: "قيد التنفيذ", DeliveryDate: "2024-06-04" },
    { id: "5", TaskTitle: "مراجعة عقد القضية رقم 254", TaskType: "نوع المهمة 5", PersonInCharge: "المسؤول 5", status: "متأخرة ", DeliveryDate: "2024-06-05" },
    { id: "6", TaskTitle: "مراجعة عقد القضية رقم 254", TaskType: "نوع المهمة 6", PersonInCharge: "المسؤول 6", status: "قيد التنفيذ", DeliveryDate: "2024-06-06" },
];

const StatusCell: React.FC<{ status: string }> = ({ status }) => {
    const getStatusStyle = (status: string): string => {
        const statusValue = status.trim(); // لإزالة المسافات الزائدة

        switch (statusValue) {
            case "مُنجزة":
                return "bg-[#11B32433] text-[#0B6E1F]";
            case "متأخرة":
                return "bg-[#C600001F] text-[#C60000]";
            case "قيد التنفيذ":
                return "bg-[#DBC33B29] text-[#9E7F0F]";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
            {status}
        </span>
    );
};

export const UsersTask: React.FC<UsersTaskTypes> = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // استخدام useMemo لحساب المهام المصفاة بشكل فعال
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            // فلترة حسب الحالة
            if (statusFilter !== "all" && task.status.trim() !== statusFilter) {
                return false;
            }

            // فلترة حسب البحث
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return (
                    task.TaskTitle.toLowerCase().includes(searchLower) ||
                    task.TaskType.toLowerCase().includes(searchLower) ||
                    task.PersonInCharge.toLowerCase().includes(searchLower)
                );
            }

            return true;
        });
    }, [searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // حساب المهام للصفحة الحالية
    const currentTasks = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTasks, currentPage, itemsPerPage]);

    const columns: Column<TaskRelatedT>[] = [
        {
            header: "#",
            accessor: (item: TaskRelatedT) => {
                // إيجاد الرقم التسلسلي في القائمة المصفاة
                const indexInFiltered = filteredTasks.findIndex(t => t.id === item.id);
                return indexInFiltered + 1;
            },
            headerClassName: "w-13",
            className: "w-13 text-center",
        },
        {
            header: "عنوان المهمة",
            accessor: "TaskTitle",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "نوع المهمة",
            accessor: "TaskType",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "المُكلف",
            accessor: "PersonInCharge",
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
            accessor: "DeliveryDate",
            headerClassName: "w-35",
            className: "w-35",
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

    return (
        <div className="space-y-4">
            <HeaderTasksUser
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onFilterChange={setStatusFilter}
                statusFilter={statusFilter}
            />

            <DataTable
                data={currentTasks}
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