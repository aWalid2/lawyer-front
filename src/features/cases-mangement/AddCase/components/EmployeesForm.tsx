import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import { SelectForm } from "@/shared/components/SelectForm";
import { FieldArray, useFormikContext } from "formik";
import { useMemo } from "react";
import type { FormValues } from "../utils/mapToApiPayload";

const emptyEmployee = { employee_id: "" };

export function EmployeesForm() {
  const { values } = useFormikContext<FormValues>();
  const { data: users, isPending } = useGetAllUsers();

  const employeeOptions = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.map((user: { id: number; first_name?: string }) => ({
      value: user.id,
      label: user.first_name || `#${user.id}`,
    }));
  }, [users]);

  return (
    <FieldArray name="employees">
      {({ push, remove }) => (
        <div className="mt-4 space-y-4">
          {values.employees.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-[#CBA462]">الموظفين</h4>
                <button
                  type="button"
                  onClick={() => push({ ...emptyEmployee })}
                  className="rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 py-1 text-sm text-[#CBA462]"
                >
                  إضافة
                </button>
              </div>
            </div>
          ) : (
            values.employees.map((_, index) => {
              const isLast = index === values.employees.length - 1;

              return (
                <div
                  key={index}
                  className="space-y-4 rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-[#CBA462]">
                      الموظف {index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      {isLast && (
                        <button
                          type="button"
                          onClick={() => push({ ...emptyEmployee })}
                          className="flex h-9 items-center rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 text-sm text-[#CBA462]"
                        >
                          إضافة
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="flex h-9 items-center gap-1 rounded-md border border-red-500/20 bg-red-500/10 px-3 text-sm text-red-500 hover:underline"
                      >
                        <span className="text-base leading-none text-red-500">
                          x
                        </span>
                        إزالة
                      </button>
                    </div>
                  </div>

                  <SelectForm
                    name={`employees.${index}.employee_id`}
                    label="اسم الموظف"
                    options={employeeOptions}
                    placeholder={isPending ? "جارٍ التحميل..." : "اختر الموظف"}
                    showSearch
                  />
                </div>
              );
            })
          )}
        </div>
      )}
    </FieldArray>
  );
}
