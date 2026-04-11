import React, { useState } from 'react';
import { DataTable, type Column } from '@/shared/components/DataTable';
import { Pagination } from "@/shared/components/Pagination";
import { HeaderLawyers } from './lawyers/HeaderLawyers';
import { LawyersAction } from './lawyers/LawyersAction';
import { Editlawyers } from './lawyers/Editlawyers';
import { usePagination } from '@/shared/hooks/usePagination';
import { useFetchLawyers } from './api/hooks/useLawyersGet';
import type { Lawyer } from './lawyers/types';
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';

export const UsersLawyer: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { data: lawyers, isPending, isError, refetch } = useFetchLawyers();
    
    const filteredLawyers = lawyers?.filter((lawyer: Lawyer) => 
        lawyer.user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    const getSerialNumber = (item: Lawyer) => {
        const index = filteredLawyers.findIndex((lawyer: Lawyer) => lawyer.user_id === item.user_id);
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
            accessor: (item: Lawyer) => item.user.first_name,
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: Lawyer) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left">{item.user.phone}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40 text-center",
        },
        {
            header: "البريد الإلكتروني",
            accessor: (item: Lawyer) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left text-sm text-gray-600">{item.user.email}</span>
                </div>
            ),
            headerClassName: "w-50",
            className: "w-50 text-center",
        },
        {
            header: "التخصص",
            accessor: (item: Lawyer) => (
                <span className="flex items-center justify-center" dir="ltr">
                    {item.specialization || "-"}
                </span>
            ),
            headerClassName: "w-45",
            className: "w-45 text-center",
        },
        {
            header: "الإجراءات",
            accessor: (item: Lawyer) => (
                <LawyersAction
                    lawyer={item}
                    onLawyerUpdated={() => {
                        refetch();
                    }}
                />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];
    
     if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;
    
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
                rowIdField="user_id"
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
            
            <Editlawyers
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onLawyerUpdated={() => {
                    refetch();
                }}
            />
        </div>
    );
};