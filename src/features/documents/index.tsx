import React, { useState, useMemo, useEffect } from 'react'
import { HeaderPageDocuments } from "./components/HeaderPageDocuments";
import type { Document } from "./types/types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableDocumentsActions } from "./components/TableDocumentsActions";
import { useFetchDocuments } from "./api/hooks/useGetDocuments";
import { useFetchCases } from "@/features/UserTasks/api/hooks/useGetCase";
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';
import { useIndexedData } from '@/shared/utils/useIndexedData';
import { PaginationApi } from '@/shared/components/PaginationApi';

export const DocumentsFeature: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const limit = 15;

    useEffect(() => {
        setPage(1);
    }, [statusFilter]);

    const { data: documentsResponse, isPending, isError, refetch } = useFetchDocuments(page, limit, statusFilter,);
    const { data: cases } = useFetchCases();

    const documents = useMemo(() => {
        if (!documentsResponse) return [];
        if (Array.isArray(documentsResponse.data)) return documentsResponse.data;
        if (Array.isArray(documentsResponse)) return documentsResponse;
        return [];
    }, [documentsResponse]);

    const totalPages = documentsResponse?.meta?.total_pages ?? 1;
    const indexedData = useIndexedData(documents, page, limit);

    const casesMap = useMemo(() => {
        if (!cases?.data) return new Map();
        return new Map(cases.data.map((caseItem: any) => [
            String(caseItem.id || caseItem.case_id),
            caseItem.case_title
        ]));
    }, [cases]);

    const getCaseTitle = (caseId: string | number): string => {
        if (!caseId) return "-";
        const key = String(caseId);
        return casesMap.get(key) || String(caseId);
    };

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

    const getEmptyMessage = () => {
        if (statusFilter === "CASE_RELATED") return "لا توجد مستندات تابعة للقضايا";
        if (statusFilter === "NON_CASE_RELATED") return "لا توجد مستندات غير تابعة للقضايا";
        return "لا توجد مستندات";
    };

    if (documents.length === 0) {
        return (
            <div className="w-full pt-6 space-y-6">
                <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
                    <HeaderPageDocuments
                        onFilterChange={setStatusFilter}
                        filter={statusFilter}
                        onDocumentAdded={() => {
                            refetch();
                        }}
                    />
                    <div className="text-center py-10 text-gray-500">
                        {getEmptyMessage()}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pt-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
                <HeaderPageDocuments
                    onFilterChange={setStatusFilter}
                    filter={statusFilter}
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