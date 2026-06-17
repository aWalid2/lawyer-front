import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { AddDocumentDialog } from "../AddDocumentDialog";
import { ButtonShowAll } from "@/shared/components/buttons/ButtonShowAll";

interface HeaderPageDocumentsProps {
  onSearch?: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm?: string;
  filter: string;
  onDocumentAdded?: () => void;
}

export const HeaderPageDocuments: React.FC<HeaderPageDocumentsProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filter,
  onDocumentAdded,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 pb-6 md:flex-row md:gap-6">
      <HeaderSearch value={searchTerm} onChange={onSearch} />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <HeaderFilter
          placeholder="نوع المستند"
          defaultValue="all"
          onFilterChange={onFilterChange}
          options={[
            { value: "all", label: "الكل" },
            { value: "CASE_RELATED", label: "تابع للقضايا" },
            { value: "NOT_CASE_RELATED", label: "غير تابع للقضايا" },
          ]}
        />
        <AddDocumentDialog filter={filter} onDocumentAdded={onDocumentAdded} />
        <ButtonShowAll text={"عرض جميع المستندات"} />
      </div>
    </div>
  );
};
