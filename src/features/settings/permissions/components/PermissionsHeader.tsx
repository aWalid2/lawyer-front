import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface PermissionsHeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const PermissionsHeader: React.FC<PermissionsHeaderProps> = ({
  searchTerm,
  onSearch,
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <HeaderTitle title="إدارة الصلاحيات" />

      <div className="mb-6 flex flex-1 items-center gap-4">
        <HeaderTitle innerPage title="الأدوار" />
        <HeaderSearch
          value={searchTerm}
          onChange={onSearch}
          placeholder="بحث ..."
        />
        <HeaderActionButton
          label="دور جديد"
          icon={<Plus size={18} />}
          variant="gradient"
          className="rounded-main h-12.5 px-8"
          onClick={() => navigate("/dashboard/settings/permissions/add")}
        />
      </div>
    </div>
  );
};
