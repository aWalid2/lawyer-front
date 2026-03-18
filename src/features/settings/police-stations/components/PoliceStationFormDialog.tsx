import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LayoutDialog } from "@/components/shared/components/LayoutDialog";
import { InputForm } from "@/components/shared/components/InputForm";
import type { PoliceStationT } from "../types";

interface PoliceStationFormDialogProps {
  station?: PoliceStationT;
  onSave: (values: Partial<PoliceStationT>) => void;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم المخفر مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
});

export const PoliceStationFormDialog: React.FC<PoliceStationFormDialogProps> = ({
  station,
  onSave,
  trigger,
}) => {
  const initialValues = {
    name: station?.name || "",
    address: station?.address || "",
  };

  return (
    <LayoutDialog
      title={station ? "تعديل مخفر" : "إضافة مخفر جديد"}
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
              label="اسم المخفر"
              name="name"
              type="text"
              placeholder="مخفر الجيزة"
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
              {station ? "تعديل مخفر" : "إضافة مخفر جديد"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
