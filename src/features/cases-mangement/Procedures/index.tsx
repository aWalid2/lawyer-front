import React from "react";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { HeaderProcedure } from "./components/HeaderProcedure";
import { ProcedureActions } from "./components/ProcedureActions";

interface Procedure {
    id: string;
    type: string;
    date: string;
    description: string;
    status: string;
}

const mockData: Procedure[] = [
    { id: "1", type: "تقديم مذكرة", date: "2024-01-10", description: "تقديم مذكرة دفاع للمحكمة", status: "مكتمل" },
    { id: "2", type: "إشعار رسمي", date: "2024-01-15", description: "إرسال إشعار رسمي للطرف الآخر", status: "مكتمل" },
    { id: "3", type: "استئناف", date: "2024-02-01", description: "تقديم طلب استئناف الحكم", status: "قيد التنفيذ" },
    { id: "4", type: "جلسة استماع", date: "2024-02-10", description: "حضور جلسة الاستماع أمام القاضي", status: "قيد التنفيذ" },
    { id: "5", type: "تسليم وثيقة", date: "2024-01-20", description: "تسليم وثائق العقد للمحكمة", status: "مكتمل" },
    { id: "6", type: "مدفوعات", date: "2024-02-05", description: "سداد رسوم المحكمة", status: "متأخر" },
    { id: "7", type: "طعن", date: "2024-03-01", description: "تقديم طعن في الحكم الابتدائي", status: "قيد التنفيذ" },
];

const statusStyles: Record<string, string> = {
    "مكتمل": "bg-green-50 text-green-600",
    "قيد التنفيذ": "bg-yellow-50 text-yellow-600",
    "متأخر": "bg-red-50 text-red-600",
};

export const Procedures: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const currentData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return mockData.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage]);

    const columns: Column<Procedure>[] = [
        {
            header: "#",
            accessor: (item) => mockData.findIndex((p) => p.id === item.id) + 1,
            headerClassName: "w-16",
        },
        {
            header: "نوع الإجراء",
            accessor: "type",
        },
        {
            header: "تاريخ الإجراء",
            accessor: "date",
        },
        {
            header: "الوصف",
            accessor: "description",
        },
        {
            header: "الحالة",
            accessor: (item) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                    {item.status}
                </span>
            ),
        },
        {
            header: "إجراء",
            accessor: (item) => (
                <ProcedureActions
                    procedure={item}
                    onEdit={(p) => console.log("Edit", p)}
                    onDelete={(p) => console.log("Delete", p)}
                />
            ),
        },
    ];

    return (
        <>
            <HeaderProcedure title="الإجراءات" buttonText="إضافة إجراء" />
            <div className="mt-4 bg-white">
                <DataTable data={currentData} columns={columns} rowIdField="id" />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </>
    );
};
