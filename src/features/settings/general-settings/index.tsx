import { FileUpload } from "@/shared/components/FileUpload";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import PageLayout from "@/shared/components/PageLayout";
import { SelectForm } from "@/shared/components/SelectForm";
import { SwitchForm } from "@/shared/components/SwitchForm";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";

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

  const handleSubmit = () => {};

  return (
    <PageLayout>
      <HeaderTitle title="الإعدادات العامة للنظام" />

      <div className="mt-6 rounded-[18px] border border-[#E8E8E8] bg-white p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={GeneralSettingsSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6">
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

              <div className="max-w-30">
                <FileUpload
                  name="systemLogo"
                  label="شعار النظام"
                  placeholder="انقر هنا لتحميل الصورة أو سحبها وإفلاتها"
                />
              </div>

              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                <SelectForm
                  name="currency"
                  label="العملة"
                  options={[{ label: "دينار كويتي", value: "kwd" }]}
                />
                <SelectForm
                  name="alertDays"
                  label="أيام التنبيه"
                  options={[{ label: "ثلاثة أيام", value: "3" }]}
                />

                <SelectForm
                  name="language"
                  label="اللغة"
                  options={[{ label: "العربية", value: "ar" }]}
                />
                <SelectForm
                  name="timezone"
                  label="المنطقة الزمنية"
                  options={[{ label: "GMT +3", value: "gmt3" }]}
                />
              </div>

              <div className="w-full space-y-2 pt-4">
                <div className="rounded-[10px] p-4">
                  <SwitchForm name="notifications" label="الإشعارات" />
                  {values.notifications && (
                    <div className="mt-4 rounded-md bg-[#F9F9F9] p-4 text-sm text-[#476274]">
                      محتوى إعدادات الإشعارات (يظهر فقط عند تفعيل الإشعارات)
                    </div>
                  )}
                </div>
                <div className="rounded-[10px] p-4">
                  <SwitchForm name="darkMode" label="الوضع المظلم" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-[50px] w-full rounded-[10px] bg-[#C1A063] text-base font-medium text-white transition-colors hover:bg-[#a88a53]"
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
