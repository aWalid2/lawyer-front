import React, { useState, useMemo, useEffect, useCallback } from "react";
import { HeaderPageDocuments } from "./components/HeaderPageDocuments";
import type { Document } from "./types/types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableDocumentsActions } from "./components/TableDocumentsActions";
import { useFetchDocuments } from "./api/hooks/useGetDocuments";
import { useSearchDocuments } from "./api/hooks/useSearchDocuments";
import type { SearchDocumentResult } from "./api/service/searchDocuments";
import {
  extractCasesList,
  useFetchCases,
} from "@/features/UserTasks/api/hooks/useGetCase";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import PageLayout from "@/shared/components/PageLayout";
import { Spinner } from "@/components/ui/spinner";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { Pagination } from "@/shared/components/Pagination";
import { EmptyTable } from "@/shared/components/EmptyTable";

export const DocumentsFeature: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 15;

  useEffect(() => {
    setPage(1);
  }, [statusFilter, searchTerm]);

  const isSearching = searchTerm.trim().length > 0;

  const {
    data: documentsResponse,
    isPending: isListPending,
    isError: isListError,
    refetch,
  } = useFetchDocuments(page, limit, statusFilter);

  const {
    data: searchResponse,
    isPending: isSearchPending,
    isError: isSearchError,
  } = useSearchDocuments(searchTerm.trim(), page, limit);

  const isPending = isSearching ? isSearchPending : isListPending;
  const isError = isSearching ? isSearchError : isListError;

  const { data: cases } = useFetchCases();

  const documents = useMemo(() => {
    if (isSearching) {
      if (!searchResponse?.data) return [];
      return searchResponse.data.map((item: SearchDocumentResult) => ({
        id: Number(item.id),
        document_type: item.document_type as
          | "CASE_RELATED"
          | "NOT_CASE_RELATED",
        document_name: item.document_name,
        document_category: item.document_type === "CASE_RELATED" ? "" : "-",
        document_details: "",
        case_title: item.case_title,
        case_id: "",
        file: "",
      }));
    }
    if (!documentsResponse) return [];
    if (Array.isArray(documentsResponse.data)) return documentsResponse.data;
    if (Array.isArray(documentsResponse)) return documentsResponse;
    return [];
  }, [documentsResponse, searchResponse, isSearching]);

  const totalPages = isSearching
    ? (searchResponse?.meta?.total_pages ?? 1)
    : (documentsResponse?.meta?.total_pages ?? 1);
  const indexedData = useIndexedData(documents, page, limit);

  const casesMap = useMemo(() => {
    const casesList = extractCasesList(cases);

    if (casesList.length === 0) return new Map();

    return new Map(
      casesList.map((caseItem: any) => [
        String(caseItem.id || caseItem.case_id),
        caseItem.case_title,
      ]),
    );
  }, [cases]);

  const getCaseTitle = (caseId: string | number): string => {
    if (!caseId) return "-";
    const key = String(caseId);
    return casesMap.get(key) || String(caseId);
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
  }, []);

  const columns: Column<Document & { rowNumber: number }>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13 text-center",
    },
    {
      header: "نوع المستند",
      accessor: (item) =>
        item.document_type === "CASE_RELATED" ? "تابع لقضية" : "غير تابع لقضية",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "اسم القضية / نوع المستند",
      accessor: (item) => {
        if (item.document_type === "CASE_RELATED") {
          if (isSearching) {
            return (item as any).case_title || "-";
          }
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
      accessor: (item) => <TableDocumentsActions document={item} />,
      headerClassName: "w-35",
      className: "w-35",
    },
  ];

  if (!isSearching && isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

  return (
    <PageLayout>
      <HeaderPageDocuments
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onFilterChange={setStatusFilter}
        filter={statusFilter}
        onDocumentAdded={() => {
          refetch();
        }}
      />

      <div className="relative">
        <DataTable
          rowKey="id"
          columns={columns}
          data={indexedData}
          rowIdField="id"
        />

        {isSearching && isPending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60">
            <Spinner className="size-8 text-[#CBA462]" />
          </div>
        )}

        {isSearching && !isPending && indexedData.length === 0 && (
          <EmptyTable message="لا توجد مستندات مطابقة للبحث" />
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </PageLayout>
  );
};

export default DocumentsFeature;
