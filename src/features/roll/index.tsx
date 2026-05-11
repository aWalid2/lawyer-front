import { useMemo, useState } from "react";
import { HeaderPageRoll } from "./components/HeaderPageRoll";
import type { RollSession, RollSessionApiResponse } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import type { HeaderExportType } from "../../shared/components/HeaderExportMenu";
import { Pagination } from "@/shared/components/Pagination";
import { TableRollActions } from "./components/TableRollActions";
import PageLayout from "@/shared/components/PageLayout";
import { useGetAllRollSessions } from "./api/hooks/useGetAllSessions";
import LoadingPage from "@/shared/components/LoadingPage";
import { formatDateToTime, formatDateToYYYYMMDD } from "@/shared/utils";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";

interface RollFilters {
  sessionSource: string;
  fromDate?: Date;
  toDate?: Date;
}

const FALLBACK_TEXT = "-";

const LITIGATION_LEVEL_LABELS = Object.fromEntries(
  LITIGATION_LEVEL_OPTIONS.map(({ value, label }) => [value, label]),
);

const formatSessionSourceLabel = (value: string | null) => {
  if (value && value in LITIGATION_LEVEL_LABELS) {
    return LITIGATION_LEVEL_LABELS[
      value as keyof typeof LITIGATION_LEVEL_LABELS
    ];
  }

  switch (value) {
    case "court":
      return "محكمة";
    case "prosecution":
      return "نيابة";
    case "police":
      return "مخفر";
    case "procedure":
      return "إجراءات";
    default:
      return value || FALLBACK_TEXT;
  }
};

const mapRollSession = (
  session: RollSessionApiResponse,
  index: number,
): RollSession => {
  const hallNumber =
    session.hall_number === null ? FALLBACK_TEXT : String(session.hall_number);
  const referenceNumber = session.reference_number || FALLBACK_TEXT;

  return {
    id: `${session.case_id}-${session.session_date}-${session.session_source || "all"}-${index}`,
    caseId: session.case_id,
    caseSequence: session.case_sequence || FALLBACK_TEXT,
    reference_number: referenceNumber,
    sessionDate: session.session_date,
    courtName: session.court_name || FALLBACK_TEXT,
    police_station_name: session.police_station_name || undefined,
    presecution_name: session.presecution_name || undefined,
    sessionSource: formatSessionSourceLabel(session.session_source),
    clientName: session.client_name || FALLBACK_TEXT,
    client_status: session.client_type || FALLBACK_TEXT,
    opponents: session.opponents || [],
    caseTitle: session.case_title || FALLBACK_TEXT,
    caseTypeName: session.case_type_name || FALLBACK_TEXT,
    hallNumber,
    sessionDateTime: session.session_date,
    hallFloor: FALLBACK_TEXT,
    rollNumber: referenceNumber,
    decision: FALLBACK_TEXT,
  };
};

const RollFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<RollFilters>({
    sessionSource: "all",
  });
  const itemsPerPage = 15;

  const { data, isPending, isFetching } = useGetAllRollSessions({
    sessionSource: filters.sessionSource,
    dateFrom: filters.fromDate,
    dateTo: filters.toDate,
  });

  const sessions = useMemo(
    () => (data || []).map((session, index) => mapRollSession(session, index)),
    [data],
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

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const searchStr = searchTerm.toLowerCase();

      const matchesSearch =
        s.caseSequence.toLowerCase().includes(searchStr) ||
        s.reference_number.toLowerCase().includes(searchStr) ||
        s.sessionDateTime.toLowerCase().includes(searchStr) ||
        s.courtName.toLowerCase().includes(searchStr) ||
        s.clientName.toLowerCase().includes(searchStr) ||
        s.caseTitle.toLowerCase().includes(searchStr) ||
        s.caseTypeName.toLowerCase().includes(searchStr) ||
        s.hallNumber.includes(searchStr) ||
        s.sessionSource.toLowerCase().includes(searchStr);

      return matchesSearch;
    });
  }, [searchTerm, sessions]);

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedSessions = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredSessions.slice(start, start + itemsPerPage);
  }, [filteredSessions, safeCurrentPage]);

  const handleExport = (type: HeaderExportType) => {
    console.log(
      `Exporting ${filteredSessions.length} roll sessions as ${type}`,
    );
  };

  const columns: Column<RollSession>[] = [
    {
      header: "#",
      accessor: (item) =>
        filteredSessions.findIndex((d) => d.id === item.id) + 1,
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
      header: "إجراء",
      accessor: (item) => (
        <TableRollActions
          session={item}
          onEdit={(s) => console.log("Editing session:", s)}
          onDelete={(s) => console.log("Deleting session:", s)}
        />
      ),
    },
  ];

  if (isPending && !data) {
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

      <div className="relative">
        {isFetching ? (
          <div className="dark:bg-backgroundDark/70 absolute inset-0 z-10 bg-white/70">
            <LoadingPage fullScreen={false} />
          </div>
        ) : null}

        <DataTable columns={columns} data={paginatedSessions} rowIdField="id" />
      </div>

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
