import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { NewCaseLink } from "./components/NewCaseLink";
import { CasesFilter } from "./components/CasesFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";

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
      <HeaderTitle innerPage title="القضايا" />
      <HeaderSearch value={searchTerm} onChange={onSearch} className="lg:ms-0" />
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <CasesFilter onFilterChange={onFilterChange} />
        <NewCaseLink />
      </div>
    </HeaderPageLayout  >

  );
};
