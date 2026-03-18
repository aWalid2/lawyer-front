import React from "react";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { UserFormDialog } from "./UserFormDialog";
import { Plus } from "lucide-react";

interface UserManagementHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onUserUpdated?: () => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  onSearch,
  searchTerm,
  onUserUpdated,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle title="إدارة المستخدمين" />

      <HeaderSearch value={searchTerm} onChange={onSearch} className="ms-2!" />


      <HeaderFilter
        defaultValue="all"
        options={[
          { value: "all", label: "جميع المستخدمين" },
          { value: "محامي", label: "محامين" },
          { value: "موظف", label: "موظفين" },
          { value: "موكل", label: "موكلين" },
        ]}
        onFilterChange={(val) => console.log("Filter:", val)}
      />

      <UserFormDialog
        onUserUpdated={onUserUpdated}
        trigger={
          <HeaderActionButton
            label="مستخدم جديد"
            icon={<Plus size={18} />}
          />
        }
      />

    </HeaderPageLayout>
  );
};
