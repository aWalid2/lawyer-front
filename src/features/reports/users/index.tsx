import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsUsers } from "./components/HeaderPageReportsUsers";
import type { ReportUser } from "./types";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";

const MOCK_REPORT_USERS: ReportUser[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  name: "محمد علي",
  role: i % 3 === 0 ? "محامي" : i % 3 === 1 ? "مدير" : "موظف",
  email: "example@gmail.com",
  status: i % 3 === 2 ? "inactive" : "active",
}));

const ReportsUsersFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ role: "all", status: "all" });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredUsers = useMemo(() => {
    return MOCK_REPORT_USERS.filter((u) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        u.name.toLowerCase().includes(searchStr) || 
        u.email.toLowerCase().includes(searchStr);
      
      const roleMap: Record<string, string> = {
        lawyer: "محامي",
        manager: "مدير",
        employee: "موظف"
      };
      const matchesRole = filters.role === "all" || u.role === roleMap[filters.role];
      const matchesStatus = filters.status === "all" || u.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const columns: Column<ReportUser>[] = [
    {
      header: "#",
      accessor: (item) => filteredUsers.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "اسم المستخدم",
      accessor: "name",
    },
    {
      header: "الدور",
      accessor: "role",
    },
    {
      header: "البريد الإلكتروني",
      accessor: "email",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-regular ${
            item.status === "active"
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
        <HeaderPageReportsUsers
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <DataTable
          columns={columns}
          data={paginatedUsers}
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

export default ReportsUsersFeature;
