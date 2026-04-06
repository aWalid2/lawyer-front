import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import type { CourtT } from "../types/courtTypes";

interface CourtFormDialogProps {
  court?: CourtT;
  onSave: (values: Partial<CourtT>) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم المحكمة مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
});

export const CourtFormDialog: React.FC<CourtFormDialogProps> = ({
  court,
  onSave,
  trigger,
}) => {
  const initialValues = {
    name: court?.name || "",
    address: court?.address || "",
  };

  return (
    <LayoutDialog
      title={court ? "تعديل محكمة" : "اضافة محكمة جديدة"}
      trigger={trigger}
      className="sm:max-w-[715px]"
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
              label="اسم المحكمة"
              name="name"
              type="text"
              placeholder="محكمة الجيزة"
            />
            <InputForm
              label="العنوان"
              name="address"
              type="text"
              placeholder="شارع فؤاد"
            />
            <button
              type="submit"
              className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity h-12.5"
            >
              {court ? "تعديل محكمة" : "إضافة محكمة"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
