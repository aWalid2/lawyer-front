import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { FormSection } from "./FormSection";
import { InputForm } from "@/components/shared/components/InputForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";


const roleModules = [
  "الصفحة الرئيسية",
  "الملف الشخصي",
  "إدارة القضايا",
  "إدارة الموكلين",
  "الإعدادات",
  "إدارة المستخدمين",
  "إدارة المحاكم",
  "إدارة الحالات",
  "أنواع القضايا",
  "إدارة الجلسات",
  "ديون موكلك",
  "إدارة المدفوعات",
  "إدارة المصروفات",
  "إدارة الوثائق",
  "التقارير",
  "حلول قضية",
  "رؤية الدول",
  "التقويم",
];

const mockPermissions = ["عرض القضايا", "إضافة قضية", "تعديل قضية", "حذف قضية", "عرض تفاصيل القضية", "تحليل القضية", "المرافعة"];

// Using a basic state for expanded modules since we don't have standard accordion
export const AddRoleFeature = () => {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});

  const toggleModule = (module: string) => {
    setExpandedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
    );
  };

  const handleSelectAll = () => {
    const allSelected: Record<string, string[]> = {};
    roleModules.forEach(module => {
      allSelected[module] = mockPermissions;
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
      <HeaderTitle title="إضافة دور جديد" />

      <div className="bg-white rounded-[18px] border border-[#E8E8E8] p-6 mt-6">
        <Formik
          initialValues={{ name: "", description: "" }}
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

              <div className="pt-6 ]">
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
                  {roleModules.map((module) => {
                    const isExpanded = expandedModules.includes(module);

                    return (
                      <Collapsible
                        key={module}
                        open={isExpanded}
                        onOpenChange={() => toggleModule(module)}
                        className="border border-[#E8E8E8] rounded-md overflow-hidden transition-all duration-200 shadow-sm bg-white"
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            type="button"
                            className="w-full flex items-center justify-between p-4 hover:bg-[#FBFBFB] transition-colors"
                          >
                            <span className="font-bold text-[#476274]">{module}</span>
                            <div className="w-8 h-8 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[#476274]">
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="p-4 bg-[#FBFBFB] border-t border-[#E8E8E8]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {mockPermissions.map((perm) => (
                                <div key={perm} className="flex items-center space-x-2 space-x-reverse justify-end flex-row-reverse w-full">
                                  <label
                                    htmlFor={`${module}-${perm}`}
                                    className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#476274] flex-1 text-right ml-2 cursor-pointer"
                                  >
                                    {perm}
                                  </label>
                                  <Checkbox
                                    id={`${module}-${perm}`}
                                    checked={selectedPermissions[module]?.includes(perm)}
                                    onCheckedChange={() => togglePermission(module, perm)}
                                    className="w-8 h-8"
                                  />
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
                  حفظ
                </Button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </PageLayout>
  );
};
