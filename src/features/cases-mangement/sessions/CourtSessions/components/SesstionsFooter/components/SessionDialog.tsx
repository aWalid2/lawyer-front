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

interface Session {
  id?: number;
  session_date: string;
  court_id: number;
  hall_floor: number;
  hall_number: number;
}

interface SessionDialogProps {
  onSave: (values: Session) => void;
  initialValues?: Session;
  trigger: React.ReactNode;
}

export const SessionDialog: React.FC<SessionDialogProps> = ({
  trigger,
  onSave,
  initialValues,
}) => {
  const defaultValues: Session = {
    id: initialValues?.id,
    session_date: initialValues?.session_date || "",
    court_id: initialValues?.court_id || 1,
    hall_floor: initialValues?.hall_floor || 1,
    hall_number: initialValues?.hall_number || 1,
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
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-main font-semibold flex items-center gap-2 h-12.5 transition-all">
            <XIcon size={23} className="text-gray-500 " />
          </button>
        </DialogClose>
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {initialValues ? "تعديل الجلسة" : "إضافة جلسة"}
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
                  name="session_date"
                  label="تاريخ ووقت الجلسة"
                  type="datetime-local"
                />
                <InputForm
                  name="court_id"
                  label="المحكمة"
                  type="text"
                />
                <InputForm
                  name="hall_floor"
                  label="دور القاعة"
                  type="text"
                />
                <InputForm
                  name="hall_number"
                  label="رقم القاعة"
                  type="text"
                />
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
