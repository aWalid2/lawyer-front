import React, { useEffect, useState, useMemo } from 'react'
import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { Pagination } from "@/components/shared/components/Pagination";
import { HeaderEmployees } from './employees/HeaderEmployees';
import { EmployeesAction } from './employees/EmployeesAction';
import { Editemployees } from './employees/EditEmployees';

interface EmployeeRelatedT {
    id: string;
    employeeName: string;
    phoneNumber: string;
    email: string;
    jobTitle: string;
}

// بيانات تجريبية للموظفين
const employees: EmployeeRelatedT[] = [
    {
        id: "1",
        employeeName: "أحمد محمد علي",
        phoneNumber: "0501234567",
        email: "ahmed@company.com",
        jobTitle: "محامي أول"
    },
    {
        id: "2",
        employeeName: "فاطمة عبدالله",
        phoneNumber: "0559876543",
        email: "fatima@company.com",
        jobTitle: "محامي استشاري"
    },
    {
        id: "3",
        employeeName: "محمد إبراهيم",
        phoneNumber: "0561122334",
        email: "mohamed@company.com",
        jobTitle: "مدير القسم القانوني"
    },
    {
        id: "4",
        employeeName: "سارة خالد",
        phoneNumber: "0544455667",
        email: "sara@company.com",
        jobTitle: "باحث قانوني"
    },
    {
        id: "5",
        employeeName: "عمر حسن",
        phoneNumber: "0587788990",
        email: "omar@company.com",
        jobTitle: "مساعد قانوني"
    },
    {
        id: "6",
        employeeName: "نورة سعد",
        phoneNumber: "0593344556",
        email: "noura@company.com",
        jobTitle: "مدير الموارد البشرية"
    },
];

export const UsersEmployee: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const itemsPerPage = 15;
    

    // فلترة الموظفين بناءً على البحث
    const filteredEmployees = useMemo(() => {
        if (!searchTerm) return employees;

        return employees.filter(employee =>
            employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.phoneNumber.includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    // إعادة تعيين الصفحة الحالية إذا كانت أكبر من إجمالي الصفحات
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // حساب الموظفين للصفحة الحالية
    const currentEmployees = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredEmployees, currentPage, itemsPerPage]);

    // دالة مساعدة لحساب الرقم التسلسلي
    const getSerialNumber = (item: EmployeeRelatedT): number => {
        const indexInFiltered = filteredEmployees.findIndex(c => c.id === item.id);
        return indexInFiltered + 1;
    };

    const columns: Column<EmployeeRelatedT>[] = [
        {
            header: "#",
            accessor: (item: EmployeeRelatedT) => getSerialNumber(item),
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "اسم الموظف",
            accessor: "employeeName",
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: EmployeeRelatedT) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left">{item.phoneNumber}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40 text-center",
        },
        {
            header: "البريد الإلكتروني",
            accessor: (item: EmployeeRelatedT) => (
                <div className="flex items-center justify-center" dir="ltr">
                    <span className="text-left text-sm text-gray-600">{item.email}</span>
                </div>
            ),
            headerClassName: "w-50",
            className: "w-50 text-center",
        },
        {
            header: "الوظيفة",
            accessor: (item: EmployeeRelatedT) => (
                <span className="flex items-center justify-center" dir="ltr">
                    {item.jobTitle}
                </span>
            ),
            headerClassName: "w-45",
            className: "w-45 text-center",
        },
        {
            header: "الإجراءات",
            accessor: (item: EmployeeRelatedT) => (
                <EmployeesAction
                    caseItem={item}
                    onEmployeeUpdated={() => {
                        // تحديث البيانات بعد التعديل
                        console.log("تم تحديث الموظف");
                    }}
                />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];

    return (
        <div className="space-y-6">
            <HeaderEmployees
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onAddClick={() => setIsAddModalOpen(true)}
            />

            <DataTable
                data={currentEmployees}
                columns={columns}
                rowIdField="id"
            />


            {filteredEmployees.length > 0 ? (
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
                    <p className="text-gray-500 text-lg">لا يوجد موظفين مطابقين لمعايير البحث</p>
                </div>
            )}

            {/* موديل إضافة موظف جديد */}
            <Editemployees
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onEmployeeUpdated={() => {
                    console.log("تم إضافة موظف جديد");
                    // هنا يمكن إضافة منطق تحديث الجدول
                }}
            />
        </div>
    );
};