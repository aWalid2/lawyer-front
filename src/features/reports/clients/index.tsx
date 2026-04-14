import { useState } from "react";
import { HeaderPageReportsClients } from "./components/HeaderPageReportsClients";
import type { ReportClient } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { useGetClients } from "./api/hooks/useGetClients";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

const ReportsClientsFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 15;
  
  const { data: clientsData, isPending, isError, error } = useGetClients(page, limit, statusFilter, searchTerm);
  const totalPages = clientsData?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(clientsData?.data, page, limit);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/20 text-success";
      case "inactive":
        return "bg-error/20 text-error";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  const columns: Column<ReportClient>[] = [
    {
      header: "#",
      accessor: (item: ReportClient) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "اسم الموكل",
      accessor: (item: ReportClient) => item.user.first_name,
    },
    {
      header: "عدد القضايا",
      accessor: (item) => (
        <span className="bg-[#A6A6A6] text-white px-3 py-1 rounded-[8px] text-xs font-semibold">
          {item.case_count}
        </span>
      ),
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-main text-xs font-medium whitespace-nowrap ${getStatusStyles(item.user.user_status)}`}
        >
          {item.user.user_status === "active" ? "نشط" : "غير نشط"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageReportsClients
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={setStatusFilter}
          filter={statusFilter}
        />

        <DataTable
          columns={columns}
          data={indexedData}
          rowKey="user_id"
          
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

export default ReportsClientsFeature;