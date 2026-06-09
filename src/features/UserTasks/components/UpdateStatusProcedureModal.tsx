import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectForm } from "@/shared/components/SelectForm";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { decisionOptions } from "@/shared/constants/procedursOptions";

interface UpdateStatusProcedureModalProps {
  onClose: () => void;
  onSave: (status: string) => void;
  initialStatus: string;
}

interface FormValues {
  status: string;
}

const validationSchema = Yup.object({
  status: Yup.string().required("حالة الإجراء مطلوبة"),
});

export const UpdateStatusProcedureModal: React.FC<
  UpdateStatusProcedureModalProps
> = ({ onClose, onSave, initialStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSubmit = (values: FormValues) => {
    onSave(values.status);
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={true} onOpenChange={handleCloseModal}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] border-none px-6 py-6 sm:max-w-[715px] sm:rounded-[24px] sm:px-20 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={handleCloseModal}>
          <button className="absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 rounded-[12px] px-6 py-2.5 font-semibold text-gray-500 transition-all sm:inset-e-15">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>

        <DialogHeader className="mt-15 mb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            تحديث حالة الإجراء
          </DialogTitle>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={{ status: initialStatus }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <SelectForm
                name="status"
                label="حالة الإجراء"
                options={decisionOptions}
              />

              <button
                type="submit"
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
              >
                حفظ
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
