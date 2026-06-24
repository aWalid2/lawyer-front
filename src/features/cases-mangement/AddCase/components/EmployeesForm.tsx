import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import { SelectForm } from "@/shared/components/SelectForm";
import { useMemo } from "react";

export function EmployeesForm() {
  const { data: users, isPending } = useGetAllUsers();

  const employeeOptions = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.map((user: { id: number; first_name?: string }) => ({
      value: user.id,
      label: user.first_name || `#${user.id}`,
    }));
  }, [users]);

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
