import { useEffect, useMemo, useState } from "react";
import type { Case, CasesTableProps } from "../types/casesTypes";
import { EmptyState } from "./EmptyState";
import { Pagination } from "@/shared/components/Pagination";
import { TableCasesHeader } from "./TableCasesHeader";
import { TableCasesRow } from "./TableCasesRow";

export const CasesTable: React.FC<CasesTableProps> = ({
  cases,
  currentPage,
  onPageChange,
  onCaseClick,
  onEdit,
  onDelete,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchTerm = "";

  const itemsPerPage = 15;

  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        caseItem.case_number?.toLowerCase().includes(searchStr) ||
        caseItem.case_type?.toLowerCase().includes(searchStr) ||
        caseItem.detective_name?.toLowerCase().includes(searchStr)
      );
    });
  }, [cases, searchTerm]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(totalPages);
    }
  }, [totalPages, currentPage, onPageChange]);

  const currentCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCases, currentPage, itemsPerPage]);

  const handleRowClick = (caseItem: Case) => {
    setSelectedId(caseItem.id);
    onCaseClick?.(caseItem);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (cases.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <table className="w-full border-collapse">
        <TableCasesHeader />
        <tbody>
          {currentCases.map((caseItem, index) => (
            <TableCasesRow
              key={caseItem.id}
              caseItem={caseItem}
              index={(currentPage - 1) * itemsPerPage + index + 1}
              isSelected={selectedId === caseItem.id}
              onRowClick={handleRowClick}
              onEdit={(item) => onEdit?.(item)}
              onDelete={(item) => onDelete?.(item)}
            />
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={filteredCases.length}
          itemsPerPage={itemsPerPage}
        />

      )}
    </div>
  );
};
