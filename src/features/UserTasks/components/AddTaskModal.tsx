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
import { useTaskUser } from "./api/hooks/useAddTask";

interface AddTaskModalProps {
  onClose: () => void;
  onSave?: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
}

interface TaskFormValues {
  task_title: string;
  assigned_to: number;
  task_type: string;
  delivery_date: string;
  status: string;
  notes: string;
}

const validationSchema = Yup.object({
  task_title: Yup.string().required("عنوان المهمة مطلوب"),
  assigned_to: Yup.number().required("المكلف مطلوب"),
  task_type: Yup.string().required("نوع المهمة مطلوب"),
  delivery_date: Yup.string().required("تاريخ التسليم مطلوب"),
  notes: Yup.string(),
  status: Yup.string().required("حالة المهمة مطلوبة"),
});

const defaultValues: TaskFormValues = {
  task_title: "",
  assigned_to: 0,
  task_type: "",
  delivery_date: "",
  notes: "",
  status: "",
};

function AddTaskModal({ onClose, onSave, initialValues = defaultValues }: AddTaskModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { mutate: addTask, isPending } = useTaskUser(); // استخدام الـ hook

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSubmit = (values: TaskFormValues) => {
    console.log("تم حفظ المهمة:", values);
    
    // استخدام mutation لإضافة المهمة
    addTask(values, {
      onSuccess: () => {
        if (onSave) {
          onSave(values);
        }
        setIsModalOpen(false);
        onClose();
      },
      onError: (error) => {
        console.error("خطأ في إضافة المهمة:", error);
      }
    });
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
              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="task_title"
                  label="عنوان المهمة"
                  type="text"
                  placeholder="أدخل عنوان المهمة"
                />
                <InputForm
                  name="assigned_to"
                  label="المكلف"
                  type="number"
                  placeholder="أدخل اسم المكلف"
                />
              </div>

              <div className="grid grid-cols-1">
                <SelectForm
                  name="task_type"
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
                  name="delivery_date"
                  label="تاريخ التسليم"
                  type="date"
                />
              </div>

              <TextAreaForm
                name="notes"
                label="ملاحظات (اختياري)"
                placeholder="أدخل ملاحظات إضافية"
              />

              <SelectForm
                name="status"
                label="حالة المهمة"
                options={[
                  { value: " in_progress", label: "قيد التنفيذ" },
                  { value: "pending", label: "قيد الانتظار" },
                  { value: "done", label: "مُنجزة" },
                  { value: "late", label: "متأخرة" },
                ]}
              />

              <button
                type="submit"
                disabled={isPending}
                className="bg-primary-gradient text-white px-8 py-2.5 w-full mt-4 rounded-[12px] font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending 
                  ? "جاري الإضافة..." 
                  : initialValues === defaultValues 
                    ? "إضافة مهمة" 
                    : "حفظ التعديلات"
                }
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;