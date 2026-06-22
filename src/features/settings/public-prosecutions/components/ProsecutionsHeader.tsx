import React from "react";
import { Plus } from "lucide-react";
import { ProsecutionFormDialog } from "./ProsecutionFormDialog";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";

interface ProsecutionsHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onProsecutionAdded: () => void;
}

export const ProsecutionsHeader: React.FC<ProsecutionsHeaderProps> = ({
  searchTerm,
  onSearch,
  onProsecutionAdded,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const handleSaveProsecution = () => {
    onProsecutionAdded();
    setIsAddModalOpen(false);
  };

  return (
    <HeaderPageLayout>
      <HeaderTitle title="النيابات العامه" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-0"
      />

      <ProsecutionFormDialog
        trigger={
          <HeaderActionButton
            label="إضافة نيابة جديدة"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
            onClick={() => setIsAddModalOpen(true)}
          />
        }
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveProsecution}
      />
    </HeaderPageLayout>
  );
};
