import React, { useState, useMemo } from 'react'
import { HeaderPageDocuments } from "./components/HeaderPageDocuments";
import type { Document } from "./types/types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableDocumentsActions } from "./components/TableDocumentsActions";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { useFetchDocuments } from "./api/hooks/useGetDocuments";
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';

export const DocumentsFeature: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const limit = 15;

    const { data: documentsResponse, isPending, isError, refetch } = useFetchDocuments(page, limit, searchTerm, filter);
    
    const documents = documentsResponse?.data || [];
    const totalPages = documentsResponse?.meta?.total_pages ?? 1;

    const indexedData = useMemo(() => {
        return documents.map((item: Document, index: number) => ({
            ...item,
            rowNumber: ((page - 1) * limit) + index + 1
        }));
    }, [documents, page, limit]);

    const columns: Column<Document & { rowNumber: number }>[] = [
        {
            header: "#",
            accessor: (item) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center",
        },
        {
            header: "نوع المستند",
            accessor: (item) => item.document_type === "case" ? "تابع لقضية" : "غير تابع لقضية",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "نوع المستند",
            accessor: "document_category",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "اسم المستند",
            accessor: "document_name",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "التفاصيل",
            accessor: "document_details",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "إجراء",
            accessor: (item) => (
                <TableDocumentsActions 
                    document={item} 
                    onDocumentUpdated={() => {
                        refetch();
                    }} 
                />
            ),
            headerClassName: "w-35",
            className: "w-35",
        },
    ];

    if (isPending) return <LoadingPage />
    if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

    return (
        <div className="w-full pt-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
                <HeaderPageDocuments
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    onFilterChange={setFilter}
                    filter={filter}
                    onDocumentAdded={() => {
                        refetch();
                    }}
                />

                <DataTable
                    rowKey="id"
                    columns={columns}
                    data={indexedData}
                    rowIdField="id"
                />

                {totalPages > 1 && (
                    <PaginationApi
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentsFeature;