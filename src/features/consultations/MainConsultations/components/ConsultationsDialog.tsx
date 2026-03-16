import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/components/shared/components/InputForm";
import { SelectForm } from "@/components/shared/components/SelectForm";
import { TextAreaForm } from "@/components/shared/components/TextAreaForm";

import { XIcon } from "lucide-react";
import React from "react";
import { Formik, Form } from "formik";
import type { Consultation } from "../types";

interface ConsultationsDialogProps {
  onSave: (values: Consultation) => void;
  initialValues?: Consultation;
  trigger: React.ReactNode;
}

export const ConsultationsDialog: React.FC<ConsultationsDialogProps> = ({
  trigger,
  onSave,
  initialValues,
}) => {
  const defaultValues: Consultation = {
    id: initialValues?.id || "",
    title: initialValues?.title || "",
    clientName: initialValues?.clientName || "",
    lawyerName: initialValues?.lawyerName || "",
    consultationType: initialValues?.consultationType || "أحوال شخصية",
    contactMethod: initialValues?.contactMethod || "حضوري",
    details: initialValues?.details || "",
    status: initialValues?.status || "under_study",
    requestDate: initialValues?.requestDate || new Date().toISOString().split('T')[0],
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
            {initialValues ? "تعديل الاستشارة" : "اضافة استشارة جديدة"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={defaultValues}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="md:col-span-2">
                  <InputForm
                    type='text'
                    name="title"
                    label="عنوان الاستشارة"
                    placeholder="دعوي طلاق"
                  />
                </div>

                <InputForm
                  type='text'
                  name="clientName"
                  label="اسم الموكل"
                  placeholder="محمد علي"
                />

                <InputForm
                  type='text'
                  name="lawyerName"
                  label="اسم المحامي"
                  placeholder="محمد علي"
                />


                <SelectForm
                  name="consultationType"
                  label="نوع الاستشارة"
                  options={[
                    { value: "أحوال شخصية", label: "أحوال شخصية" },
                    { value: "جنائي", label: "جنائي" },
                    { value: "عقاري", label: "عقاري" },
                  ]}
                />

                <SelectForm
                  name="contactMethod"
                  label="طريقة التواصل"
                  options={[
                    { value: "حضوري", label: "حضوري" },
                    { value: "أونلاين", label: "أونلاين" },
                    { value: "هاتف", label: "هاتف" },
                  ]}
                />

                <div className="md:col-span-2">
                  <TextAreaForm
                    name="details"
                    label="تفاصيل الاستشارة"
                    placeholder="..."
                  />
                </div>
                <InputForm
                  type='date'
                  name="requestDate"
                  label="تاريخ طلب الاستشارة"

                />

              </div>

              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity font-cairo h-12.5"
                >
                  {initialValues ? "حفظ التغييرات" : "إضافة استشارة"}
                </button>
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
