import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/components/shared/components/InputForm";
import type { OtherAdministrativeData } from "./typesOther";
import { XIcon } from "lucide-react";
import React from "react";
import { Formik, Form } from "formik";

interface EditOtherDataDialogProps {
  onSave: (values: OtherAdministrativeData) => void;
  initialValues: OtherAdministrativeData;
  trigger: React.ReactNode;
}

export const EditOtherDataDialog: React.FC<EditOtherDataDialogProps> = ({
  onSave,
  initialValues,
  trigger,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
            تعديل البيانات الإدارية
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <InputForm name="procedureType" label="نوع الإجراء" type="text" />
                <InputForm
                  name="referralDate"
                  label="تاريخ الإحالة"
                  type="date"
                />
                <InputForm
                  name="adminEntity"
                  label="الجهة الإدارية"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block mb-2 text-sm font-medium text-secondary text-right pr-2">
                  ملاحظات
                </label>
                <textarea
                  name="notes"
                  className="w-full border border-[#E8E8E8] rounded-xl p-4 bg-[#FBFBFB] min-h-[50px] text-secondary text-sm text-right pr-6 disabled:opacity-70"
                />
              </div>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
                >
                  حفظ التغييرات
                </button>
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
