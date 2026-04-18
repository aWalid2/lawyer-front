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
import { EditIcon } from "@/shared/icons/Edit";
import { InputForm } from "./components/InputForm";
import type { FirstDegreeFormValues } from "./components/typesCaseInfo";
import { Button } from "@/components/ui/button";


export const FormSessionDialog: React.FC<{
  title: string;
  buttonTitle?: string;
  initialValues: FirstDegreeFormValues;
  onSubmit: (values: FirstDegreeFormValues) => void;
}> = ({ title, buttonTitle = "تعديل", initialValues, onSubmit }) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-[#f1f1f3] text-[#3D3C48] text-base h-12.5 font-semibold hover:text-white'>
          {buttonTitle === "إضافة" ? null : <EditIcon className="w-4 h-4" />} {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[772px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-main border-none"
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
            {title}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
          }}

        >

          <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2" >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
              dir="rtl"
            >
              <InputForm
                name="court_id"
                label="اسم المحكمة"
                type="text"
              />
              <InputForm
                name="floor_number"
                label="الدور في المحكمة"
                type="text"
              />

              <InputForm
                name="hall_number"
                label="رقم القاعة في المحكمة"
                type="text"
              />
              <InputForm
                name="district_number"
                label="رقم الدائرة"
                type="text"
              />

              <InputForm
                name="district_type"
                label="نوع الدائرة"
                type="text"
              />
              <InputForm
                name="judge_name"
                label="اسم قاضي الدائرة"
                type="text"
              />

              <InputForm
                name="secretary_name"
                label="اسم سكرتير الدائرة"
                type="text"
              />
              <InputForm
                name="secretary_floor"
                label="دور مكتب السكرتير"
                type="text"
              />

              <InputForm
                name="secretary_office_number"
                label="رقم مكتب السكرتير"
                type="text"
              />
              <InputForm
                name="registration_date"
                label="تاريخ تسجيل القضية بالمحكمة"
                type="text"
              />

              <div className="md:col-span-2">
                <InputForm
                  name="next_session_date"
                  label="تاريخ ووقت الجلسة القادمة"
                  type="text"
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

        </Formik>
      </DialogContent>
    </Dialog>
  );
};
