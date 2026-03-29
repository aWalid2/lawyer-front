import { useState, useMemo, useEffect } from "react";
import { HeaderPageRoll } from "./components/HeaderPageRoll";
import type { RollSession } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableRollActions } from "./components/TableRollActions";

const MOCK_ROLL_SESSIONS: RollSession[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  sessionDateTime: "#6345",
  hallNumber: "5",
  hallFloor: "6",
  rollNumber: "23",
  decision: "قرار",
}));

const RollFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ type: string; date?: Date }>({
    type: "all",
  });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredSessions = useMemo(() => {
    return MOCK_ROLL_SESSIONS.filter((s) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        s.sessionDateTime.includes(searchStr) ||
        s.hallNumber.includes(searchStr) ||
        s.hallFloor.includes(searchStr);

      const matchesType = filters.type === "all";

      return matchesSearch && matchesType;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSessions.slice(start, start + itemsPerPage);
  }, [filteredSessions, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const columns: Column<RollSession>[] = [
    {
      header: "#",
      accessor: (item) => filteredSessions.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "تاريخ ووقت الجلسة",
      accessor: "sessionDateTime",
    },
    {
      header: "رقم القاعة",
      accessor: "hallNumber",

    },

    {
      header: "دور القاعة",
      accessor: "hallFloor",
    },
    {
      header: "رقم الدور",
      accessor: "rollNumber",
    },
    {
      header: "القرار",
      accessor: "decision",
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
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageRoll
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <DataTable
          columns={columns}
          data={paginatedSessions}
          rowIdField="id"
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default RollFeature;
