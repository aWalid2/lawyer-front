import React from "react";
import { Plus } from "lucide-react";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { LitigationDegreeFormDialog } from "./LitigationDegreeFormDialog";

interface LitigationDegreesHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onTypeAdded?: () => void;
}

export const LitigationDegreesHeader: React.FC<
  LitigationDegreesHeaderProps
> = ({ onSearch, searchTerm, onTypeAdded }) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="أنواع درجات التقاضي" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <LitigationDegreeFormDialog
        onSave={() => {
          onTypeAdded && onTypeAdded();
        }}
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
