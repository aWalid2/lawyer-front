import React from "react";
import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import * as Yup from "yup";

interface HiringEmployeeDialogProps {
  trigger: React.ReactNode;
}

export const HiringEmployeeDialog: React.FC<HiringEmployeeDialogProps> = ({
  trigger,
}) => {
  const initialValues = {
    name: "",
    phone: "",
    job: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم الموظف مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    job: Yup.string().required("الوظيفة مطلوبة"),
  });

  return (
    <LayoutDialog title="تعيين موظف" trigger={trigger}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Hiring employee:", values);
        }}
      >
        {() => (
          <Form className="space-y-4">
            <InputForm name="name" label="اسم الموظف" type="text" />
            <InputForm name="phone" label="رقم الهاتف" type="text" />
            <InputForm name="job" label="الوظيفة" type="text" />

            <button
              type="submit"
              className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              إضافة
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
