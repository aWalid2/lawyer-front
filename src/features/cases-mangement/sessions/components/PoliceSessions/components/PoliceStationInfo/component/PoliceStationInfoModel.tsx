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
import { InputForm } from "@/shared/components/InputForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";


interface EditModelProps {
  initialValues: FormValues;
  onClose: () => void;
  onSave: (values: FormValues) => void;
  mode?: "add" | "edit";
}

interface FormValues {
  caseTitle: string;
  notes: string;
  clientName: string;
  investigationSource: string;
  caseReceiptDate: string;
}

const validationSchema = Yup.object({
  caseTitle: Yup.string().required("رقم القضية في المخفر مطلوب"),
  notes: Yup.string().required("المخفر التابع له القضية مطلوب"),
  clientName: Yup.string().required("اسم المحقق مطلوب"),
  investigationSource: Yup.string().required("جهة التحقيق المحول منها مطلوبة"),
  caseReceiptDate: Yup.string().required("تاريخ ورود القضية مطلوب"),
});

function PoliceStationInfoModel({ initialValues, onClose, onSave, mode = "add" }: EditModelProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSaveChanges = (values: FormValues) => {
    console.log("تم حفظ التغييرات:", values);
    setIsModalOpen(false);
    onSave(values);
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
            {mode === "add" ? "إضافة بيانات مخفر" : "تعديل بيانات المخفر"}
          </DialogTitle>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSaveChanges}
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="caseTitle"
                  label="رقم القضية في المخفر"
                  type="text"
                  placeholder="رقم القضية في المخفر"
                />
                <InputForm
                  name="clientName"
                  label="اسم المحقق"
                  type="text"
                  placeholder="اسم المحقق"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <TextAreaForm
                  name="notes"
                  label="المخفر التابع له القضية"
                  placeholder="المخفر التابع له القضية"
                />
                <InputForm
                  name="investigationSource"
                  label="جهة التحقيق المحول منها"
                  type="text"
                  placeholder="جهة التحقيق المحول منها"
                />
              </div>

              <InputForm
                name="caseReceiptDate"
                label="تاريخ ورود القضية داخل المكتب"
                type="date"
              />

              <button
                type="submit"
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-main font-bold shadow-lg hover:opacity-90 transition-opacity"
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

export default PoliceStationInfoModel;