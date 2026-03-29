import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { CaseStatusT } from "../types";

interface CaseStatusFormDialogProps {
  status?: CaseStatusT;
  onSave: (values: Partial<CaseStatusT>) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم الحالة مطلوب"),
});

export const CaseStatusFormDialog: React.FC<CaseStatusFormDialogProps> = ({
  status,
  onSave,
  trigger,
}) => {
  const initialValues = {
    name: status?.name || "",
  };

  return (
    <LayoutDialog
      title={status ? "تعديل حالة قضية" : "إضافة حالة قضية جديدة"}
      trigger={trigger}
      className="sm:max-w-[500px]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSave(values)}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-4 py-4">
            <InputForm
              label="حالة القضية"
              name="name"
              type="text"
              placeholder="شارع الفؤاد"
            />
            <button
              type="submit"
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5"
            >
              {status ? "تعديل حالة" : "إضافة حالة جديدة"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
