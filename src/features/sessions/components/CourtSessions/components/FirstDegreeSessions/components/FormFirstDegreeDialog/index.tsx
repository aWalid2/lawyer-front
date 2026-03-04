import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { EditIcon } from "@/components/shared/icons/Edit";
import { InputForm } from "./components/InputForm";
import type { FirstDegreeFormValues } from "./components/typesCaseInfo";


export const FormFirstDegreeDialog: React.FC = () => {
  const initialValues: FirstDegreeFormValues = {
    autoNumber: "7363",
    complaintNumber: "543257",
    clientName: "خليل محمد",
    caseTitle: "خليل محمد",
    court: "محكمة1",
    litigationLevel: "اول درجة",
    status: "متداولة",
    caseType: "جنائي",
    clientRelation: "مدعي عليه",
    statusOnReceipt: "متداولة",
    creationDate: "2026-01-20",
    receiptDate: "2026-01-20",
    notes: "-",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 bg-primary-gradient text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium h-12.5 hover:opacity-90"
        >
          <EditIcon />
          تعديل
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[772px] max-h-[90vh] overflow-y-auto sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none custom-scrollbar"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
            <XIcon size={23} className="text-gray-500 " />
          </button>
        </DialogClose>
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            تعديل معلومات القضية
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Adding contract:", values);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
                dir="rtl"
              >
                <InputForm
                  name="autoNumber"
                  label="الرقم الآلي للقضية"
                  type="text"
                />
                <InputForm
                  name="complaintNumber"
                  label="رقم الشكوى"
                  type="text"
                />

                <InputForm name="clientName" label="اسم الموكل" type="text" />
                <InputForm name="caseTitle" label="عنوان القضية" type="text" />

                <InputForm name="court" label="المحكمة" type="text" />
                <InputForm
                  name="litigationLevel"
                  label="درجة التقاضي الحالية"
                  type="text"
                />

                <InputForm name="status" label="حالة القضية" type="text" />
                <InputForm name="caseType" label="نوع القضية" type="text" />

                <InputForm
                  name="clientRelation"
                  label="صفة الموكل"
                  type="text"
                />
                <InputForm
                  name="statusOnReceipt"
                  label="وضع القضية عند الاستلام"
                  type="text"
                />

                <InputForm
                  name="creationDate"
                  label="تاريخ إنشاء القضية"
                  type="date"
                />
                <InputForm
                  name="receiptDate"
                  label="تاريخ ورود القضية في المكتب"
                  type="date"
                />

                <div className="md:col-span-2 mt-2 flex flex-col w-full">
                  <label className="block mb-2 text-sm font-medium text-secondary text-right pr-2">
                    ملاحظات
                  </label>
                  <textarea
                    name="notes"
                    className="w-full border border-[#E8E8E8] rounded-xl p-4 bg-[#FBFBFB] min-h-[50px] text-secondary text-sm text-right pr-6 disabled:opacity-70"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
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
