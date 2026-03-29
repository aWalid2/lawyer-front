import React, { useEffect, useState, useMemo } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { HeaderLawyers } from './lawyers/HeaderLawyers';
import { LawyersAction } from './lawyers/LawyersAction';
import { Editlawyers } from './lawyers/Editlawyers';

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

export const UsersLawyer: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const itemsPerPage = 15;

    // فلترة المحامين بناءً على البحث
    const filteredLawyers = useMemo(() => {
        if (!searchTerm) return lawyers;

        return lawyers.filter(lawyer =>
            lawyer.lawyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lawyer.phoneNumber.includes(searchTerm) ||
            lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);

    // إعادة تعيين الصفحة الحالية إذا كانت أكبر من إجمالي الصفحات
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // حساب المحامين للصفحة الحالية
    const currentLawyers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredLawyers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredLawyers, currentPage, itemsPerPage]);

    // دالة مساعدة لحساب الرقم التسلسلي
    const getSerialNumber = (item: LawyerRelatedT): number => {
        const indexInFiltered = filteredLawyers.findIndex(c => c.id === item.id);
        return indexInFiltered + 1;
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
                        // تحديث البيانات بعد التعديل
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
            <HeaderLawyers
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onAddClick={() => setIsAddModalOpen(true)}
            />

            <DataTable
                data={currentLawyers}
                columns={columns}
                rowIdField="id"
            />


            {filteredLawyers.length > 0 ? (
                totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-lg">لا يوجد محامين مطابقين لمعايير البحث</p>
                </div>
            )}

            {/* موديل إضافة محامي جديد */}
            <Editlawyers
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onLawyerUpdated={() => {
                    console.log("تم إضافة محامي جديد");
                    // هنا يمكن إضافة منطق تحديث الجدول
                }}
            />
        </div>
    );
};