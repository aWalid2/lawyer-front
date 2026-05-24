import { useState } from "react";
import { HeaderPageReportsCases } from "./components/HeaderPageReportsCases";
import type { ReportCase } from "./types/reportCase";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { useReportCase } from "./api/hooks/useReportCase";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import PageLayout from "@/shared/components/PageLayout";

const ReportsCasesFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 15;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const {
    data: cases,
    isPending,
    isError,
    error,
  } = useReportCase(page, limit, statusFilter, searchTerm);

  const totalPages = cases?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(cases?.data, page, limit);

  const getStatusStyles = (status: string) => {
    switch (status) {
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isPending) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  const columns: Column<ReportCase>[] = [
    {
      header: "#",
      accessor: (item: ReportCase) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية ",
      accessor: "case_sequence",
    },
    {
      header: "الرقم الالي للقضية ",
      accessor: "reference_number",
    },
    {
      header: "نوع القضية",
      accessor: (item: ReportCase) => item.case_type?.name || "-",
    },
    {
      header: "اسم الموكل",
      accessor: (item: ReportCase) => item.client.first_name,
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`rounded-main px-3 py-1 text-xs font-medium whitespace-nowrap ${getStatusStyles(item?.caseStatus?.name || "")} `}
        >
          {item?.caseStatus?.name}
        </span>
      ),
    },
  ];

  return (
    <PageLayout>
      <HeaderPageReportsCases
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filter={statusFilter}
      />

      <DataTable columns={columns} data={indexedData} rowIdField="id" />

      {totalPages > 1 && (
        <PaginationApi
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </PageLayout>
  );
};

export default ReportsCasesFeature;
