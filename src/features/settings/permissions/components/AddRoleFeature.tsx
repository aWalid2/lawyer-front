import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { InputForm } from "@/components/shared/components/InputForm";
import PageLayout from "@/components/shared/components/PageLayout";
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
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>(initialData?.permissions || {});
  const { ruleModulesData } = useRoleModulesData();

  const toggleModule = (module: string) => {
    setExpandedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
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

  const handleSubmit = (values: any) => {
    console.log("Saving role:", values, selectedPermissions);
    navigate("/dashboard/settings/permissions");
  };

  return (
    <PageLayout>
      <HeaderTitle title={isEdit ? "تعديل دور" : "إضافة دور جديد"} />

      <div className="bg-white rounded-[18px] border border-[#E8E8E8] p-6 mt-6">
        <Formik
          initialValues={{ name: initialData?.name || "", description: initialData?.description || "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("مطلوب"),
            description: Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">

              <FormSection number={1} title="معلومات الدور" contentClassName="space-y-4">
                <InputForm name="name" label="اسم الدور" type="text" placeholder="اسم الدور" />
                <InputForm name="description" label="الوصف" type="text" placeholder="هنا يتم عرض تفاصيل الدور" />
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
                        className="bg-[#C1A063] hover:bg-[#a88a53] text-white rounded-md px-4 py-2 font-medium"
                      >
                        تحديد الكل
                      </Button>
                      <Button
                        type="button"
                        onClick={handleDeselectAll}
                        variant="outline"
                        className="border-[#E8E8E8] text-[#476274] rounded-md px-4 py-2 font-medium hover:bg-gray-50"
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
                        className="border border-[#E8E8E8] rounded-[10px] overflow-hidden transition-all duration-200 bg-primary/3"
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            type="button"
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-bold text-[#476274]">{module}</span>
                            <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[#476274]">
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="p-6 bg-primary/3 border-t border-[#E8E8E8]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                              {permissions.map((perm) => (
                                <div key={perm} className="flex items-center gap-3">
                                  <Checkbox
                                    id={`${module}-${perm}`}
                                    checked={selectedPermissions[module]?.includes(perm)}
                                    onCheckedChange={() => togglePermission(module, perm)}
                                    className="w-5 h-5 rounded-[4px] border-[#D4D4D4] data-[state=checked]:bg-[#C1A063] data-[state=checked]:border-[#C1A063] data-[state=checked]:text-white"
                                  />
                                  <label
                                    htmlFor={`${module}-${perm}`}
                                    className="text-[14px] font-medium text-[#7A7A7A] cursor-pointer"
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
                  disabled={isSubmitting}
                  className="w-full h-[50px] bg-[#C1A063] hover:bg-[#a88a53] text-white font-medium text-base rounded-[10px] transition-colors"
                >
                  حفظ التغيرات
                </Button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </PageLayout>
  );
};
