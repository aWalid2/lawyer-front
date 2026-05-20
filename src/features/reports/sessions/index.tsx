import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsSessions } from "./components/HeaderPageReportsSessions";
import type { ReportSession } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import PageLayout from "@/shared/components/PageLayout";
import { useGetAllSessionsReports } from "./api/hooks/useGetAllSessionsReports";
import { exportSessions } from "./api/services/exportSessions";
import { formatDateToYYYYMMDD } from "@/shared/utils";
import { toast } from "sonner";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import type { GetAllSessionsParams } from "./api/services/getAllSessionsReports";

const itemsPerPage = 15;

export const ReportsSessionsFeature: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ session_source: "all", session_type: "all" });

  const apiParams = useMemo(() => {
    const params: GetAllSessionsParams = { page: currentPage, limit: itemsPerPage };
    if (filters.session_source !== "all") params.session_source = filters.session_source;
    if (filters.session_type !== "all") params.session_type = filters.session_type;
    if (searchTerm) params.search = searchTerm;
    return params;
  }, [filters, searchTerm, currentPage]);

  const { data, isPending, isError, error } = useGetAllSessionsReports(apiParams);
  const sessions = useMemo(() => data?.data ?? [], [data]);


  const totalPages = data?.meta?.total_pages ?? 1;

  const safeCurrentPage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const paginatedSessions = useMemo(() =>
    sessions.map((session, index) => ({
      ...session,
      rowNumber: (currentPage - 1) * itemsPerPage + index + 1,
    }))
    , [sessions, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleFilterChange = (key: string, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleExport = async (type: "pdf" | "excel") => {
    try {
      const blob = await exportSessions(type, apiParams);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sessions-report.${type === "excel" ? "xlsx" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error(`خطأ أثناء تصدير تقرير الجلسات ${type}`);
    }
  };

  const columns: Column<ReportSession>[] = [
    { header: "#", accessor: "rowNumber", headerClassName: "w-15" },
    { header: "نوع الجلسة", accessor: "session_source" },
    { header: "الدرجة القضائية", accessor: "session_type" },
    { header: "رقم القضية", accessor: "case_sequence" },
    { header: "اسم الموكل", accessor: "client_name" },
    { header: "اسم المحامي", accessor: "lawyer_name" },
    { header: "الجهة", accessor: "entity" },
    {
      header: "تاريخ الجلسة",
      accessor: (item) => formatDateToYYYYMMDD(item.session_date) || "-",
    },
    { header: "قرار الجلسة", accessor: "session_decision" },
  ];


  if (isPending) return <LoadingPage />;
  if (isError) return <Error message={error?.message} />;

  return (
    <PageLayout>
      <HeaderPageReportsSessions
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        filters={filters}
      />

      <DataTable columns={columns} data={paginatedSessions} rowIdField="id" />

      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

export default ReportsSessionsFeature;
