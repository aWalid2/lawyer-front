import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsCases } from "./components/HeaderPageReportsCases";
import type { ReportCase } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";

const MOCK_REPORT_CASES: ReportCase[] = Array.from({ length: 39 }, (_, i) => ({
  id: `${i + 1}`,
  caseNumber: "255",
  clientName: i % 2 === 0 ? "محمد علي" : "أحمد محمود",
  assignedLawyer: "16265",
  responsibleLawyerCode: "16265",
  status: ((): "pending" | "closed" | "active" | "on_hold" => {
    const statuses = ["pending", "closed", "active", "on_hold"] as const;
    return statuses[i % 4];
  })(),
}));

const ReportsCasesFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 15;

  const filteredCases = useMemo(() => {
    return MOCK_REPORT_CASES.filter((c) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        c.clientName.toLowerCase().includes(searchStr) ||
        c.caseNumber.includes(searchStr);
      const matchesFilter = filter === "all" || c.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(start, start + itemsPerPage);
  }, [filteredCases, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const columns: Column<ReportCase>[] = [
    {
      header: "#",
      accessor: (item) => filteredCases.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: "caseNumber",
    },
    {
      header: "اسم الموكل",
      accessor: "clientName",
    },
    {
      header: "المحامي المسؤول",
      accessor: "assignedLawyer",
    },
    {
      header: "الحالة",
      accessor: (item) => {
        const statusMap = {
          pending: { label: "متداولة", color: "bg-success/20 text-success" },
          closed: { label: "مغلقة", color: "bg-error/20 text-error" },
          active: { label: "نشط", color: "bg-success/20 text-success" },
          on_hold: { label: "غير نشط", color: "bg-error/20 text-error" },
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
        <HeaderPageReportsCases
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={setFilter}
          filter={filter}
        />

        <DataTable
          columns={columns}
          data={paginatedCases}
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

export default ReportsCasesFeature;
