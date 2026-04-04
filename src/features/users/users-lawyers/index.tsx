import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { HeaderLawyers } from './lawyers/HeaderLawyers';
import { LawyersAction } from './lawyers/LawyersAction';
import { Editlawyers } from './lawyers/Editlawyers';
import { usePagination } from '@/shared/hooks/usePagination';
import { useFetchLawyers } from './api/hooks/useLawyersGet';
import type { Lawyer } from '../users-lawyers/lawyers/types';
export const UsersLawyer: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    const { data: lawyers, isPending, isError } = useFetchLawyers();
    const filteredLawyers = lawyers?.filter((lawyer: Lawyer) => 
        lawyer.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.profile?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    const getSerialNumber = (item: Lawyer) => {
        const index = filteredLawyers.findIndex((lawyer: Lawyer) => lawyer.id === item.id);
        return index !== undefined && index >= 0 ? index + 1 : "-";
    };
    
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        currentData,
    } = usePagination<Lawyer>(filteredLawyers, 15);
    
    const columns: Column<Lawyer>[] = [
        {
            header: "#",
            accessor: (item: Lawyer) => getSerialNumber(item),
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "اسم المحامي",
            accessor: (item: Lawyer) => item.first_name,
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: Lawyer) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left">{item.phone}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40 text-center",
        },
        {
            header: "البريد الإلكتروني",
            accessor: (item: Lawyer) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left text-sm text-gray-600">{item.email}</span>
                </div>
            ),
            headerClassName: "w-50",
            className: "w-50 text-center",
        },
        {
            header: "التخصص",
            accessor: (item: Lawyer) => (
                <span className="flex items-center justify-center" dir="ltr">
                    {item.profile?.specialization || "-"}
                </span>
            ),
            headerClassName: "w-45",
            className: "w-45 text-center",
        },
        {
            header: "الإجراءات",
            accessor: (item: Lawyer) => (
                <LawyersAction
                    caseItem={item}
                    onLawyerUpdated={() => {
                        // تحديث البيانات بعد التعديل
                        window.location.reload();
                    }}
                />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];
    
    if (isPending) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }
    
    if (isError) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-red-200">
                <p className="text-red-500 text-lg">حدث خطأ في تحميل البيانات</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <HeaderLawyers
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onAddClick={() => setIsAddModalOpen(true)}
            />
            
            <DataTable
                data={currentData}
                columns={columns}
                rowIdField="id"
            />
            
            {filteredLawyers.length > 0 ? (
                totalPages > 1 && (
                    
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
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
                    window.location.reload();
                }}
            />
        </div>
    );
};