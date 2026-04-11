import { useState } from 'react';
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from "@/shared/components/Pagination";
import { usePagination } from '@/shared/hooks/usePagination';
import { useFetchLawyers } from '@/features/users/users-lawyers/api/hooks/useLawyersGet';
import { LawyersAction } from '@/features/users/users-lawyers/lawyers/LawyersAction';
import { Editlawyers } from '@/features/users/users-lawyers/lawyers/Editlawyers';
import type { Lawyer } from '@/features/users/users-lawyers/lawyers/types';

export const TableLawyers: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    const { data: lawyers, isPending, isError, refetch } = useFetchLawyers();
    
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        currentData,
    } = usePagination<Lawyer>(lawyers || [], 15);
    
    const getSerialNumber = (item: Lawyer) => {
        const index = lawyers?.findIndex((lawyer: Lawyer) => lawyer.user_id === item.user_id);
        return index !== undefined && index >= 0 ? index + 1 : "-";
    };
    
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
        <div className="w-full pt-6 space-y-6">
            <div className="border rounded-main border-gray-200 p-4">
                <div className="flex justify-between items-center mb-8 mt-4">
                    <h1 className="text-xl font-semibold">قائمة المحامين</h1>

                </div>
                
                <DataTable
                    data={currentData}
                    columns={columns}
                    rowKey={'user_id'}
                />
                
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
            
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