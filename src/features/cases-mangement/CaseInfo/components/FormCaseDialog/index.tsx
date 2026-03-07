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
import { InputForm } from "../../../../../components/shared/components/InputForm";
import { SelectForm } from "../../../../../components/shared/components/SelectForm";
import type { CaseFormValues } from "./components/typesCaseInfo";

export const FormCaseDialog: React.FC = () => {
  const initialValues: CaseFormValues = {
    autoNumber: "7363",
    complaintNumber: "543257",
    clientName: "خليل محمد",
    caseTitle: "مدعي",
    court: "محكمة ابتدائية",
    status: "جديد",
    litigationLevel: "أول درجة",
    caseType: "مدني",
    clientRelation: "مدعي عليه",
    statusOnReceipt: "مستلم",
    creationDate: "2026-01-20",
    receiptDate: "2026-01-20",
    notes: "-",
  };

  const clientNameOptions = [
    { label: "خليل محمد", value: "خليل محمد" },
    { label: "أحمد علي", value: "أحمد علي" },
    { label: "سارة محمود", value: "سارة محمود" },
  ];

  const caseTitleOptions = [
    { label: "مدعي", value: "مدعي" },
    { label: "مدعي عليه", value: "مدعي عليه" },
    { label: "مستأنف", value: "مستأنف" },
    { label: "مستأنف ضده", value: "مستأنف ضده" },
  ];

  const courtOptions = [
    { label: "محكمة ابتدائية", value: "محكمة ابتدائية" },
    { label: "محكمة استئناف", value: "محكمة استئناف" },
    { label: "محكمة النقض", value: "محكمة النقض" },
    { label: "محكمة الأسرة", value: "محكمة الأسرة" },
  ];

  const litigationLevelOptions = [
    { label: "أول درجة", value: "أول درجة" },
    { label: "استئناف", value: "استئناف" },
    { label: "نقض", value: "نقض" },
  ];

  const statusOptions = [
    { label: "جديد", value: "جديد" },
    { label: "قيد المراجعة", value: "قيد المراجعة" },
    { label: "مستلم", value: "مستلم" },
  ];

  const caseTypeOptions = [
    { label: "مدني", value: "مدني" },
    { label: "جنائي", value: "جنائي" },
    { label: "تجاري", value: "تجاري" },
    { label: "عمالي", value: "عمالي" },
  ];

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

              >
                <InputForm name="autoNumber" label="كود القضية" type="text" />
                <InputForm
                  name="complaintNumber"
                  label="الرقم الآلي للقضية"
                  type="text"
                />

                <SelectForm
                  name="clientName"
                  label="اسم الموكل"
                  options={clientNameOptions}
                />
                <SelectForm
                  name="caseTitle"
                  label="صفة الموكل"
                  options={caseTitleOptions}
                />

                <SelectForm
                  name="court"
                  label="نوع القضية"
                  options={courtOptions}
                />
                <SelectForm
                  name="litigationLevel"
                  label="حالة القضية"
                  options={litigationLevelOptions}
                />

                <SelectForm
                  name="status"
                  label="وضع القضية عند الاستلام"
                  options={statusOptions}
                />
                <SelectForm
                  name="caseType"
                  label="درجة التقاضي"
                  options={caseTypeOptions}
                />

                <InputForm
                  dir="ltr"
                  name="creationDate"
                  label="تاريخ إنشاء القضية"
                  type="date"
                />
                <InputForm
                  dir="ltr"
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
