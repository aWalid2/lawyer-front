import React from "react";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { UserFormDialog } from "./UserFormDialog";
import { Plus } from "lucide-react";
import { useGetAllRoles } from "../../permissions/api";

interface UserManagementHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onUserUpdated?: () => void;
  selectedRole: string | undefined;
  setSelectedRole: (role: string) => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  onSearch,
  searchTerm,
  onUserUpdated,
  selectedRole = "all",
  setSelectedRole = () => {},
}) => {
  const { data: roles } = useGetAllRoles();

  const roleOptions =
    roles?.map((role) => ({
      value: String(role.id),
      label: role.role_name,
    })) || [];

  return (
    <HeaderPageLayout>
      <HeaderTitle title="إدارة المستخدمين" />

      <HeaderSearch value={searchTerm} onChange={onSearch} className="ms-2!" />

      <HeaderFilter
        defaultValue="all"
        value={selectedRole}
        options={[{ value: "all", label: "جميع المستخدمين" }, ...roleOptions]}
        onFilterChange={(val) => {
          if (setSelectedRole) setSelectedRole(val);
        }}
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
