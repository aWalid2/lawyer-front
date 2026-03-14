import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { NewCaseLink } from "./components/NewCaseLink";
import { CasesFilter } from "./components/CasesFilter";

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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">


      <h1 className="text-xl font-semibold text-secondary whitespace-nowrap ">
        القضايا
      </h1>

      <HeaderSearch value={searchTerm} onChange={onSearch} />


      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <CasesFilter onFilterChange={onFilterChange} />
        <NewCaseLink />
      </div>
    </div>
  );
};
