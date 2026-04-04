import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import x from "@/public/images/x.svg";
import { validationSchema } from "./components/ValidationSchema";
import { UnderReview } from "./components/UnderReview";
import { PublicProsecution } from "./components/PublicProsecution";
import { InProsecution } from "./components/InProsecution";
import { initialValues } from "./hooks/initialValues";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { SelectForm } from "@/shared/components/SelectForm";
import { InputForm } from "@/shared/components/InputForm";
import { SwitchForm } from "@/shared/components/SwitchForm";
import { useAddUnderAppealCase } from "./api/hooks/useAddUnderAppealCase";
import { useAddPublicProsecutionCase } from "./api/hooks/useAddPublicProsecutionCase";
import { useAddPublicProsecutionOfficeCase } from "./api/hooks/useAddPublicProsecutionOfficeCase";
import { FeesRadio } from "./components/FeesRadio";



const CLASSES = {
  formSection: "border border-gray-300 p-4 rounded-xl mt-6",
  flexRow: "flex flex-col md:flex-row gap-3",
  submitButton: "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};

const FormCase = () => {
  const { mutateAsync: addUnderAppealCase } = useAddUnderAppealCase()
  const { mutateAsync: addPublicProsecutionCase } = useAddPublicProsecutionCase()
  const { mutateAsync: addPublicProsecutionOfficeCase } = useAddPublicProsecutionOfficeCase()
  const [caseType, setCaseType] = useState<string>("");


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (values.case_situation === "UNDER_APPEAL") {
          await addUnderAppealCase(values);
        } else if (values.case_situation === "PUBLIC_PROSECUTION") {
          await addPublicProsecutionCase(values);
        } else if (values.case_situation === "AT_PROSECUTOR_OFFICE") {
          await addPublicProsecutionOfficeCase(values);
        }
      }}
    >
      {({ values, setFieldValue, errors, submitCount }) => {
        useEffect(() => {
          if (submitCount > 0 && Object.keys(errors).length > 0) {
            console.warn("Validation Errors:", errors);
          }
        }, [submitCount, errors]);

        return (
          <div className="w-full pt-6">
            <HeaderTitle title="إضافة قضية جديدة" />
            <div className={CLASSES.formSection}>
              <Form>
                <div className="mb-4">
                  <SelectForm
                    label="وضع القضية عند الاستلام"
                    name="case_situation"

                    options={[
                      { value: "UNDER_APPEAL", label: "تحت الرفع" },
                      { value: "PUBLIC_PROSECUTION", label: "الادعاء العام" },
                      { value: "AT_PROSECUTOR_OFFICE", label: "في النيابة" },
                    ]}
                    placeholder="اختر وضع القضية"
                    onChange={(value) => {
                      setFieldValue("case_situation", value);
                      setCaseType(value);
                    }}
                  />
                </div>

                <div className="space-y-4">
                  {values.case_situation === "UNDER_APPEAL" && <UnderReview />}
                  {values.case_situation === "PUBLIC_PROSECUTION" && <PublicProsecution />}
                  {values.case_situation === "AT_PROSECUTOR_OFFICE" && <InProsecution />}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <SwitchForm
                    name="has_discount"
                    label="إضافة خصم للدعوى"
                  />

                  {values.has_discount && (
                    <div className="mt-4 p-6 border border-dashed border-gray-200 rounded-xl bg-[#FBFBFB] space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#CBA462]">بيانات الخصم</h4>
                        <button
                          type="button"
                          onClick={() => setFieldValue("has_discount", false)}
                          className="text-red-500 text-sm flex items-center gap-1 hover:underline"
                        >
                          <img src={x} alt="" className="w-3" />
                          إزالة
                        </button>
                      </div>

                      <div className={CLASSES.flexRow}>
                        <div className="flex-1">
                          <InputForm label="الاسم" name="name" type="text" placeholder="بدر" />
                        </div>
                        <div className="flex-1">
                          <InputForm label="الصفة القانونية" name="legal_status" type="text" placeholder="صفة1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                        <InputForm label="الرقم القومي" name="ssn" type="text" placeholder="5xxxxxxxxxxxx" />
                        <div className="lg:col-span-2 flex gap-2 items-end">
                          <div className="w-1/3">
                            <SelectForm
                              label="الكود"
                              name="country_code"
                              options={[
                                { value: "+20", label: "🇪🇬 +20" },
                                { value: "+966", label: "🇸🇦 +966" },
                                { value: "+971", label: "🇦🇪 +971" },
                                { value: "+1", label: "🇺🇸 +1" },
                              ]}
                              placeholder="الكود"
                            />
                          </div>
                          <div className="w-2/3">
                            <InputForm label="رقم الهاتف" name="phone" type="text" placeholder="5xxxxxxxxxxxx" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-10 space-y-6">
                  <div className="text-sm font-medium text-gray-700 mb-5">هل الاتعاب رقم أم نسبة من الأرباح أم تابعة للعقد ؟</div>
                  <FeesRadio />
                </div>
                <div className="w-full pt-10 flex justify-end">
                  <button
                    type="submit"
                    className={CLASSES.submitButton}
                    style={{
                      background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                    }}
                  >
                    إضافة قضية
                  </button>
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormCase;