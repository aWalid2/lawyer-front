import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/components/shared/components/InputForm";
import type { ExpertData } from "./typesExpert";

interface EditExpertDataDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: ExpertData) => void;
  initialValues: ExpertData;
}

export const EditExpertDataDialog: React.FC<EditExpertDataDialogProps> = ({
  open,
  onClose,
  onSave,
  initialValues,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            تعديل بيانات الخبراء
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <InputForm name="expertName" label="اسم الخبير" type="text" />
                <InputForm name="referralDate" label="تاريخ الإحالة" type="date" />
                <InputForm name="officeLocation" label="مكان المكتب / الدائرة" type="text" />
                <InputForm name="expertType" label="تخصص الخبير" type="text" />
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
