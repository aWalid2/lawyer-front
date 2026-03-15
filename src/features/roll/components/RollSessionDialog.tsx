import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/components/shared/components/InputForm";
import { XIcon } from "lucide-react";
import React from "react";
import { Formik, Form } from "formik";
import type { RollSession } from "../types";

interface RollSessionDialogProps {
  onSave: (values: RollSession) => void;
  initialValues?: RollSession;
  trigger: React.ReactNode;
}

export const RollSessionDialog: React.FC<RollSessionDialogProps> = ({
  trigger,
  onSave,
  initialValues,
}) => {
  const defaultValues: RollSession = {
    id: initialValues?.id || "",
    sessionDateTime: initialValues?.sessionDateTime || "",
    hallNumber: initialValues?.hallNumber || "",
    hallFloor: initialValues?.hallFloor || "",
    rollNumber: initialValues?.rollNumber || "",
    decision: initialValues?.decision || "",
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
            {initialValues ? "تعديل الجلسة" : "إضافة جلسة جديدة"}
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
                <InputForm
                  name="sessionDateTime"
                  label="تاريخ ووقت الجلسة"
                  type="text"
                />
                <InputForm
                  name="hallNumber"
                  label="رقم القاعة"
                  type="text"
                />
                <InputForm
                  name="hallFloor"
                  label="دور القاعة"
                  type="text"
                />
                <InputForm
                  name="rollNumber"
                  label="رقم الدور"
                  type="text"
                />
                <div className="md:col-span-2">
                    <InputForm
                    name="decision"
                    label="القرار"
                    type="text"
                    />
                </div>
              </div>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity font-cairo"
                >
                  {initialValues ? "حفظ التغييرات" : "إضافة الجلسة"}
                </button>
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
