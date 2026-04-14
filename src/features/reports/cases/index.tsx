import { useState  } from "react";
import { HeaderPageReportsCases } from "./components/HeaderPageReportsCases";
import type { ReportCase } from "./types/reportCase";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { useReportCase } from "./api/hooks/useReportCase";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";


const ReportsCasesFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 15;
  const { data, isPending, isError, error } = useReportCase(page, limit, statusFilter, searchTerm);
  const totalPages = data?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(data, page, limit);


  const getStatusStyles = (status: string) => {
  switch (status) {
    default:
      return "bg-gray-100 text-gray-600";
  }
};

  if (isPending) return <LoadingPage />
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  const columns: Column<ReportCase>[] = [
    {
      header: "#",
      accessor: (item: ReportCase) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: "case_sequence",
    },
    {
      header: "اسم الموكل",
      accessor: (item: ReportCase) => (item.client.first_name), 
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-main text-xs font-medium whitespace-nowrap ${getStatusStyles(item?.caseStatus?.name || "")} `}
        >
          {item?.caseStatus?.name}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageReportsCases
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={setStatusFilter}
          filter={statusFilter}
        />

        <DataTable
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

export default ReportsCasesFeature;
