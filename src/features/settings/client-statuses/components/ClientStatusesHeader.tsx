import React from "react";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
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
    <HeaderPageLayout>
      <HeaderTitle title="صفات الموكل/الخصم" />
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
    </HeaderPageLayout>
  );
};
