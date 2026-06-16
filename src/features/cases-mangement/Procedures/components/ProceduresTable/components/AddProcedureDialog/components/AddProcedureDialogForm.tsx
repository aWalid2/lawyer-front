import { Form, Formik } from "formik";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import React from "react";
import * as Yup from "yup";
import type { ProcedureFormValues } from "../../../../../types";
import { decisionOptions } from "@/shared/constants/procedursOptions";

interface SelectOption {
  label: string;
  value: string;
}

interface AddProcedureDialogFormProps {
  defaultValues: ProcedureFormValues;
  isEditMode: boolean;
  isPending: boolean;
  lawyersOptions: SelectOption[];
  onSubmit: (values: ProcedureFormValues) => Promise<void>;
}

const validationSchema = Yup.object({
  procedure_title: Yup.string().required("عنوان الإجراء مطلوب"),
  referral_date: Yup.string().required("تاريخ الإحالة مطلوب"),
  admin_authority: Yup.string().required("الجهة الإدارية مطلوبة"),
  session_date: Yup.string().required("موعد الإجراء مطلوب"),
  lawyer_id: Yup.string().required("المحامي المسؤول مطلوب"),
  actionType: Yup.string().required("قرار الإجراء مطلوب"),
  notes: Yup.string(),
});

export const AddProcedureDialogForm: React.FC<AddProcedureDialogFormProps> = ({
  defaultValues,
  isEditMode,
  isPending,
  lawyersOptions,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit({
            ...values,
            session_date: values.session_date + "T" + "00:00",
            referral_date: values.referral_date + "T" + "00:00",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {() => (
        <Form className="custom-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
            <InputForm
              name="procedure_title"
              label="عنوان الإجراء"
              type="string"
              placeholder="اكتب عنوان الاجراء"
            />
            <InputForm name="referral_date" label="تاريخ الإحالة" type="date" />
            <InputForm
              name="admin_authority"
              label="الجهة الإدارية"
              type="text"
              placeholder="اكتب اسم الجهة"
            />
            <InputForm
              name="session_date"
              label="موعد النهائي للتنفيذ"
              type="date"
            />
            <SelectForm
              name="lawyer_id"
              label="الموظف المسئول"
              options={lawyersOptions}
              showSearch={true}
            />
            <SelectForm
              name="actionType"
              label="حالة الإجراء"
              options={decisionOptions}
            />
            <TextAreaForm
              name="notes"
              label="ملاحظات"
              placeholder="أضف ملاحظات الإجراء"
              className="md:col-span-2"
            />
          </div>
          <SubmitButton
            isPending={isPending}
            loadingText={
              isEditMode ? "جاري حفظ التعديلات..." : "جاري إضافة الإجراء..."
            }
            className="mt-6"
          >
            {isEditMode ? "حفظ التغييرات" : "إضافة الإجراء"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
