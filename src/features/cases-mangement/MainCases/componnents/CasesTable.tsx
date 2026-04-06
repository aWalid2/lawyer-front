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


  const itemsPerPage = 15;



  const totalPages = Math.ceil(itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(totalPages);
    }
  }, [totalPages, currentPage, onPageChange]);

  const currentCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return cases.slice(startIndex, startIndex + itemsPerPage);
  }, [cases, currentPage, itemsPerPage]);

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
          totalItems={cases.length}
          itemsPerPage={itemsPerPage}
        />

      )}
    </div>
  );
};
