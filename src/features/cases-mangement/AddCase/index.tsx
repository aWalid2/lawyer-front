import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { SwitchForm } from "@/shared/components/SwitchForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAddPublicProsecutionCase } from "./api/hooks/useAddPublicProsecutionCase";
import { useAddPublicProsecutionOfficeCase } from "./api/hooks/useAddPublicProsecutionOfficeCase";
import { useAddUnderAppealCase } from "./api/hooks/useAddUnderAppealCase";
import { useAddActiveCase } from "./api/hooks/useAddActiveCase";
import { useAddOtherCase } from "./api/hooks/useAddOtherCase";
import { FeesForm } from "./components/FeesForm";
import { InProsecution } from "./components/InProsecution";
import { OpponentForm } from "./components/Opponent";
import { PublicProsecution } from "./components/PublicProsecution";
import { SharedFormField } from "./components/SharedFormField";
import { validationSchema } from "./components/ValidationSchema";
import { initialValues } from "./hooks/initialValues";
import { Active } from "./components/Active";
import { Other } from "./components/Other";
import { CASE_SITUATION_OPTIONS } from "@/shared/constants/caseOptions";

const FormCase = () => {
  const { mutateAsync: addUnderAppealCase, isPending: isPendingUnderAppealCase } = useAddUnderAppealCase()
  const { mutateAsync: addPublicProsecutionCase, isPending: isPendingPublicProsecutionCase } = useAddPublicProsecutionCase()
  const { mutateAsync: addPublicProsecutionOfficeCase, isPending: isPendingPublicProsecutionOfficeCase } = useAddPublicProsecutionOfficeCase()
  const { mutateAsync: addActiveCase, isPending: isPendingActiveCase } = useAddActiveCase()
  const { mutateAsync: addOtherCase, isPending: isPendingOtherCase } = useAddOtherCase()

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
        } else if (values.case_situation === "ACTIVE") {
          await addActiveCase(values);
        } else if (values.case_situation === "OTHER") {
          await addOtherCase(values);
        }
      }}
    >
      {({ values, setFieldValue, errors, submitCount }) => {
        useEffect(() => {
          if (submitCount > 0 && Object.keys(errors).length > 0) {
            Object.values(errors).forEach((err) => {
              if (typeof err === "string") {
                toast.error(err);
              }
            });
          }
        }, [submitCount]);

        return (
          <div className="w-full pt-6">
            <HeaderTitle title="إضافة قضية جديدة" />
            <div className="border border-gray-300 p-4 rounded-xl mt-6">
              <Form>
                <div className="mb-4">
                  <SelectForm
                    label="وضع القضية عند الاستلام"
                    name="case_situation"

                    options={CASE_SITUATION_OPTIONS}
                    placeholder="اختر وضع القضية"
                    onChange={(value) => {
                      setFieldValue("case_situation", value);
                    }}
                  />
                </div>

                <div className={" grid grid-cols-1 md:grid-cols-2 gap-4"}>

                  {values.case_situation === "UNDER_APPEAL" && <SharedFormField />}
                  {values.case_situation === "PUBLIC_PROSECUTION" && <PublicProsecution />}
                  {values.case_situation === "AT_PROSECUTOR_OFFICE" && values.case_status_id && <InProsecution />}
                  {values.case_situation === "ACTIVE" && <Active />}
                  {values.case_situation === "OTHER" && <Other />}

                  <InputForm label="تاريخ ورود القضية داخل المكتب" name="case_entry_date" type="date" />
                </div>

                <TextAreaForm label="ملاحظات" name="notes" placeholder="أضف ملاحظات..." className="mt-4" />
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <SwitchForm
                    name="has_opponent"
                    label="إضافة خصم للدعوى"
                  />

                  {values.has_opponent && (
                    <OpponentForm />
                  )}
                </div>
                <FeesForm />
                <SubmitButton
                  isPending={
                    isPendingUnderAppealCase ||
                    isPendingPublicProsecutionCase ||
                    isPendingPublicProsecutionOfficeCase ||
                    isPendingActiveCase ||
                    isPendingOtherCase
                  }
                  loadingText="جاري الإضافة..."
                  className="mt-6"
                >
                  إضافة قضية
                </SubmitButton>

              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormCase;