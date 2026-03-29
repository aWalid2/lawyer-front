import React from "react";
import { Plus } from "lucide-react";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { PoliceStationFormDialog } from "./PoliceStationFormDialog";

interface PoliceStationsHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onStationAdded?: () => void;
}

export const PoliceStationsHeader: React.FC<PoliceStationsHeaderProps> = ({
  onSearch,
  searchTerm,
  onStationAdded,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="المخافر" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <PoliceStationFormDialog
        onSave={(values) => {
          console.log("Saving station:", values);
          onStationAdded && onStationAdded();
        }}
        trigger={
          <HeaderActionButton
            label="قسم جديد"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
          />
        }
      />
    </HeaderPageLayout>
  );
};
