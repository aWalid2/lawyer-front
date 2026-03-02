import React, { useState, useMemo, useEffect, useCallback } from "react";
import type { Case, CasesTableProps } from "./casesTypes";
import { TableCasesHeader } from "./TableCasesHeader";
import { TableCasesRow } from "./TableCasesRow";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";

export const CasesTable: React.FC<CasesTableProps> = ({
  cases,
  currentPage,
  onPageChange,
  onCaseClick,
  onEdit,
  onDelete,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 15;

  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        caseItem.caseNumber?.toLowerCase().includes(searchStr) ||
        caseItem.subject?.toLowerCase().includes(searchStr) ||
        caseItem.clientName?.toLowerCase().includes(searchStr)
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
    <div className="space-y-6 ">
      <div className="overflow-x-auto bg-white  ">
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
      </div>

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
