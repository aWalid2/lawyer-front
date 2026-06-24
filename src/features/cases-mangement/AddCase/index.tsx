import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { InputForm } from "@/shared/components/inputs/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";
import { SwitchForm } from "@/shared/components/SwitchForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { Form, Formik, useFormikContext, type FormikErrors } from "formik";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAddPublicProsecutionCase } from "./api/hooks/useAddPublicProsecutionCase";
import { useAddPublicProsecutionOfficeCase } from "./api/hooks/useAddPublicProsecutionOfficeCase";
import { useAddUnderAppealCase } from "./api/hooks/useAddUnderAppealCase";
import { useAddActiveCase } from "./api/hooks/useAddActiveCase";
import { useAddOtherCase } from "./api/hooks/useAddOtherCase";
import { useAddPoliceCase } from "./api/hooks/useAddPoliceCase";
import { FeesForm } from "./components/FeesForm";
import { InProsecution } from "./components/InProsecution";
import { OpponentForm } from "./components/Opponent";
import { PublicProsection } from "./components/PublicProsection";
import { PoliceStationCase } from "./components/PoliceStationCase";
import { SharedFormField } from "./components/SharedFormField";
import { validationSchema } from "./components/ValidationSchema";
import { initialValues } from "./hooks/initialValues";
import { Active } from "./components/Active";
import { Other } from "./components/Other";
import { EmployeesForm } from "./components/EmployeesForm";
import { CASE_SITUATION_OPTIONS } from "@/shared/constants/caseOptions";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import type { FormValues } from "./utils/mapToApiPayload";
import { RoleForm } from "./components/RoleForm";

const collectErrorMessages = (errors: FormikErrors<typeof initialValues>) => {
  const messages: string[] = [];

  const visit = (value: unknown) => {
    if (typeof value === "string") {
      messages.push(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (value && typeof value === "object") {
      Object.values(value).forEach(visit);
    }
  };

  visit(errors);
  return messages;
};

const FormValidationToasts = () => {
  const { errors, submitCount } = useFormikContext<typeof initialValues>();

  useEffect(() => {
    if (submitCount < 1 || Object.keys(errors).length === 0) return;

    collectErrorMessages(errors).forEach((message) => {
      toast.error(message);
    });
  }, [errors, submitCount]);

  return null;
};

const FormCase = () => {
  const [searchParams] = useSearchParams();
  const clientIdFromUrl = searchParams.get("clientId");
  const {
    mutateAsync: addUnderAppealCase,
    isPending: isPendingUnderAppealCase,
  } = useAddUnderAppealCase();
  const {
    mutateAsync: addPublicProsecutionCase,
    isPending: isPendingPublicProsecutionCase,
  } = useAddPublicProsecutionCase();
  const {
    mutateAsync: addPublicProsecutionOfficeCase,
    isPending: isPendingPublicProsecutionOfficeCase,
  } = useAddPublicProsecutionOfficeCase();
  const { mutateAsync: addActiveCase, isPending: isPendingActiveCase } =
    useAddActiveCase();
  const { mutateAsync: addOtherCase, isPending: isPendingOtherCase } =
    useAddOtherCase();
  const { mutateAsync: addPoliceCase, isPending: isPendingPoliceCase } =
    useAddPoliceCase();
  const formInitialValues: FormValues = {
    ...initialValues,
    client_id: clientIdFromUrl || initialValues.client_id,
  };

  return (
    <Formik<FormValues>
      initialValues={formInitialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (values.case_situation === "POLICE_CASE") {
          await addPoliceCase(values);
        } else if (values.case_situation === "UNDER_APPEAL") {
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
      {({ values, setFieldValue }) => {
        return (
          <div className="space-y-6">
            <HeaderTitle title="إضافة قضية جديدة" />
            <CustomLayoutBorder>
              <Form>
                <FormValidationToasts />
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

                <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
                  {values.case_situation === "POLICE_CASE" && (
                    <PoliceStationCase />
                  )}
                  {values.case_situation === "UNDER_APPEAL" && (
                    <SharedFormField />
                  )}
                  {values.case_situation === "PUBLIC_PROSECUTION" && (
                    <PublicProsection />
                  )}
                  {values.case_situation === "AT_PROSECUTOR_OFFICE" &&
                    values.case_status_id && <InProsecution />}
                  {values.case_situation === "ACTIVE" && <Active />}
                  {values.case_situation === "OTHER" && <Other />}

                  <InputForm
                    label="تاريخ ورود القضية للمكتب"
                    name="case_entry_date"
                    type="date"
                  />
                </div>

                <TextAreaForm
                  label="ملاحظات"
                  name="notes"
                  placeholder="أضف ملاحظات..."
                  className="mt-4"
                />
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <SwitchForm name="has_opponent" label="إضافة خصم للدعوى" />

                  {values.has_opponent && <OpponentForm />}
                </div>
                <EmployeesForm />
                <RoleForm />
                <FeesForm />
                <SubmitButton
                  isPending={
                    isPendingUnderAppealCase ||
                    isPendingPublicProsecutionCase ||
                    isPendingPublicProsecutionOfficeCase ||
                    isPendingActiveCase ||
                    isPendingOtherCase ||
                    isPendingPoliceCase
                  }
                  loadingText="جاري الإضافة..."
                  className="mt-6"
                >
                  إضافة قضية
                </SubmitButton>
              </Form>
            </CustomLayoutBorder>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormCase;
