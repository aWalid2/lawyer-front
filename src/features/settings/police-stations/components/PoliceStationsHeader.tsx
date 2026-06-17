import React from "react";
import { Plus } from "lucide-react";
import { PoliceStationFormDialog } from "./PoliceStationFormDialog";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";

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
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <HeaderTitle title="المخافر" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-15"
      />

      <PoliceStationFormDialog
        trigger={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="font-cairo relative order-3 flex h-9 w-full flex-shrink-0 items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white transition-all sm:h-10 sm:w-auto sm:px-4 sm:py-2.5 md:h-[50px] md:rounded-[12px] md:px-6 md:py-3 md:text-base"
            style={{
              background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
            }}
          >
            <Plus className="h-4 w-4" />
            <span>إضافة مخفر</span>
          </button>
        }
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveStation}
      />
    </div>
  );
};
