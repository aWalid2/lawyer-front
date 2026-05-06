import React from "react";
import { Formik, Form } from "formik";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import { FileUpload } from "@/shared/components/FileUpload";
import type { ExpenseFormValues, ExpenseItem } from "../types";
import {
  EMPTY_EXPENSE_FORM_VALUES,
  EXPENSE_TYPE_OPTIONS,
  toExpenseFormValues,
} from "../types";

import * as Yup from "yup";

interface EditModelExpensesProps {
  expense?: ExpenseItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: ExpenseFormValues, id?: string) => Promise<void> | void;
  isPending?: boolean;
}

export const EditModelExpenses: React.FC<EditModelExpensesProps> = ({
  expense,
  open,
  onOpenChange,
  onSave,
  isPending = false,
}) => {
  const initialValues = expense
    ? toExpenseFormValues(expense)
    : EMPTY_EXPENSE_FORM_VALUES;
  const isEditMode = !!expense?.id;

  const validationSchema = Yup.object().shape({
    expenseType: Yup.string().required("نوع المصروف مطلوب"),
    description: Yup.string().required("وصف المصروف مطلوب"),
    amount: Yup.number()
      .typeError("قيمة المصروف مطلوبة")
      .required("قيمة المصروف مطلوبة")
      .moreThan(0, "قيمة المصروف يجب أن تكون أكبر من صفر"),
    expenseDate: Yup.string().required("تاريخ المصروف مطلوب"),
    attachments: Yup.mixed().nullable(),
    notes: Yup.string().nullable(),
  });

  return (
    <LayoutDialog
      title={isEditMode ? "تعديل المصروف" : "إضافة مصروف"}
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
          await onSave(values, expense?.id);
          onOpenChange(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectForm
                name="expenseType"
                label="نوع المصروف"
                options={EXPENSE_TYPE_OPTIONS}
                placeholder="اختر نوع المصروف"
              />
              <InputForm name="expenseDate" label="تاريخ المصروف" type="date" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputForm
                name="description"
                label="وصف المصروف"
                type="text"
                placeholder="أدخل وصف المصروف"
              />
              <InputForm
                name="amount"
                label="قيمة المصروف"
                type="number"
                placeholder="أدخل قيمة المصروف"
                dir="ltr"
              />
            </div>

            <FileUpload name="attachments" label="مرفقات" className="w-full" />

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
                : isEditMode
                  ? "حفظ التغييرات"
                  : "إضافة المصروف"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutDialog>
  );
};
