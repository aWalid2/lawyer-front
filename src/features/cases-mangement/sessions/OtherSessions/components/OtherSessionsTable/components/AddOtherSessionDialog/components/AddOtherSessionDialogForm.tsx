import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import type { OtherSessionFormValues } from "../../../../../types/typesOther";

interface SelectOption {
  label: string;
  value: string;
}

interface AddOtherSessionDialogFormProps {
  defaultValues: OtherSessionFormValues;
  isEditMode: boolean;
  isPending: boolean;
  lawyersOptions: SelectOption[];
  onSubmit: (values: OtherSessionFormValues) => Promise<void>;
}

const validationSchema = Yup.object({
  actionType: Yup.string().required("نوع الإجراء مطلوب"),
  referral_date: Yup.string().required("تاريخ الإحالة مطلوب"),
  admin_authority: Yup.string().required("الجهة الإدارية مطلوبة"),
  session_date: Yup.string().required("موعد الجلسة مطلوب"),
  lawyer_id: Yup.string().required("المحامي المسؤول مطلوب"),
  session_decision: Yup.string().required("قرار الجلسة مطلوب"),
  notes: Yup.string(),
});

const decisionOptions: SelectOption[] = [
  { label: "تم التأجيل", value: "تم التأجيل" },
  { label: "تم الحضور", value: "تم الحضور" },
  { label: "انتظار القرار", value: "انتظار القرار" },
  { label: "تم الصلح", value: "تم الصلح" },
  { label: "مؤجلة", value: "Postponed" },
];

export const AddOtherSessionDialogForm: React.FC<
  AddOtherSessionDialogFormProps
> = ({ defaultValues, isEditMode, isPending, lawyersOptions, onSubmit }) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
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
            <InputForm name="actionType" label="نوع الإجراء" type="text" />
            <InputForm name="referral_date" label="تاريخ الإحالة" type="date" />
            <InputForm
              name="admin_authority"
              label="الجهة الإدارية"
              type="text"
            />
            <InputForm
              name="session_date"
              label="تاريخ ووقت الجلسة"
              type="datetime-local"
            />
            <SelectForm
              name="lawyer_id"
              label="المحامي المسؤول"
              options={lawyersOptions}
              showSearch={true}
            />
            <SelectForm
              name="session_decision"
              label="قرار الجلسة"
              options={decisionOptions}
            />
            <TextAreaForm
              name="notes"
              label="ملاحظات"
              placeholder="أضف ملاحظات الجلسة"
              className="md:col-span-2"
            />
          </div>
          <SubmitButton
            isPending={isPending}
            loadingText={
              isEditMode ? "جاري حفظ التعديلات..." : "جاري إضافة الجلسة..."
            }
            className="mt-6"
          >
            {isEditMode ? "حفظ التغييرات" : "إضافة الجلسة"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
