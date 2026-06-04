import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { CasesFilter } from "./components/CasesFilter";
import { NewCaseLink } from "./components/NewCaseLink";

interface HeaderPageCaseProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
}

export const HeaderPageCase: React.FC<HeaderPageCaseProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onSearch={onSearch}
        placeholder="ابحث بكود القضية أو اسم الموكل أو نوع القضية"
      />
      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <CasesFilter onFilterChange={onFilterChange} />
        <NewCaseLink />
      </div>
    </HeaderPageLayout>
  );
};
