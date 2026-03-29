import React from "react";
import { Plus } from "lucide-react";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { ProsecutionFormDialog } from "./ProsecutionFormDialog";

interface ProsecutionsHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onProsecutionAdded?: () => void;
}

export const ProsecutionsHeader: React.FC<ProsecutionsHeaderProps> = ({
  onSearch,
  searchTerm,
  onProsecutionAdded,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="النيابات" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <ProsecutionFormDialog
        onSave={(values) => {
          console.log("Saving prosecution:", values);
          onProsecutionAdded && onProsecutionAdded();
        }}
        trigger={
          <HeaderActionButton
            label="نيابة جديدة"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
          />
        }
      />
    </HeaderPageLayout>
  );
};
