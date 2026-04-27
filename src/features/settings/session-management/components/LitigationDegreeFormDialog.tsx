import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { LitigationDegreeT } from "../types";

interface LitigationDegreeFormDialogProps {
  degree?: LitigationDegreeT;
  onSave: (values: Partial<LitigationDegreeT>) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("نوع درجة التقاضي مطلوب"),
});

export const LitigationDegreeFormDialog: React.FC<
  LitigationDegreeFormDialogProps
> = ({ degree, onSave, trigger }) => {
  const initialValues = {
    name: degree?.name || "",
  };

  return (
    <LayoutDialog
      title={degree ? "تعديل نوع درجة تقاضي" : "اضافة نوع درجة تقاضي جديد"}
      trigger={trigger}
      size="md"
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
              label="نوع درجة التقاضي"
              name="name"
              type="text"
              placeholder="أول درجة"
            />
            <button
              type="submit"
              className="bg-primary-gradient rounded-main mt-4 h-12.5 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              {degree ? "تعديل نوع" : "إضافة نوع جديد"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
