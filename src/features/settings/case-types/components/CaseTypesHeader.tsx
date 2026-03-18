import React from "react";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { Plus } from "lucide-react";
import { CaseTypeFormDialog } from "./CaseTypeFormDialog";

interface CaseTypesHeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onTypeAdded: () => void;
}

export const CaseTypesHeader: React.FC<CaseTypesHeaderProps> = ({
  searchTerm,
  onSearch,
  onTypeAdded,
}) => {
  return (


    <div className="flex flex-1 items-center gap-4 mb-6">
      <HeaderTitle title="أنواع القضايا" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />
      <CaseTypeFormDialog
        onSave={(values) => {
          console.log("Adding case type:", values);
          onTypeAdded();
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

    </div>
  );
};
