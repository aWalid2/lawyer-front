import React from "react";
import { Formik, Form } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import * as Yup from "yup";

interface Employee {
  id: string;
  name: string;
  phone: string;
  job: string;
}

interface EditEmployeeDialogProps {
  employee: Employee;
  trigger: React.ReactNode;
}

export const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({
  employee,
  trigger,
}) => {
  const initialValues = {
    name: employee.name || "",
    phone: employee.phone || "",
    job: employee.job || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم الموظف مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    job: Yup.string().required("الوظيفة مطلوبة"),
  });

  return (
    <LayoutDialog title="تعديل بيانات الموظف" trigger={trigger} size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log("Updating employee:", { id: employee.id, ...values });
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
              حفظ التغييرات
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
