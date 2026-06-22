import React from "react";
import { Plus } from "lucide-react";
import { CaseStatusFormDialog } from "./CaseStatusFormDialog";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";

interface CaseStatusesHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export const CaseStatusesHeader: React.FC<CaseStatusesHeaderProps> = ({
  searchTerm,
  onSearch,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const handleSaveStatus = () => {
    setIsAddModalOpen(false);
  };

  return (
    <HeaderPageLayout>
      <HeaderTitle title="حالات القضية" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-0"
      />

      <CaseStatusFormDialog
        trigger={
          <HeaderActionButton
            label="إضافة حالة جديدة"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
            onClick={() => setIsAddModalOpen(true)}
          />
        }
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveStatus}
      />
    </HeaderPageLayout>
  );
};
