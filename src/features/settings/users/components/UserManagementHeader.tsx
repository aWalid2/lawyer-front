import React from "react";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { UserFormDialog } from "./UserFormDialog";
import { Plus } from "lucide-react";
import { useGetAllRoles } from "../../permissions/api";


interface UserManagementHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onUserUpdated?: () => void;
  /** currently selected role */
  selectedRole: string;
  /** update selected role */
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
  console.log(roles)

  const roleOptions = roles?.map((role) => ({
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
        options={[
          { value: "all", label: "جميع المستخدمين" },
          ...roleOptions,
        ]}
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
