import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { InputForm } from "@/components/shared/components/InputForm";
import { SelectForm } from "@/components/shared/components/SelectForm";

// تعريف الـ interface للـ props
interface AddPoliceModelProps {
  onClose: () => void;
  onSave?: (values: SessionFormValues) => void;
  initialValues?: SessionFormValues;
  mode?: "add" | "edit";
}

interface SessionFormValues {
  sessionDate: string;
  sessionTime: string;
  lawyer: string;
  decision: string;
}

// Validation Schema
const validationSchema = Yup.object({
  sessionDate: Yup.string().required("تاريخ الجلسة مطلوب"),
  sessionTime: Yup.string().required("وقت الجلسة مطلوب"),
  lawyer: Yup.string().required("اسم المحامي مطلوب"),
  decision: Yup.string().required("قرار الجلسة مطلوب"),
});

// القيم الافتراضية
const defaultValues: SessionFormValues = {
  sessionDate: "",
  sessionTime: "",
  lawyer: "",
  decision: "",
};

function AddPoliceModel({ onClose, onSave, initialValues = defaultValues, mode = "add" }: AddPoliceModelProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSubmit = (values: SessionFormValues) => {
    console.log("تم حفظ بيانات الجلسة:", values);
    if (onSave) {
      onSave(values);
    }
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={true} onOpenChange={handleCloseModal}>
      <DialogContent
        className="sm:max-w-[715px] max-h-[90vh] flex flex-col overflow-hidden sm:px-20 px-6 sm:py-10 py-6 sm:rounded-[24px] rounded-[12px] border-none"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild onClick={handleCloseModal}>
          <button className="absolute top-8 sm:inset-e-15 inset-e-6 text-gray-500 px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 h-12.5 transition-all">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        
        <DialogHeader className="mb-2 mt-15">
          <DialogTitle className="text-2xl font-bold text-center text-[#153A4D]">
            {mode === "add" ? "إضافة جلسة مخفر" : "تعديل جلسة المخفر"}
          </DialogTitle>
        </DialogHeader>

        <Formik<SessionFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 ">
                <InputForm
                  name="sessionDate"
                  label="تاريخ الجلسة"
                  type="date"
                />
                <InputForm
                  name="sessionTime"
                  label="وقت الجلسة"
                  type="time"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="lawyer"
                  label="المحامي المتابع للجلسة"
                  type="text"
                  placeholder="أدخل اسم المحامي"
                />
                <SelectForm
                  name="decision"
                  label="قرار الجلسة"
                  options={[
                    { value: "تم التأجيل", label: "تم التأجيل" },
                    { value: "تم الحضور", label: "تم الحضور" },
                    { value: "انتظار القرار", label: "انتظار القرار" },
                    { value: "تم الصلح", label: "تم الصلح" },
                    { value: "تم الحبس", label: "تم الحبس" },
                  ]}
                />
              </div>

              <button
                type="submit"
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                {mode === "add" ? "إضافة" : "حفظ التعديلات"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddPoliceModel;