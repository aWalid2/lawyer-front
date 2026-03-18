import React from "react";
import { Plus } from "lucide-react";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { LitigationDegreeFormDialog } from "./LitigationDegreeFormDialog";

interface LitigationDegreesHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onTypeAdded?: () => void;
}

export const LitigationDegreesHeader: React.FC<LitigationDegreesHeaderProps> = ({
  onSearch,
  searchTerm,
  onTypeAdded,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="أنواع درجات التقاضي" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <LitigationDegreeFormDialog
        onSave={(values) => {
          console.log("Saving degree type:", values);
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
