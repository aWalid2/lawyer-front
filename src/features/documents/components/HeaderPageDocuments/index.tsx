import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { AddDocumentDialog } from "../AddDocumentDialog";

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">
            <h1 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                المستندات
            </h1>

            <HeaderSearch value={searchTerm} onChange={onSearch} className="lg:ms-0" />

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
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
                <AddDocumentDialog
                    filter={filter}
                    onDocumentAdded={onDocumentAdded}
                />
            </div>
        </div>
    );
};