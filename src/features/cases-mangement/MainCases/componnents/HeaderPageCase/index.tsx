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
      <HeaderSearch
        value={searchTerm}
        onSearch={onSearch}
        placeholder="ابحث بكود القضية أو اسم الموكل أو نوع القضية"
        className="lg:ms-0"
      />
      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <CasesFilter onFilterChange={onFilterChange} />
        <NewCaseLink />
      </div>
    </HeaderPageLayout>
  );
};
