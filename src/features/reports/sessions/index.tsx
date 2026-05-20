import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsSessions } from "./components/HeaderPageReportsSessions";
import type { ReportSession } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import PageLayout from "@/shared/components/PageLayout";
import { useGetAllSessionsReports } from "./api/hooks/useGetAllSessionsReports";
import { exportSessions } from "./api/services/exportSessions";
import { formatDateToYYYYMMDD } from "@/shared/utils";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { toast } from "sonner";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

const itemsPerPage = 15;

export const ReportsSessionsFeature: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ type: "all", status: "all" });

  const apiParams = useMemo(() => {
    const params: any = { page: 1, limit: 1000 };
    if (filters.type !== "all") params.session_source = filters.type;
    if (filters.status !== "all") params.session_type = filters.status;
    if (searchTerm) params.search = searchTerm;
    return params;
  }, [filters, searchTerm]);


  const { data, isPending, isError, error } = useGetAllSessionsReports(apiParams, 1);
  const sessions = useMemo(() => data?.data ?? [], [data]);


  const indexedSessions = useIndexedData(sessions, currentPage, itemsPerPage);
  const totalPages = Math.ceil(sessions.length / itemsPerPage);


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
      accessor: (item) => formatDateToYYYYMMDD(item.session_decision) || "-",
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

      <DataTable columns={columns} data={indexedSessions} rowIdField="id" />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

export default ReportsSessionsFeature;
