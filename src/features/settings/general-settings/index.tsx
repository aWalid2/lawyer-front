import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ArrowRight } from "lucide-react";
import { SelectForm } from "@/components/shared/components/SelectForm";
import { FileUpload } from "@/components/shared/components/FileUpload";
import { SwitchForm } from "@/components/shared/components/SwitchForm";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

const GeneralSettingsSchema = Yup.object().shape({
  systemName: Yup.string().required("مطلوب"),
  currency: Yup.string().required("مطلوب"),
  alertDays: Yup.string().required("مطلوب"),
  language: Yup.string().required("مطلوب"),
  timezone: Yup.string().required("مطلوب"),
  notifications: Yup.boolean(),
  darkMode: Yup.boolean(),
});

export const GeneralSettingsFeature = () => {
  const initialValues = {
    systemName: "1",
    systemLogo: null,
    currency: "kwd",
    alertDays: "3",
    language: "ar",
    timezone: "gmt3",
    notifications: true,
    darkMode: false,
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <PageLayout>
      <HeaderTitle title="الإعدادات العامة للنظام" />

      <div className="bg-white rounded-[18px] border border-[#E8E8E8] p-6 mt-6">
        <Formik
          initialValues={initialValues}
          validationSchema={GeneralSettingsSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6 ">
              <div className="w-full">
                <SelectForm
                  name="systemName"
                  label="اسم النظام"
                  options={[
                    {
                      label: "نظام متكامل لإدارة مكاتب المحاماة",
                      value: "1",
                    },
                  ]}
                />
              </div>

              <div className="max-w-30 " >
                <FileUpload
                  name="systemLogo"
                  label="شعار النظام"
                  placeholder="انقر هنا لتحميل الصورة أو سحبها وإفلاتها"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <SelectForm
                  name="currency"
                  label="العملة"
                  options={[
                    { label: "دينار كويتي", value: "kwd" },
                  ]}
                />
                <SelectForm
                  name="alertDays"
                  label="أيام التنبيه"
                  options={[
                    { label: "ثلاثة أيام", value: "3" },
                  ]}
                />

                <SelectForm
                  name="language"
                  label="اللغة"
                  options={[
                    { label: "العربية", value: "ar" },
                  ]}
                />
                <SelectForm
                  name="timezone"
                  label="المنطقة الزمنية"
                  options={[
                    { label: "GMT +3", value: "gmt3" },
                  ]}
                />
              </div>

              <div className="w-full pt-4 space-y-2">
                <div className="p-4 rounded-[10px] border border-[#E8E8E8]">
                  <SwitchForm name="notifications" label="الإشعارات" />
                  {values.notifications && (
                    <div className="mt-4 p-4 bg-[#F9F9F9] rounded-md text-sm text-[#476274]">
                      محتوى إعدادات الإشعارات (يظهر فقط عند تفعيل الإشعارات)
                    </div>
                  )}
                </div>
                <div className="p-4 rounded-[10px] border border-[#E8E8E8]">
                  <SwitchForm name="darkMode" label="الوضع المظلم" />
                </div>
              </div>


              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[50px] bg-[#C1A063] hover:bg-[#a88a53] text-white font-medium text-base rounded-[10px] transition-colors"
              >
                حفظ التغييرات
              </Button>

            </Form>
          )}
        </Formik>
      </div>
    </PageLayout>
  );
};
