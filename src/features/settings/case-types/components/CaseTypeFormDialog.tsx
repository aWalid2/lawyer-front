import { InputForm } from "@/shared/components/InputForm";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type { CaseTypeT } from "../types/casesT";
import { useCreateCaseType } from "../api/hooks/useCreateCaseType";
import { useUpdateCaseType } from "../api/hooks/useUpdateCaseType";

interface CaseTypeFormDialogProps {
  caseType?: CaseTypeT;
  trigger: React.ReactNode;
}

const CaseTypeSchema = Yup.object().shape({
  name: Yup.string().required("نوع القضية مطلوب"),
});

export const CaseTypeFormDialog: React.FC<CaseTypeFormDialogProps> = ({
  caseType,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: createCaseType, isPending: isCreating } = useCreateCaseType();
  const { mutateAsync: updateCaseType, isPending: isUpdating } = useUpdateCaseType();

  const isPending = isCreating || isUpdating;

  return (
    <LayoutDialog
      open={open}
      onOpenChange={setOpen}
      title={caseType ? "تعديل نوع قضية" : "اضافة نوع قضية جديد"}
      trigger={trigger}
    >
      <Formik
        initialValues={{
          name: caseType?.name || "",
        }}
        validationSchema={CaseTypeSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (caseType) {
              await updateCaseType({ id: caseType.id, data: values });
            } else {
              await createCaseType(values);
            }
            setOpen(false);
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form className="space-y-6">
            <InputForm
              type="text"
              name="name"
              label="نوع القضية"
              placeholder="أدخل نوع القضية"
            />

            <SubmitButton isPending={isPending} className="w-full">
              {caseType ? "تعديل النوع" : "إضافة نوع جديد"}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
