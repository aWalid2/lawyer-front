import React from "react";
import { DocumentsSearch } from "./components/DocumentsSearch";
import { DocumentsFilter } from "./components/DocumentsFilter";
import { AddDocumentDialog } from "../AddDocumentDialog";

interface HeaderPageDocumentsProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filter: string;
}

export const HeaderPageDocuments: React.FC<HeaderPageDocumentsProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filter,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">
      <h1 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
        المستندات
      </h1>

      <DocumentsSearch value={searchTerm} onChange={onSearch} />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <DocumentsFilter onFilterChange={onFilterChange} />
        <AddDocumentDialog filter={filter} />
      </div>
    </div>
  );
};
