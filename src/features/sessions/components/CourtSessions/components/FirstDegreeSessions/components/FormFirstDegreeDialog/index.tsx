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
import { Button } from "@/components/ui/button";


export const FormFirstDegreeDialog: React.FC = () => {
  const initialValues: FirstDegreeFormValues = {
    courtName: "نيابة",
    courtRole: "نيابة",
    courtRoomNumber: "نيابة",
    courtCircleNumber: "نيابة",
    courtType: "نيابة",
    courtJudge: "نيابة",
    courtSecretary: "نيابة",
    courtSecretaryRole: "نيابة",
    courtSecretaryNumber: "نيابة",
    caseRegistrationDate: "sdfsdf",
    nextSessionDate: "sdfsdf",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-[#f1f1f3] text-[#3D3C48] text-base h-12.5   font-semibold hover:text-white'> <EditIcon className="w-4 h-4" /> تعديل </Button>
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
            تعديل معلومات أول درجة
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Saving first degree sessions:", values);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
                dir="rtl"
              >
                <InputForm
                  name="courtName"
                  label="اسم المحكمة"
                  type="text"
                />
                <InputForm
                  name="courtRole"
                  label="الدور في المحكمة"
                  type="text"
                />

                <InputForm
                  name="courtRoomNumber"
                  label="رقم القاعة في المحكمة"
                  type="text"
                />
                <InputForm
                  name="courtCircleNumber"
                  label="رقم الدائرة"
                  type="text"
                />

                <InputForm
                  name="courtType"
                  label="نوع الدائرة"
                  type="text"
                />
                <InputForm
                  name="courtJudge"
                  label="اسم قاضي الدائرة"
                  type="text"
                />

                <InputForm
                  name="courtSecretary"
                  label="اسم سكرتير الدائرة"
                  type="text"
                />
                <InputForm
                  name="courtSecretaryRole"
                  label="دور مكتب السكرتير"
                  type="text"
                />

                <InputForm
                  name="courtSecretaryNumber"
                  label="رقم مكتب السكرتير"
                  type="text"
                />
                <InputForm
                  name="caseRegistrationDate"
                  label="تاريخ تسجيل القضية بالمحكمة"
                  type="text"
                />

                <div className="md:col-span-2">
                  <InputForm
                    name="nextSessionDate"
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
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
