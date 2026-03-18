import React from "react";
import { Plus } from "lucide-react";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { CaseStatusFormDialog } from "./CaseStatusFormDialog";

interface CaseStatusesHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onStatusAdded?: () => void;
}

export const CaseStatusesHeader: React.FC<CaseStatusesHeaderProps> = ({
  onSearch,
  searchTerm,
  onStatusAdded,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="حالات القضايا" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <CaseStatusFormDialog
        onSave={(values) => {
          console.log("Saving status:", values);
          onStatusAdded && onStatusAdded();
        }}
        trigger={
          <HeaderActionButton
            label="حالة جديدة"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
          />
        }
      />
    </HeaderPageLayout>
  );
};
