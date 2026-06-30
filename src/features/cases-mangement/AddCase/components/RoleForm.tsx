import { SelectForm } from "@/shared/components/SelectForm";
import { useGetAllRoles } from "@/features/settings/permissions/api";
import { FieldArray, useFormikContext } from "formik";
import { useMemo } from "react";
import type { FormValues } from "../utils/mapToApiPayload";

const emptyRole = { role_id: "" };

export function RoleForm() {
  const { values } = useFormikContext<FormValues>();
  const { data: roles, isLoading: isRolesLoading } = useGetAllRoles();

  const roleOptions = useMemo(() => {
    if (!Array.isArray(roles)) return [];
    return roles.map((role: { id: number; role_name: string }) => ({
      value: role.id,
      label: role.role_name,
    }));
  }, [roles]);

  return (
    <FieldArray name="roles">
      {({ push, remove }) => (
        <div className="mt-4 space-y-4">
          {values.roles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-[#CBA462]">الأدوار</h4>
                <button
                  type="button"
                  onClick={() => push({ ...emptyRole })}
                  className="rounded-md border border-[#CBA462]/30 bg-[#CBA462]/10 px-3 py-1 text-sm text-[#CBA462]"
                >
                  إضافة
                </button>
              </div>
            </div>
          ) : (
            values.roles.map((_, index) => {
              const isLast = index === values.roles.length - 1;

              return (
                <div
                  key={index}
                  className="space-y-4 rounded-xl border border-dashed border-gray-200 bg-[#FBFBFB] p-6"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-[#CBA462]">
                      الدور {index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      {isLast && (
                        <button
                          type="button"
                          onClick={() => push({ ...emptyRole })}
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
                    name={`roles.${index}.role_id`}
                    label="اسم الدور"
                    options={roleOptions}
                    placeholder={
                      isRolesLoading ? "جارٍ التحميل..." : "اختر الدور"
                    }
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
