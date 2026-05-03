import React from "react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { Plus } from "lucide-react";
import { ClientStatusFormDialog } from "./ClientStatusFormDialog";

interface ClientStatusesHeaderProps {
  searchTerm: string;
  onSearch?: (term: string) => void;
}

export const ClientStatusesHeader: React.FC<ClientStatusesHeaderProps> = ({
  searchTerm,
  onSearch,
}) => {
  return (
    <div className="flex flex-1 items-center gap-4 mb-6">
      <HeaderTitle title="صفات الموكل" />
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />
      <ClientStatusFormDialog
        trigger={
          <HeaderActionButton
            label="صفة جديدة"
            icon={<Plus size={18} />}
            variant="gradient"
            className="rounded-main h-12.5 px-8"
          />
        }
      />
    </div>
  );
};
