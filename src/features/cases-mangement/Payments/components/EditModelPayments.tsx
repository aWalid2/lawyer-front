import React from "react";
import { Formik, Form } from "formik";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import type {
  PaymentFormValues,
  PaymentItem,
} from "@/features/cases-mangement/Payments/types";
import {
  EMPTY_PAYMENT_FORM_VALUES,
  toPaymentFormValues,
} from "@/features/cases-mangement/Payments/types";
import * as Yup from "yup";
import { useGetPaymentUsers } from "@/features/cases-mangement/Payments/api/hooks/useGetPaymentUsers";
import type { UserT } from "@/features/settings/users/types/userT";

const PAYMENT_TYPE_OPTIONS = [
  { value: "client refund", label: "استرداد من العميل" },
  { value: "payment refund", label: "دفعة من العميل" },
  { value: "other", label: "أخرى" },
];

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
  const { data: usersResponse } = useGetPaymentUsers();
  const initialValues = payment
    ? toPaymentFormValues(payment)
    : EMPTY_PAYMENT_FORM_VALUES;
  const isEdit = !!payment?.id;

  const employeeOptions =
    usersResponse?.map((user: UserT) => ({
      label: user?.first_name || user?.fullName || `#${user?.id}`,
      value: String(user?.id),
    })) || [];

  const validationSchema = Yup.object().shape({
    payment_type: Yup.string().required("نوع الدفعة مطلوب"),
    employeeId: Yup.number()
      .typeError("اسم الموظف المسئول مطلوب")
      .required("اسم الموظف المسئول مطلوب"),
    payment_description: Yup.string().required("وصف الدفعة مطلوب"),
    amount: Yup.number()
      .typeError("المبلغ مطلوب")
      .required("المبلغ مطلوب")
      .moreThan(0, "المبلغ يجب أن يكون أكبر من صفر"),
    payment_date: Yup.string().required("تاريخ الدفعة مطلوب"),
    notes: Yup.string().nullable(),
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
          await onSave(values, payment?.id);
          onOpenChange(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectForm
                name="payment_type"
                label="نوع الدفعة"
                options={PAYMENT_TYPE_OPTIONS}
                placeholder="اختر نوع الدفعة"
              />
              <SelectForm
                name="employeeId"
                label="اسم الموظف المسئول"
                options={employeeOptions}
                placeholder="اختر الموظف"
                showSearch
                onChange={(selectedId) => {
                  if (selectedId && usersResponse) {
                    const selectedUser = usersResponse.find(
                      (u: UserT) => u.id === Number(selectedId),
                    );
                    if (selectedUser) {
                      setFieldValue(
                        "employee_name",
                        selectedUser.first_name || selectedUser.fullName || "",
                      );
                    }
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
