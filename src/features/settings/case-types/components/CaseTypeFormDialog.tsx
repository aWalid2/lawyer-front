import { InputForm } from "@/components/shared/components/InputForm";
import { LayoutDialog } from "@/components/shared/components/LayoutDialog";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type { CaseTypeT } from "../types";

interface CaseTypeFormDialogProps {
  caseType?: CaseTypeT;
  onSave: (values: Partial<CaseTypeT>) => void;
  trigger: React.ReactNode;
}

const CaseTypeSchema = Yup.object().shape({
  name: Yup.string().required("نوع القضية مطلوب"),
});

export const CaseTypeFormDialog: React.FC<CaseTypeFormDialogProps> = ({
  caseType,
  onSave,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);

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
        onSubmit={(values) => {
          onSave(values);
          setOpen(false);
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

            <button
              type="submit"
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity"
            >
              {caseType ? "تعديل النوع" : "إضافة نوع جديد"}
            </button>

          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
