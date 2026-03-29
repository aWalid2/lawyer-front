import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsClients } from "./components/HeaderPageReportsClients";
import type { ReportClient } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";

const MOCK_REPORT_CLIENTS: ReportClient[] = Array.from({ length: 39 }, (_, i) => ({
  id: `${i + 1}`,
  name: i % 2 === 0 ? "محمد علي" : "أحمد محمود",
  casesCount: (i % 5) + 1,
  assignedLawyer: "علي العتيبي",
  status: i % 2 === 0 ? "active" : "inactive",
}));

const ReportsClientsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 15;

  const filteredClients = useMemo(() => {
    return MOCK_REPORT_CLIENTS.filter((client) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = client.name.toLowerCase().includes(searchStr);
      const matchesFilter = filter === "all" || client.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(start, start + itemsPerPage);
  }, [filteredClients, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const columns: Column<ReportClient>[] = [
    {
      header: "#",
      accessor: (item) => filteredClients.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "اسم الموكل",
      accessor: "name",
    },
    {
      header: "عدد القضايا",
      accessor: (item) => (
        <span className="bg-[#A6A6A6] text-white px-3 py-1 rounded-[8px] text-xs font-semibold">
          {item.casesCount}
        </span>
      ),
    },
    {
      header: "المحامي المسؤول",
      accessor: "assignedLawyer",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-regular ${item.status === "active"
            ? "bg-success/20 text-success"
            : "bg-error/20 text-error"
            }`}
        >
          {item.status === "active" ? "نشط" : "غير نشط"}
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
          onFilterChange={setFilter}
          filter={filter}
        />

        <DataTable
          columns={columns}
          data={paginatedClients}
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

export default ReportsClientsFeature;
