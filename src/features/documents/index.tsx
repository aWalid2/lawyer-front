// documents/DocumentsFeature.tsx
import React, { useState, useMemo, useEffect } from 'react'
import { HeaderPageDocuments } from "./components/HeaderPageDocuments";
import type { Document } from "./types/types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableDocumentsActions } from "./components/TableDocumentsActions";
import { Pagination } from "@/shared/components/Pagination";
import { useFetchDocuments } from "./api/hooks/useGetDocuments";
import { useFetchCases } from "@/features/UserTasks/api/hooks/useGetCase";
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';

export const DocumentsFeature: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const { data: documentsResponse, isPending, isError, refetch } = useFetchDocuments();
    const { data: cases } = useFetchCases();

    const documents = documentsResponse?.data || documentsResponse || [];

    // عمل Map للقضايا باستخدام case_title
    const casesMap = useMemo(() => {
        if (!cases?.data) return new Map();
        return new Map(cases.data.map((caseItem: any) => [
            String(caseItem.id || caseItem.case_id),
            caseItem.case_title // استخدام case_title
        ]));
    }, [cases]);

    // دالة لجلب اسم القضية
    const getCaseTitle = (caseId: string | number): string => {
        if (!caseId) return "-";
        const key = String(caseId);
        return casesMap.get(key) || String(caseId);
    };

    const filteredDocuments = useMemo(() => {
        if (!documents.length) return [];

        let filtered = [...documents];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter((doc) =>
                doc.document_name?.toLowerCase().includes(term) ||
                doc.document_category?.toLowerCase().includes(term) ||
                doc.document_details?.toLowerCase().includes(term)
            );
        }

        if (filter !== "all") {
            filtered = filtered.filter((doc) => {
                if (filter === "case") return doc.document_type === "CASE_RELATED";
                if (filter === "non_case") return doc.document_type === "NOT_CASE_RELATED";
                return true;
            });
        }

        return filtered;
    }, [documents, searchTerm, filter]);

    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

    const paginatedDocuments = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredDocuments.slice(start, start + itemsPerPage);
    }, [filteredDocuments, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filter]);

    const indexedData = useMemo(() => {
        return paginatedDocuments.map((item, index) => ({
            ...item,
            rowNumber: ((currentPage - 1) * itemsPerPage) + index + 1
        }));
    }, [paginatedDocuments, currentPage]);

    const columns: Column<Document & { rowNumber: number }>[] = [
        {
            header: "#",
            accessor: (item) => item.rowNumber,
            headerClassName: "w-13",
            className: "w-13 text-center",
        },
        {
            header: "نوع المستند",
            accessor: (item) => item.document_type === "CASE_RELATED" ? "تابع لقضية" : "غير تابع لقضية",
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "اسم القضية / نوع المستند",
            accessor: (item) => {
                if (item.document_type === "CASE_RELATED") {
                    // تأكد من اسم الحقل الصحيح (caseId أو case_id)
                    const caseIdValue = (item as any).caseId || (item as any).case_id;
                    return getCaseTitle(caseIdValue);
                } else {
                    return item.document_category || "-";
                }
            },
            headerClassName: "w-35",
            className: "w-35",
        },
        {
            header: "اسم المستند",
            accessor: (item) => item.document_name || "-",
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

    if (documents.length === 0) {
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
                    <div className="text-center py-10 text-gray-500">
                        لا توجد مستندات
                    </div>
                </div>
            </div>
        );
    }

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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentsFeature;