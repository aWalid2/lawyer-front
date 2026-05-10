import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputForm } from "@/shared/components/InputForm";
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
    caseId: initialValues?.caseId || 0,
    caseSequence: initialValues?.caseSequence || "",
    reference_number: initialValues?.reference_number || "",
    sessionDate: initialValues?.sessionDate || "",
    courtName: initialValues?.courtName || "",
    sessionSource: initialValues?.sessionSource || "",
    clientName: initialValues?.clientName || "",
    client_status: initialValues?.client_status || "",
    opponents: initialValues?.opponents || [],
    caseTitle: initialValues?.caseTitle || "",
    caseTypeName: initialValues?.caseTypeName || "",
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
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-193 sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-400 transition-all outline-none sm:inset-e-15">
            <XIcon size={23} />
          </button>
        </DialogClose>
        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
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
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <InputForm
                  name="sessionDateTime"
                  label="تاريخ ووقت الجلسة"
                  type="text"
                />
                <InputForm name="hallNumber" label="رقم القاعة" type="text" />
                <InputForm name="hallFloor" label="دور القاعة" type="text" />
                <InputForm name="rollNumber" label="رقم الدور" type="text" />
                <div className="md:col-span-2">
                  <InputForm name="decision" label="القرار" type="text" />
                </div>
              </div>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-primary-gradient rounded-main font-cairo mt-4 w-full px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
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
