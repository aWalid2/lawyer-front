import React, { useEffect, useState, useMemo } from 'react'
import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { Pagination } from "@/components/shared/components/Pagination";
import { HeaderClient } from './clients/HederClient';
import { UserClientsAction } from './clients/UserClientsAction';

interface UsersClientsTypes {
    // يمكن إضافة خصائص هنا إذا لزم الأمر
}

interface ClientRelatedT {
    id: string;
    clientName: string;
    casesCount: number;
    phoneNumber: string;
}

// بيانات تجريبية للعملاء
const clients: ClientRelatedT[] = [
    { id: "1", clientName: "أحمد محمد علي", casesCount: 5, phoneNumber: "0501234567" },
    { id: "2", clientName: "فاطمة عبدالله", casesCount: 3, phoneNumber: "0559876543" },
    { id: "3", clientName: "محمد إبراهيم", casesCount: 7, phoneNumber: "0561122334" },
    { id: "4", clientName: "سارة خالد", casesCount: 2, phoneNumber: "0544455667" },
    { id: "5", clientName: "عمر حسن", casesCount: 4, phoneNumber: "0587788990" },
    { id: "6", clientName: "نورة سعد", casesCount: 6, phoneNumber: "0593344556" },
];

export const UsersClient: React.FC<UsersClientsTypes> = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // فلترة العملاء بناءً على البحث
    const filteredClients = useMemo(() => {
        if (!searchTerm) return clients;

        return clients.filter(client =>
            client.clientName.includes(searchTerm) ||
            client.phoneNumber.includes(searchTerm)
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    // إعادة تعيين الصفحة الحالية إذا كانت أكبر من إجمالي الصفحات
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // حساب العملاء للصفحة الحالية
    const currentClients = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredClients.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredClients, currentPage, itemsPerPage]);

    // دالة مساعدة لحساب الرقم التسلسلي
    const getSerialNumber = (item: ClientRelatedT): number => {
        const indexInFiltered = filteredClients.findIndex(c => c.id === item.id);
        return indexInFiltered + 1;
    };

    const columns: Column<ClientRelatedT>[] = [
        {
            header: "#",
            accessor: (item: ClientRelatedT) => getSerialNumber(item),
            headerClassName: "w-13",
            className: "w-13 text-center font-medium",
        },
        {
            header: "اسم الموكل",
            accessor: "clientName",
            headerClassName: "w-50",
            className: "w-50 font-medium",
        },
        {
            header: "عدد القضايا",
            accessor: (item: ClientRelatedT) => (
                <span className="px-3 py-1 bg-[#A6A6A6] text-[#FFFFFF] rounded-lg text-sm">
                    {item.casesCount}
                </span>
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
        {
            header: "رقم الهاتف",
            accessor: (item: ClientRelatedT) => (
                <div className="flex items-center justify-center " dir="ltr">
                    <span className="text-left">{item.phoneNumber}</span>
                </div>
            ),
            headerClassName: "w-40",
            className: "w-40",
        },
        {
            header: "الإجراءات",
            accessor: (item: ClientRelatedT) => (
                <UserClientsAction caseItem={item} />
            ),
            headerClassName: "w-35 text-center",
            className: "w-35 text-center",
        },
    ];

    return (
        <div className="space-y-6">
            <HeaderClient
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
            />

            <DataTable
                data={currentClients}
                columns={columns}
                rowIdField="id"
            />


            {filteredClients.length > 0 ? (
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
                    <p className="text-gray-500 text-lg">لا يوجد عملاء مطابقين لمعايير البحث</p>
                </div>
            )}

        </div>
    );
};