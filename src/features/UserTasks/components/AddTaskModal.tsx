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
import { SelectForm } from "@/shared/components/SelectForm";
import { TextAreaForm } from "@/shared/components/TextAreaForm";

interface AddTaskModalProps {
  onClose: () => void;
  onSave?: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
}

interface TaskFormValues {
  taskTitle: string;
  assignee: string;
  taskType: string;
  deliveryDate: string;
  notes: string;
}

const validationSchema = Yup.object({
  taskTitle: Yup.string().required("عنوان المهمة مطلوب"),
  assignee: Yup.string().required("المكلف مطلوب"),
  taskType: Yup.string().required("نوع المهمة مطلوب"),
  deliveryDate: Yup.string().required("تاريخ التسليم مطلوب"),
  notes: Yup.string(),
});

const defaultValues: TaskFormValues = {
  taskTitle: "",
  assignee: "",
  taskType: "",
  deliveryDate: "",
  notes: "",
};

function AddTaskModal({ onClose, onSave, initialValues = defaultValues }: AddTaskModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSubmit = (values: TaskFormValues) => {
    console.log("تم حفظ المهمة:", values);
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
            {initialValues === defaultValues ? "إضافة مهمة جديدة" : "تعديل المهمة"}
          </DialogTitle>
        </DialogHeader>

        <Formik<TaskFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pl-2 pb-2">
              <div className="grid grid-cols-1  gap-4">
                <InputForm
                  name="taskTitle"
                  label="عنوان المهمة"
                  type="text"
                  placeholder="أدخل عنوان المهمة"
                />
                <InputForm
                  name="assignee"
                  label="المكلف"
                  type="text"
                  placeholder="أدخل اسم المكلف"
                />
              </div>

              <div className="grid grid-cols-1 ">
                <SelectForm
                  name="taskType"
                  label="نوع المهمة"
                  options={[
                    { value: "قضية 1", label: "قضية 1" },
                    { value: "قضية 2", label: "قضية 2" },
                    { value: "قضية 3", label: "قضية 3" },
                    { value: "قضية 4", label: "قضية 4" },
                    { value: "قضية 5", label: "قضية 5" },
                  ]}
                />
                <InputForm
                  name="deliveryDate"
                  label="تاريخ التسليم"
                  type="date"
                />
              </div>

              <TextAreaForm
                name="notes"
                label="ملاحظات (اختياري)"
                placeholder="أدخل ملاحظات إضافية"
              />

              <button
                type="submit"
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                {initialValues === defaultValues ? "إضافة مهمة" : "حفظ التعديلات"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;