import { useState } from "react";
import { HeaderPageReportsClients } from "./components/HeaderPageReportsClients";
import type { ReportClient } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { useGetClients } from "./api/hooks/useGetClients";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import PageLayout from "@/shared/components/PageLayout";

const ReportsClientsFeature = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 15;

  const {
    data: clientsData,
    isPending,
    isError,
    error,
  } = useGetClients(page, limit, statusFilter);
  const totalPages = clientsData?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(clientsData?.data, page, limit);

  const handleSearch = () => {
    // setSearchTerm(term);
    setPage(1);
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

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
  if (isError)
    return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  const columns: Column<ReportClient>[] = [
    {
      header: "#",
      accessor: (item: ReportClient) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "اسم الموكل",
      accessor: (item: ReportClient) => item.name,
    },
    {
      header: "رقم الهاتف",
      accessor: (item: ReportClient) => item.phone,
    },
    {
      header: "عدد القضايا",
      accessor: (item) => (
        <span className="rounded-xl bg-[#A6A6A6] px-3 py-1 text-xs font-semibold text-white">
          {item.case_count}
        </span>
      ),
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`rounded-main px-3 py-1 text-xs font-medium whitespace-nowrap ${getStatusStyles(item.status)}`}
        >
          {item.status === "active" ? "نشط" : "غير نشط"}
        </span>
      ),
    },
  ];

  return (
    <PageLayout>
      <HeaderPageReportsClients
        searchTerm={""}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filter={statusFilter}
      />

      <DataTable columns={columns} data={indexedData} />

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

export default ReportsClientsFeature;
