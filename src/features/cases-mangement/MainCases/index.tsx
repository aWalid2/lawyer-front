import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderPageCase } from "./componnents/HeaderPageCase";
import type { Case } from "./componnents/casesTypes";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { TableCasesActions } from "./componnents/TableCasesActions";
import { Pagination } from "@/components/shared/components/Pagination";

const MOCK_CASES: Case[] = Array.from({ length: 19 }, (_, i) => ({
  id: `${i + 1}`,
  caseNumber: `#634${(i % 5) + 1}`,
  autoNumber: "255",
  clientName: "خالد محمد",
  subject: "سرقة",
  status: i % 2 === 0 ? "متداولة" : "تحت الرفع",
}));

const MainCases = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 15;

  const handleEdit = (caseItem: Case) => {
    console.log("Edit case:", caseItem);
  };

  const handleCaseClick = (caseItem: Case) => {
    navigate(`/dashboard/case-management/${caseItem.id}`);
  };

  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter((caseItem) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        caseItem.clientName.toLowerCase().includes(searchStr) ||
        caseItem.caseNumber.toLowerCase().includes(searchStr) ||
        caseItem.subject.toLowerCase().includes(searchStr);

      const matchesStatus =
        statusFilter === "all" || caseItem.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  const currentCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCases, currentPage]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "متداولة":
        return "bg-[#5570F1]/20 text-[#5570F1]";
      case "تحت الرفع":
        return "bg-[#937F12]/20 text-[#937F12]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const columns: Column<Case>[] = [
    {
      header: "#",
      accessor: (item) => filteredCases.findIndex((c) => c.id === item.id) + 1,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية",
      accessor: "caseNumber",
      className: "font-medium text-black",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: "autoNumber",
    },
    {
      header: "اسم الموكل",
      accessor: "clientName",
      className: "font-medium text-black",
    },
    {
      header: "عنوان القضية",
      accessor: "subject",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-[12px] text-xs font-medium whitespace-nowrap ${getStatusStyles(
            item.status
          )}`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <TableCasesActions
          caseItem={item}
          onEdit={(c) => handleEdit(c)}
        />
      ),
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageCase
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={setStatusFilter}
        />


        <DataTable
          data={currentCases}
          columns={columns}
          rowIdField="id"
          onRowClick={handleCaseClick}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredCases.length}
            itemsPerPage={itemsPerPage}
          />
        )}

      </div>
    </div>
  );
};

export default MainCases;
