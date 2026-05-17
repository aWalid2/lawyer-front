import React from "react";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
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
          { value: "مدير", label: "مدراء" },
          { value: "مدير مالي", label: "مدراء ماليين" },
        ]}
        onFilterChange={() => { }}
      />

      <UserFormDialog
        onUserUpdated={onUserUpdated}
        trigger={
          <HeaderActionButton label="مستخدم جديد" icon={<Plus size={18} />} />
        }
      />
    </HeaderPageLayout>
  );
};
