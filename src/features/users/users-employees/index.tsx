import React, { useState } from 'react';
import { DataTable, type Column } from '@/shared/components/DataTable';
import { Pagination } from "@/shared/components/Pagination";
import { HeaderEmployees } from './employees/HeaderEmployees';
import { EmployeesAction } from './employees/EmployeesAction';
import { Editemployees } from './employees/EditEmployees';
import { usePagination } from '@/shared/hooks/usePagination';
import { useFetchEmployees } from './employees/api/hooks/useGetAllEmployees';
import type { Employee,  } from './employees/types';
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';

export const UsersEmployee: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    const { data: employees, isPending, isError, refetch } = useFetchEmployees();
    
    const filteredEmployees = employees?.filter((employee: Employee) => 
        employee.user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    const getSerialNumber = (item: Employee) => {
        const index = filteredEmployees.findIndex((employee: Employee) => employee.user_id === item.user_id);
        return index >= 0 ? index + 1 : "-";
    };
    
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        currentData,
    } = usePagination<Employee>(filteredEmployees, 15);
    
    const columns: Column<Employee>[] = [
        {
            header: "#",
            accessor: (item: Employee) => getSerialNumber(item),
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "اسم الموظف",
            accessor: (item: Employee) => item.user.first_name,
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: Employee) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left">{item.user.phone}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40 text-center",
        },
        {
            header: "البريد الإلكتروني",
            accessor: (item: Employee) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left text-sm text-gray-600">{item.user.email}</span>
                </div>
            ),
            headerClassName: "w-50",
            className: "w-50 text-center",
        },
        {
            header: "الوظيفة",
            accessor: (item: Employee) => (
                <span className="flex items-center justify-center" dir="ltr">
                    {item.position || "-"}
                </span>
            ),
            headerClassName: "w-45",
            className: "w-45 text-center",
        },
        {
            header: "الإجراءات",
            accessor: (item: Employee) => (
                <EmployeesAction
                    caseItem={item}
                    onEmployeeUpdated={() => {
                        refetch();
                    }}
                />
            ),
            headerClassName: "w-35 text-center",
            className: "w-34 text-center",
        },
    ];
    
    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;
    
    return (
        <div className="space-y-6">
            <HeaderEmployees
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onAddClick={() => setIsAddModalOpen(true)}
            />
            
            <DataTable
                data={currentData}
                columns={columns}
                rowIdField="user_id"
            />
            
            {filteredEmployees.length > 0 ? (
                totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-lg">لا يوجد موظفين مطابقين لمعايير البحث</p>
                </div>
            )}
            
            <Editemployees
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onEmployeeUpdated={() => {
                    refetch();
                }}
            />
        </div>
    );
};