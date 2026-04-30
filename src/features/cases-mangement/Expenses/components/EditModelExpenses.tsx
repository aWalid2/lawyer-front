import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";
import type { Document } from "../types";

import * as Yup from "yup";

interface EditModelExpensesProps {
  document: Document;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: any) => void;
}

export const EditModelExpenses: React.FC<EditModelExpensesProps> = ({
  document,
  open,
  onOpenChange,
  onSave,
}) => {
  const initialValues = {
    caseReceiptDate: document.caseReceiptDate || "",
    receiptStatus: document.receiptStatus || "",
    caseType: document.caseType || "",
    caseStatus: document.caseStatus || "",
    currentDegree: document.currentDegree || "",
    fees: document.fees || "",
    uploadFiles: document.uploadFiles || null,
    notes: document.notes || "",
  };

  const validationSchema = Yup.object().shape({
    caseReceiptDate: Yup.string().required("تاريخ ورود القضية مطلوب"),
    receiptStatus: Yup.string().required("وضع القضية عند الاستلام مطلوب"),
    caseType: Yup.string().required("نوع القضية مطلوب"),
    caseStatus: Yup.string().required("حالة القضية مطلوبة"),
    currentDegree: Yup.string().required("درجة التقاضي الحالية مطلوبة"),
    fees: Yup.string().required("الاتعاب مطلوبة"),
    uploadFiles: Yup.mixed().nullable(),
    notes: Yup.string().nullable(),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-[715px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={() => onOpenChange(false)}>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            تعديل بيانات المصاريف
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            onSave(values);
            onOpenChange(false);
          }}
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="caseReceiptDate"
                  label="تاريخ ورود القضية"
                  type="date"
                />
                <InputForm
                  name="receiptStatus"
                  label="وضع القضية عند الاستلام"
                  type="text"
                  placeholder="أدخل وضع القضية عند الاستلام"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="caseType"
                  label="نوع القضية"
                  type="text"
                  placeholder="أدخل نوع القضية"
                />
                <InputForm
                  name="caseStatus"
                  label="حالة القضية"
                  type="text"
                  placeholder="أدخل حالة القضية"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="currentDegree"
                  label="درجة التقاضي الحالية"
                  type="text"
                  placeholder="أدخل درجة التقاضي الحالية"
                />
                <InputForm
                  name="fees"
                  label="الاتعاب"
                  type="text"
                  placeholder="أدخل قيمة الاتعاب"
                />
              </div>

              <TextAreaForm
                name="notes"
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
              />

              <button
                type="submit"
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              >
                حفظ التغييرات
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
