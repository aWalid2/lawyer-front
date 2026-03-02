import { useState, useMemo } from "react";
import { CasesTable } from "./componnents/CasesTable";
import { HeaderPageCase } from "./componnents/HeaderPageCase";
import type { Case } from "./componnents/casesTypes";

const MOCK_CASES: Case[] = Array.from({ length: 19 }, (_, i) => ({
  id: `${i + 1}`,
  caseNumber: `#634${(i % 5) + 1}`,
  autoNumber: "255",
  clientName: "خالد محمد",
  subject: "سرقة",
  status: i % 2 === 0 ? "متداولة" : "تحت الرفع",
}));

const MainCases = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleEdit = (caseItem: Case) => {
    console.log("Edit case:", caseItem);
  };

  const handleDelete = (caseItem: Case) => {
    console.log("Delete case:", caseItem);
  };

  const handleCaseClick = (caseItem: Case) => {
    console.log("Case clicked:", caseItem);
  };

  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter((caseItem) => {
      const matchesSearch =
        caseItem.clientName.includes(searchTerm) ||
        caseItem.caseNumber.includes(searchTerm) ||
        caseItem.subject.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || caseItem.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="w-full space-y-4">
      <HeaderPageCase
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onFilterChange={setStatusFilter}
      />
      <CasesTable
        cases={filteredCases}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCaseClick={handleCaseClick}
      />
    </div>
  );
};

export default MainCases;
