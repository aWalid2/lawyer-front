import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { InputForm } from "@/shared/components/InputForm";
import PageLayout from "@/shared/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Form, Formik } from "formik";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormSection } from "./FormSection";
import { useRoleModulesData } from "../hooks/useRoleModulesData";
import { useCreateRole } from "../api/hooks/useCreateRole";
import { useAddPermissions } from "../api/hooks/useAddPermissions";
import { toast } from "sonner";

interface RoleFormProps {
  initialData?: {
    name?: string;
    description?: string;
    permissions?: Record<string, string[]>;
  };
  isEdit?: boolean;
}

export const AddRoleFeature = ({ initialData, isEdit }: RoleFormProps) => {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, string[]>
  >(initialData?.permissions || {});
  const { ruleModulesData } = useRoleModulesData();

  const createRoleMutation = useCreateRole();
  const addPermissionsMutation = useAddPermissions();

  const toggleModule = (module: string) => {
    setExpandedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module],
    );
  };

  const handleSelectAll = () => {
    const allSelected: Record<string, string[]> = {};
    ruleModulesData.forEach(({ module, permissions }) => {
      allSelected[module] = permissions;
    });
    setSelectedPermissions(allSelected);
  };

  const handleDeselectAll = () => {
    setSelectedPermissions({});
  };

  const togglePermission = (module: string, perm: string) => {
    setSelectedPermissions((prev) => {
      const currentModulePerms = prev[module] || [];
      const updatedPerms = currentModulePerms.includes(perm)
        ? currentModulePerms.filter((p) => p !== perm)
        : [...currentModulePerms, perm];

      return {
        ...prev,
        [module]: updatedPerms,
      };
    });
  };

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      // Step 1: Create the role
      const roleResponse = await createRoleMutation.mutateAsync({
        role_name: values.name,
      });

      // Step 2: Convert selected permissions to permission IDs
      // Flatten the selected permissions array and map to IDs (1-indexed)
      const permissionIds: number[] = [];
      let permIndex = 1;
      ruleModulesData.forEach(({ module, permissions }) => {
        permissions.forEach((permission) => {
          if (selectedPermissions[module]?.includes(permission)) {
            permissionIds.push(permIndex);
          }
          permIndex++;
        });
      });

      // Step 3: Add permissions to the role
      if (permissionIds.length > 0) {
        await addPermissionsMutation.mutateAsync({
          roleId: roleResponse.id,
          permissionIds,
        });
      }

      toast.success(isEdit ? "تم تحديث الدور بنجاح" : "تم إنشاء الدور بنجاح");

      navigate("/dashboard/settings/permissions");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "فشل حفظ الدور";
      toast.error(errorMessage);
    }
  };

  return (
    <PageLayout>
      <HeaderTitle title={isEdit ? "تعديل دور" : "إضافة دور جديد"} />

      <div className="mt-6 rounded-[18px] border border-[#E8E8E8] bg-white p-6">
        <Formik
          initialValues={{
            name: initialData?.name || "",
            description: initialData?.description || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("مطلوب"),
            description: Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <FormSection
                number={1}
                title="معلومات الدور"
                contentClassName="space-y-4"
              >
                <InputForm
                  name="name"
                  label="اسم الدور"
                  type="text"
                  placeholder="اسم الدور"
                />
                <InputForm
                  name="description"
                  label="الوصف"
                  type="text"
                  placeholder="هنا يتم عرض تفاصيل الدور"
                />
              </FormSection>

              <div className="pt-6">
                <FormSection
                  number={2}
                  title="الصلاحيات"
                  contentClassName="space-y-3"
                  headerAction={
                    <>
                      <Button
                        type="button"
                        onClick={handleSelectAll}
                        className="rounded-md bg-[#C1A063] px-4 py-2 font-medium text-white hover:bg-[#a88a53]"
                      >
                        تحديد الكل
                      </Button>
                      <Button
                        type="button"
                        onClick={handleDeselectAll}
                        variant="outline"
                        className="rounded-md border-[#E8E8E8] px-4 py-2 font-medium text-[#476274] hover:bg-gray-50"
                      >
                        إلغاء الكل
                      </Button>
                    </>
                  }
                >
                  {ruleModulesData.map(({ module, permissions }) => {
                    const isExpanded = expandedModules.includes(module);

                    return (
                      <Collapsible
                        key={module}
                        open={isExpanded}
                        onOpenChange={() => toggleModule(module)}
                        className="bg-primary/3 overflow-hidden rounded-[10px] border border-[#E8E8E8] transition-all duration-200"
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50"
                          >
                            <span className="font-bold text-[#476274]">
                              {module}
                            </span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f4] text-[#476274]">
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </div>
                          </button>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="bg-primary/3 border-t border-[#E8E8E8] p-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                              {permissions.map((perm) => (
                                <div
                                  key={perm}
                                  className="flex items-center gap-3"
                                >
                                  <Checkbox
                                    id={`${module}-${perm}`}
                                    checked={selectedPermissions[
                                      module
                                    ]?.includes(perm)}
                                    onCheckedChange={() =>
                                      togglePermission(module, perm)
                                    }
                                    className="h-5 w-5 rounded-[4px] border-[#D4D4D4] data-[state=checked]:border-[#C1A063] data-[state=checked]:bg-[#C1A063] data-[state=checked]:text-white"
                                  />
                                  <label
                                    htmlFor={`${module}-${perm}`}
                                    className="cursor-pointer text-[14px] font-medium text-[#7A7A7A]"
                                  >
                                    {perm}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </FormSection>
              </div>
              <div className="w-full pt-4">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    createRoleMutation.isPending ||
                    addPermissionsMutation.isPending
                  }
                  className="h-[50px] w-full rounded-[10px] bg-[#C1A063] text-base font-medium text-white transition-colors hover:bg-[#a88a53] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {createRoleMutation.isPending ||
                  addPermissionsMutation.isPending
                    ? "جاري الحفظ..."
                    : "حفظ التغيرات"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </PageLayout>
  );
};
