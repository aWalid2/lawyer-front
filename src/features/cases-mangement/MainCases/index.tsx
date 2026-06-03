import { useState } from "react";
import { HeaderPageCase } from "./componnents/HeaderPageCase";
import type { Case } from "./types/casesTypes";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableCasesActions } from "./componnents/TableCasesActions";
import { useGetCases, useSearchCases } from "./api/hooks/useGetCases";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";

import PageLayout from "@/shared/components/PageLayout";
import { Pagination } from "@/shared/components/Pagination";

const MainCases = () => {
  const columns: Column<Case>[] = [
    {
      header: "#",
      accessor: (item: Case) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية",
      accessor: (item) => item.case_sequence,
      className: "font-medium text-black",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: (item) => item.reference_number,
    },
    {
      header: "اسم الموكل",
      accessor: (item: any) => item.client?.first_name,
    },
    {
      header: " عنوان القضية",
      accessor: (item: any) => item.case_title,
    },
    {
      header: " نوع القضية",
      accessor: (item: any) => item.case_type?.name,
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`rounded-main px-3 py-1 text-xs font-medium whitespace-nowrap ${item?.caseStatus?.name || ""} `}
        >
          {item?.caseStatus?.name}
        </span>
      ),
    },
    {
      header: "إجراء",
      accessor: (item) => <TableCasesActions caseItem={item} />,
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const {
    data: allCases,
    isPending: isAllPending,
    isError: isAllError,
  } = useGetCases(page, statusFilter === "all" ? undefined : statusFilter);
  const {
    data: searchResults,
    isPending: isSearchPending,
    isError: isSearchError,
  } = useSearchCases(page, searchTerm);

  const cases = searchTerm ? searchResults : allCases;
  const isPending = searchTerm ? isSearchPending : isAllPending;
  const isError = searchTerm ? isSearchError : isAllError;
  const totalPages = cases?.meta?.total_pages ?? 1;
  const limit = cases?.meta?.limit || 15;
  const indexedData = useIndexedData(cases?.data || [], page, limit);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setPage(1);
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  if (isError) return <EmptyTable message="حدث خطأ في تحميل البيانات" />;
  return (
    <PageLayout>
      <HeaderPageCase
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      {isPending ? (
        <LoadingPage fullScreen={false} />
      ) : indexedData?.length === 0 ? (
        <EmptyTable message="لا توجد بيانات حالية لادارة القضايا" />
      ) : (
        <>
          <DataTable rowKey="id" data={indexedData} columns={columns} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </PageLayout>
  );
};

export default MainCases;
