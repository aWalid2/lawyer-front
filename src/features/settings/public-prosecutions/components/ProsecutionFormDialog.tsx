import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { PublicProsecutionT } from "../types";

interface ProsecutionFormDialogProps {
  prosecution?: PublicProsecutionT;
  onSave: (values: Partial<PublicProsecutionT>) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم النيابة مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
});

export const ProsecutionFormDialog: React.FC<ProsecutionFormDialogProps> = ({
  prosecution,
  onSave,
  trigger,
}) => {
  const initialValues = {
    name: prosecution?.name || "",
    address: prosecution?.address || "",
  };

  return (
    <LayoutDialog
      title={prosecution ? "تعديل نيابة" : "إضافة نيابة جديدة"}
      trigger={trigger}
      className="sm:max-w-[650px]"
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
              label="اسم النيابة"
              name="name"
              type="text"
              placeholder="نيابة جنوب الجيزة"
            />
            <InputForm
              label="العنوان"
              name="address"
              type="text"
              placeholder="الجيزة - شارع الوفاء"
            />
            <button
              type="submit"
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5"
            >
              {prosecution ? "تعديل نيابة" : "إضافة نيابة جديدة"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
