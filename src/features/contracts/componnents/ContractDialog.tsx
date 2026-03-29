import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
import { SelectForm } from "@/shared/components/SelectForm";
import { XIcon } from "lucide-react";
import React from "react";
import { Formik, Form } from "formik";
import type { Contract } from "../types";
import * as Yup from "yup";

interface ContractDialogProps {
  onSave: (values: Contract) => void;
  initialValues?: Contract;
  trigger: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  clientName: Yup.string().required("اسم الموكل مطلوب"),
  contractType: Yup.string().required("نوع العقد مطلوب"),
  status: Yup.string().required("الحالة مطلوبة"),
  startDate: Yup.string().required("تاريخ بداية العقد مطلوب"),
  endDate: Yup.string().required("تاريخ نهاية العقد مطلوب"),
});

export const ContractDialog: React.FC<ContractDialogProps> = ({
  trigger,
  onSave,
  initialValues,
}) => {
  const defaultValues: Contract = {
    id: initialValues?.id || "",
    contractNumber: initialValues?.contractNumber || `CONT-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    clientName: initialValues?.clientName || "",
    contractType: initialValues?.contractType || "",
    status: initialValues?.status || "",
    startDate: initialValues?.startDate || "",
    endDate: initialValues?.endDate || "",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[772px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-400 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all outline-none">
            <XIcon size={23} />
          </button>
        </DialogClose>
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {initialValues ? "تعديل العقد" : "إضافة عقد جديد"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">

              <InputForm
                name="clientName"
                label="اسم الموكل"
                type="text"
                placeholder="أدخل اسم الموكل"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectForm
                  name="contractType"
                  label="نوع العقد"
                  options={[
                    { value: "بيع", label: "بيع" },
                    { value: "إيجار", label: "إيجار" },
                    { value: "صيانة", label: "صيانة" },
                    { value: "استشارات", label: "استشارات" },
                    { value: "خدمات", label: "خدمات" },
                  ]}
                />

                <SelectForm
                  name="status"
                  label="الحالة"
                  options={[
                    { value: "نشط", label: "نشط" },
                    { value: "منتهي", label: "منتهي" },
                    { value: "ملغي", label: "ملغي" },
                    { value: "معلق", label: "معلق" },
                  ]}
                />
              </div>

              <InputForm
                name="startDate"
                label="تاريخ بداية العقد"
                type="date"
              />


              <InputForm
                name="endDate"
                label="تاريخ نهاية العقد"
                type="date"
              />

              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity font-cairo"
                >
                  {initialValues ? "حفظ التغييرات" : "إضافة العقد"}
                </button>
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};