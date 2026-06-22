import React from "react";
import { Plus } from "lucide-react";
import { PoliceStationFormDialog } from "./PoliceStationFormDialog";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";

interface PoliceStationsHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export const PoliceStationsHeader: React.FC<PoliceStationsHeaderProps> = ({
  searchTerm,
  onSearch,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const handleSaveStation = () => {
    setIsAddModalOpen(false);
  };

  return (
    <HeaderPageLayout>
      <HeaderTitle title="المخافر" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-15"
      />

      <PoliceStationFormDialog
        trigger={
          <HeaderActionButton
            label="إضافة مخفر"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
            onClick={() => setIsAddModalOpen(true)}
          />
        }
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveStation}
      />
    </HeaderPageLayout>
  );
};
