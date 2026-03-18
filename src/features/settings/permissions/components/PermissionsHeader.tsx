import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RoleFormDialog } from "./RoleFormDialog";

interface PermissionsHeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onRoleAdded: () => void;
}

export const PermissionsHeader: React.FC<PermissionsHeaderProps> = ({
  searchTerm,
  onSearch,
  onRoleAdded,
}) => {


  return (
    <div className="space-y-6">


      <HeaderTitle title="إدارة الصلاحيات" />




      <div className="flex flex-1 items-center gap-4 mb-6">
        <HeaderTitle innerPage title="الأدوار" />
        <HeaderSearch
          value={searchTerm}
          onChange={onSearch}
          placeholder="بحث ..."
        />
        <RoleFormDialog
          onSave={(values) => {
            console.log("Adding role:", values);
            onRoleAdded();
          }}
          trigger={
            <HeaderActionButton
              label="دور جديد"
              icon={<Plus size={18} />}
              variant="gradient"
              className="rounded-main h-12.5 px-8"
            />
          }
        />

      </div>
    </div>
  );
};
