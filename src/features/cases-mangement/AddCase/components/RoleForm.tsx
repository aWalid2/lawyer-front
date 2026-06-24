import { SelectForm } from "@/shared/components/SelectForm";
import { useGetAllRoles } from "@/features/settings/permissions/api";
import { useMemo } from "react";

export function RoleForm() {
  const { data: roles, isLoading: isRolesLoading } = useGetAllRoles();

  const roleOptions = useMemo(() => {
    if (!Array.isArray(roles)) return [];
    return roles.map((role: { id: number; role_name: string }) => ({
      value: role.id,
      label: role.role_name,
    }));
  }, [roles]);

  return (
    <div className="mt-10 space-y-6">
      <div className="mb-5 text-sm font-medium text-gray-700">
        إضافة دور للقضية
      </div>

      <SelectForm
        name="role_id"
        label="اسم الدور"
        options={roleOptions}
        placeholder={isRolesLoading ? "جارٍ التحميل..." : "اختر الدور"}
        showSearch
      />
    </div>
  );
}
