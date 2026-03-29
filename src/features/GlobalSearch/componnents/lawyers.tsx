import React, { useState, useMemo } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { LawyersAction } from '@/features/users/users-lawyers/lawyers/LawyersAction';
import { Editlawyers } from '@/features/users/users-lawyers/lawyers/Editlawyers';


interface LawyerRelatedT {
    id: string;
    lawyerName: string;
    phoneNumber: string;
    email: string;
    specialization: string;
}

// بيانات تجريبية للمحامين
const lawyers: LawyerRelatedT[] = [
    {
        id: "1",
        lawyerName: "أحمد محمد علي",
        phoneNumber: "0501234567",
        email: "ahmed@example.com",
        specialization: "قضايا مدنية"
    },
    {
        id: "2",
        lawyerName: "فاطمة عبدالله",
        phoneNumber: "0559876543",
        email: "fatima@example.com",
        specialization: "قضايا تجارية"
    },
    {
        id: "3",
        lawyerName: "محمد إبراهيم",
        phoneNumber: "0561122334",
        email: "mohamed@example.com",
        specialization: "قضايا عمالية"
    },
    {
        id: "4",
        lawyerName: "سارة خالد",
        phoneNumber: "0544455667",
        email: "sara@example.com",
        specialization: "قضايا أحوال شخصية"
    },
    {
        id: "5",
        lawyerName: "عمر حسن",
        phoneNumber: "0587788990",
        email: "omar@example.com",
        specialization: "قضايا جنائية"
    },
    {
        id: "6",
        lawyerName: "نورة سعد",
        phoneNumber: "0593344556",
        email: "noura@example.com",
        specialization: "استشارات قانونية"
    },
];

export const TableLawyers: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(lawyers.length / itemsPerPage);

    // حساب المحامين للصفحة الحالية
    const currentLawyers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return lawyers.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage]);

    // دالة مساعدة لحساب الرقم التسلسلي
    const getSerialNumber = (item: LawyerRelatedT): number => {
        const indexInLawyers = lawyers.findIndex(c => c.id === item.id);
        return indexInLawyers + 1;
    };

    const columns: Column<LawyerRelatedT>[] = [
        {
            header: "#",
            accessor: (item: LawyerRelatedT) => getSerialNumber(item),
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "اسم المحامي",
            accessor: "lawyerName",
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: LawyerRelatedT) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left">{item.phoneNumber}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40 text-center",
        },
        {
            header: "البريد الإلكتروني",
            accessor: (item: LawyerRelatedT) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left text-sm text-gray-600">{item.email}</span>
                </div>
            ),
            headerClassName: "w-50",
            className: "w-50 text-center",
        },
        {
            header: "التخصص",
            accessor: (item: LawyerRelatedT) => (
                <span className="flex items-center justify-center" dir="ltr">
                    {item.specialization}
                </span>
            ),
            headerClassName: "w-45",
            className: "w-45 text-center",
        },
        {
            header: "الإجراءات",
            accessor: (item: LawyerRelatedT) => (
                <LawyersAction
                    caseItem={item}
                    onLawyerUpdated={() => {
                        console.log("تم تحديث المحامي");
                    }}
                />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="border rounded-main border-gray-200 p-4">
                <h1 className="text-xl font-semibold mb-8 mt-4 ">قائمة المحامين</h1>
                <DataTable
                    data={currentLawyers}
                    columns={columns}
                    rowIdField="id"
                />

                {lawyers.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                {/* موديل إضافة محامي جديد */}
                <Editlawyers
                    open={isAddModalOpen}
                    onOpenChange={setIsAddModalOpen}
                    onLawyerUpdated={() => {
                        console.log("تم إضافة محامي جديد");
                    }}
                />
            </div>
        </div>
    );
};