import React from "react";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { Plus } from "lucide-react";
import { CaseTypeFormDialog } from "./CaseTypeFormDialog";

interface CaseTypesHeaderProps {
  searchTerm: string;
  onSearch?: (term: string) => void;
  onTypeAdded?: () => void;
}

export const CaseTypesHeader: React.FC<CaseTypesHeaderProps> = ({
  searchTerm,
  onSearch,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="أنواع القضايا" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />
      <CaseTypeFormDialog
        trigger={
          <HeaderActionButton
            label="نوع جديد"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
          />
        }
      />
    </HeaderPageLayout>
  );
};
