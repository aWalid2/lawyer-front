import { useState, useMemo } from "react";
import { HeaderPageRoll } from "./components/HeaderPageRoll";
import type { RollSession } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import type { HeaderExportType } from "../../shared/components/HeaderExportMenu";
import { Pagination } from "@/shared/components/Pagination";
import { TableRollActions } from "./components/TableRollActions";
import PageLayout from "@/shared/components/PageLayout";

interface RollFilters {
  type: string;
  fromDate?: Date;
  toDate?: Date;
}

const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const MOCK_ROLL_SESSIONS: RollSession[] = Array.from(
  { length: 45 },
  (_, i) => ({
    id: `${i + 1}`,
    sessionDateTime: `2026-05-${String((i % 28) + 1).padStart(2, "0")}T09:00:00`,
    hallNumber: "5",
    hallFloor: "6",
    rollNumber: "23",
    decision: "قرار",
  }),
);

const RollFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<RollFilters>({
    type: "all",
  });
  const itemsPerPage = 15;

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
    return MOCK_ROLL_SESSIONS.filter((s) => {
      const searchStr = searchTerm.toLowerCase();
      const sessionDate = normalizeDate(new Date(s.sessionDateTime));
      const fromDate = filters.fromDate
        ? normalizeDate(filters.fromDate)
        : undefined;
      const toDate = filters.toDate ? normalizeDate(filters.toDate) : undefined;
      const matchesSearch =
        s.sessionDateTime.toLowerCase().includes(searchStr) ||
        s.hallNumber.includes(searchStr) ||
        s.hallFloor.includes(searchStr);

      const matchesType = filters.type === "all";
      const matchesFromDate = !fromDate || sessionDate >= fromDate;
      const matchesToDate = !toDate || sessionDate <= toDate;

      return matchesSearch && matchesType && matchesFromDate && matchesToDate;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSessions.slice(start, start + itemsPerPage);
  }, [filteredSessions, currentPage]);

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
      accessor: "sessionDateTime",
    },
    {
      header: "رقم القضية داخل المكتب",
      accessor: "sessionDateTime",
    },
    {
      header: "تاريخ ووقت الجلسة",
      accessor: "sessionDateTime",
    },
    {
      header: "اسم الجهة",
      accessor: "sessionDateTime",
    },
    {
      header: "اسم الموكل",
      accessor: "sessionDateTime",
    },
    {
      header: "صفة الموكل",
      accessor: "sessionDateTime",
    },
    {
      header: "اسم الخصم",
      accessor: "sessionDateTime",
    },
    {
      header: "صفة الخصم",
      accessor: "sessionDateTime",
    },
    {
      header: "عنوان القضية",
      accessor: "hallNumber",
    },
    {
      header: "نوع القضية",
      accessor: "hallNumber",
    },

    {
      header: "دور القاعة",
      accessor: "hallFloor",
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

  return (
    <PageLayout>
      <HeaderPageRoll
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        filters={filters}
      />

      <DataTable columns={columns} data={paginatedSessions} rowIdField="id" />

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

export default RollFeature;
