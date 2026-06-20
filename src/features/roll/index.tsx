import { DataTable, type Column } from "@/shared/components/DataTable";
import LoadingPage from "@/shared/components/LoadingPage";
import PageLayout from "@/shared/components/PageLayout";
import { Pagination } from "@/shared/components/Pagination";
import { useExport } from "@/shared/hooks/useExport";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils";
import { useMemo, useState } from "react";
import { useGetAllRollSessions } from "./api/hooks/useGetAllSessions";
import { useSearchSessions } from "./api/hooks/useSearchSessions";
import { exportRollSessionsExcel } from "./api/service/exportRollSessionsExcel";
import { exportRollSessionsPdf } from "./api/service/exportRollSessionsPdf";
import { HeaderPageRoll } from "./components/HeaderPageRoll";
import { useRoll } from "./hooks/useRoll";
import type { RollSession } from "./types";
import { EmptyTable } from "@/shared/components/EmptyTable";

interface RollFilters {
  sessionSource: string;
  fromDate?: Date;
  toDate?: Date;
}

const RollFeature = () => {
  const { mapRollSession, FALLBACK_TEXT } = useRoll();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<RollFilters>({
    sessionSource: "all",
  });
  const itemsPerPage = 15;
  const isSearching = searchTerm.trim().length > 0;

  const {
    data: allSessionsData,
    isPending: isAllPending,
    // isFetching: isAllFetching,
  } = useGetAllRollSessions({
    sessionSource: filters.sessionSource,
    dateFrom: filters.fromDate,
    dateTo: filters.toDate,
  });
  console.log(allSessionsData);

  const {
    data: searchData,
    isPending: isSearchPending,
    // isFetching: isSearchFetching,
  } = useSearchSessions({
    q: searchTerm.trim(),
    page: currentPage,
    limit: itemsPerPage,
    enabled: isSearching,
  });

  const isPending = isSearching ? isSearchPending : isAllPending;
  // const isFetching = isSearching ? isSearchFetching : isAllFetching;
  const rawData = isSearching ? searchData?.data : allSessionsData;

  const { handleExport: triggerExport } = useExport({
    exportExcelFn: exportRollSessionsExcel,
    exportPdfFn: exportRollSessionsPdf,
    getFileName: (type, params) => {
      const dateStr = new Date().toISOString().split("T")[0];
      let fileName = `roll-sessions-${dateStr}`;
      if (params.sessionSource !== "all") {
        fileName += `-${params.sessionSource}`;
      }
      fileName += type === "excel" ? ".xlsx" : ".pdf";
      return fileName;
    },
    loadingMessage: (type) =>
      `جاري تحميل ملف رول الجلسات (${type === "excel" ? "Excel" : "PDF"})...`,
    successMessage: (type) =>
      `تم تحميل ملف رول الجلسات (${type === "excel" ? "Excel" : "PDF"}) بنجاح!`,
  });

  const handleExport = (type: "pdf" | "excel") => {
    triggerExport(type, {
      sessionSource: filters.sessionSource,
      dateFrom: filters.fromDate,
      dateTo: filters.toDate,
    });
  };

  const sessions = useMemo(
    () =>
      (rawData || []).map((session, index) => mapRollSession(session, index)),
    [rawData, mapRollSession],
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (
    key: keyof RollFilters,
    value: RollFilters[keyof RollFilters],
  ) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const totalPages = isSearching
    ? (searchData?.meta?.total_pages ?? 1)
    : Math.ceil(sessions.length / itemsPerPage);
  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedSessions = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return sessions.slice(start, start + itemsPerPage);
  }, [sessions, safeCurrentPage]);

  const columns: Column<RollSession>[] = [
    {
      header: "#",
      accessor: (_item, index) =>
        (safeCurrentPage - 1) * itemsPerPage + index + 1,
      headerClassName: "w-15",
    },
    {
      header: "الرقم الالي للقضية",
      accessor: "reference_number",
    },
    {
      header: "رقم القضية داخل المكتب",
      accessor: "caseSequence",
    },
    {
      header: "تاريخ ووقت الجلسة",
      accessor: (item) =>
        formatDateToYYYYMMDD(item.sessionDateTime) +
        " " +
        formatDateToTime(item.sessionDateTime),
    },
    {
      header: "اسم الجهة",
      accessor: (item) =>
        (item.courtName !== FALLBACK_TEXT ? item.courtName : undefined) ||
        item.police_station_name ||
        item.presecution_name ||
        FALLBACK_TEXT,
    },
    {
      header: "درجة التقاضي",
      accessor: "sessionSource",
    },
    {
      header: "اسم الموكل",
      accessor: "clientName",
    },
    {
      header: "صفة الموكل",
      accessor: "client_status",
    },
    {
      header: "اسم الخصم",
      accessor: (item) =>
        item.opponents.length > 0 ? item.opponents.join("، ") : FALLBACK_TEXT,
    },
    {
      header: "صفة الخصم",
      accessor: () => FALLBACK_TEXT,
    },
    {
      header: "عنوان القضية",
      accessor: "caseTitle",
    },
    {
      header: "نوع القضية",
      accessor: "caseTypeName",
    },

    {
      header: "رقم القاعة",
      accessor: "hallNumber",
    },
    {
      header: "قرار الجلسة",
      accessor: "session_decision",
    },
  ];

  if (isPending && !rawData) {
    return <LoadingPage />;
  }

  return (
    <PageLayout>
      <HeaderPageRoll
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        filters={filters}
      />

      {paginatedSessions.length === 0 ? (
        <EmptyTable
          message={
            isSearching ? "لا توجد جلسات تطابق  البحث" : "لا توجد جلسات لعرضها"
          }
        />
      ) : (
        <DataTable columns={columns} data={paginatedSessions} rowIdField="id" />
      )}

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

export default RollFeature;
