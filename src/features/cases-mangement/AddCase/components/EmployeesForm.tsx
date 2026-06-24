import { SelectForm } from "@/shared/components/SelectForm";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import { useGetAllRoles } from "@/features/settings/permissions/api";
import { useMemo } from "react";

export function EmployeesForm() {
  const { data: users, isPending } = useGetAllUsers();
  const { data: roles, isLoading: isRolesLoading } = useGetAllRoles();

  const employeeOptions = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.map((user: { id: number; first_name?: string }) => ({
      value: user.id,
      label: user.first_name || `#${user.id}`,
    }));
  }, [users]);

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
        إضافة موظف للقضية
      </div>

      <SelectForm
        name="Employee_id"
        label="اسم الموظف"
        options={employeeOptions}
        placeholder={isPending ? "جارٍ التحميل..." : "اختر الموظف"}
        showSearch
      />
    </div>
  );
}
