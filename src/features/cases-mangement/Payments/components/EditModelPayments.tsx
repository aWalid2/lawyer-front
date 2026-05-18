import React from "react";
import { Formik, Form } from "formik";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { FileUpload } from "@/shared/components/FileUpload";
import type {
  PaymentFormValues,
  PaymentItem,
} from "@/features/cases-mangement/Payments/types";
import {
  EMPTY_PAYMENT_FORM_VALUES,
  toPaymentFormValues,
} from "@/features/cases-mangement/Payments/types";
import * as Yup from "yup";
import { useAuth } from "@/shared/context/AuthContext";
import { PAYMENT_TYPE_OPTIONS } from "@/shared/constants/PaymentsOptions";




interface Props {
  payment?: PaymentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: PaymentFormValues, id?: string) => Promise<void> | void;
  isPending?: boolean;
}

export const EditModelPayments: React.FC<Props> = ({
  payment,
  open,
  onOpenChange,
  onSave,
  isPending = false,
}) => {
  const { user } = useAuth();
  console.log(user)

  const initialValues = payment
    ? toPaymentFormValues(payment)
    : EMPTY_PAYMENT_FORM_VALUES;
  const isEdit = !!payment?.id;



  const validationSchema = Yup.object().shape({
    payment_type: Yup.string().required("نوع الدفعة مطلوب"),
    payment_description: Yup.string().required("وصف الدفعة مطلوب"),
    amount: Yup.number()
      .typeError("المبلغ مطلوب")
      .required("المبلغ مطلوب")
      .moreThan(0, "المبلغ يجب أن يكون أكبر من صفر"),
    payment_date: Yup.string().required("تاريخ الدفعة مطلوب"),
    notes: Yup.string().nullable(),
    attachment: Yup.mixed().nullable(),
  });

  return (
    <LayoutDialog
      title={isEdit ? "تعديل الدفعة" : "إضافة دفعة"}
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values) => {
          await onSave(
            { ...values, employee_id: user?.sub ? Number(user.sub) : "" },
            payment?.id
          );
          onOpenChange(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectForm
                name="payment_type"
                label="نوع الدفعة"
                options={PAYMENT_TYPE_OPTIONS}
                placeholder="اختر نوع الدفعة"
              />


              <InputForm name="payment_date" label="تاريخ الدفعة" type="date" />
              <InputForm
                name="payment_description"
                label="وصف الدفعة"
                type="text"
                placeholder="أدخل وصف الدفعة"
              />
              <InputForm
                name="amount"
                label="المبلغ"
                type="number"
                placeholder="أدخل المبلغ"
                dir="ltr"
              />
            </div>

            <TextAreaForm
              name="notes"
              label="ملاحظات"
              placeholder="أدخل أي ملاحظات إضافية"
            />

            <FileUpload
              name="attachment"
              label="مرفق الدفعة"
              placeholder="انقر هنا لتحميل مرفق الدفعة أو سحبه وإفلاته"
            />

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              {isSubmitting || isPending
                ? "جارٍ الحفظ..."
                : isEdit
                  ? "حفظ التغييرات"
                  : "إضافة الدفعة"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};

export default EditModelPayments;
