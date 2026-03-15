import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsSessions } from "./components/HeaderPageReportsSessions";
import type { ReportSession } from "./types";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";

const MOCK_REPORT_SESSIONS: ReportSession[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  sessionType: i % 3 === 0 ? "محكمة" : i % 3 === 1 ? "نيابة" : "مخفر",
  judicialGrade: i % 3 === 0 ? "أول درجة" : i % 3 === 1 ? "استئناف" : "تمييز",
  caseAutoNumber: "001",
  clientName: "علي محمد",
  lawyerName: "أحمد العتيبي",
  entity: "محكمة العراق",
  sessionDate: "14/10/2025",
  status: i % 2 === 0 ? "attended" : "postponed",
}));

const ReportsSessionsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ type: "all", status: "all" });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredSessions = useMemo(() => {
    return MOCK_REPORT_SESSIONS.filter((s) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        s.clientName.toLowerCase().includes(searchStr) || 
        s.lawyerName.toLowerCase().includes(searchStr) ||
        s.caseAutoNumber.includes(searchStr);
      
      const matchesType = filters.type === "all" || (filters.type === "court" && s.sessionType === "محكمة") || (filters.type === "niyaba" && s.sessionType === "نيابة");
      const matchesStatus = filters.status === "all" || s.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
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

  const columns: Column<ReportSession>[] = [
    {
      header: "#",
      accessor: (item) => filteredSessions.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "نوع الجلسة",
      accessor: "sessionType",
    },
    {
      header: "الدرجة القضائية",
      accessor: (item) => item.judicialGrade || "-",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: "caseAutoNumber",
    },
    {
      header: "اسم الموكل",
      accessor: "clientName",
    },
    {
      header: "اسم المحامي",
      accessor: "lawyerName",
    },
    {
      header: "الجهة",
      accessor: "entity",
    },
    {
      header: "تاريخ الجلسة",
      accessor: "sessionDate",
    },
    {
      header: "الحالة",
      accessor: (item) => {
        const statusMap = {
          attended: { label: "انعقدت", color: "bg-success/20 text-success" },
          postponed: { label: "مؤجلة", color: "bg-error/20 text-error" },
        };
        const config = statusMap[item.status];
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-regular ${config.color}`}>
            {config.label}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageReportsSessions
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

export default ReportsSessionsFeature;
