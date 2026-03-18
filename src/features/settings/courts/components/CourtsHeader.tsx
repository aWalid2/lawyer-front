import React from "react";
import { Plus } from "lucide-react";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { CourtFormDialog } from "./CourtFormDialog";

interface CourtsHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onCourtAdded?: () => void;
}

export const CourtsHeader: React.FC<CourtsHeaderProps> = ({
  onSearch,
  searchTerm,
  onCourtAdded,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="إدارة المحاكم" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."

      />

      <CourtFormDialog
        onSave={(values) => {
          console.log("Saving court:", values);
          onCourtAdded && onCourtAdded();
        }}
        trigger={
          <HeaderActionButton
            label="محكمة جديدة"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
          />
        }
      />

    </HeaderPageLayout>
  );
};
