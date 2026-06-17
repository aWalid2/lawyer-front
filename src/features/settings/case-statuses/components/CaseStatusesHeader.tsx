import React from "react";
import { Plus } from "lucide-react";
import { CaseStatusFormDialog } from "./CaseStatusFormDialog";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";

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
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <HeaderTitle title="حالات القضية" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-0"
      />

      <CaseStatusFormDialog
        trigger={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="font-cairo md:rounded-main relative order-3 flex h-9 w-full shrink-0 items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white transition-all sm:h-10 sm:w-auto sm:px-4 sm:py-2.5 md:h-[50px] md:px-6 md:py-3 md:text-base"
            style={{
              background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
            }}
          >
            <Plus className="h-4 w-4" />
            <span>إضافة حالة جديدة</span>
          </button>
        }
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveStatus}
      />
    </div>
  );
};
