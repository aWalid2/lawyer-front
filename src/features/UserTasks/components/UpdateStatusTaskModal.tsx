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
import { useUpdateTask } from "../api/hooks/useUpdateTask";

interface UpdateStatusTaskModalProps {
  onClose: () => void;
  onSave?: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
  taskId?: string;
}

interface TaskFormValues {
  status: string;
}

const validationSchema = Yup.object({
  status: Yup.string().required("حالة المهمة مطلوبة"),
});

const defaultValues: TaskFormValues = {
  status: "",
};

function UpdateStatusTaskModal({
  onClose,
  onSave,
  initialValues = defaultValues,
  taskId,
}: UpdateStatusTaskModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isEditMode = !!taskId;

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSubmit = (values: TaskFormValues) => {
    const submitValues = { ...values };

    const apiValues: any = {
      status: submitValues.status,
    };

    if (isEditMode && taskId) {
      updateTask(
        { id: taskId, data: apiValues },
        {
          onSuccess: () => {
            if (onSave) onSave(submitValues);
            setIsModalOpen(false);
            onClose();
          },
          onError: (error) => console.error("خطأ في تعديل المهمة:", error),
        },
      );
    } else {
      // Handle create task logic here if needed
      console.log("Create task with values:", apiValues);
      setIsModalOpen(false);
      onClose();
    }
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
            تعديل حالة المهمة
          </DialogTitle>
        </DialogHeader>

        <Formik<TaskFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <SelectForm
                name="status"
                label="حالة المهمة"
                options={[
                  { value: "in_progress", label: "قيد التنفيذ" },
                  { value: "pending", label: "قيد الانتظار" },
                  { value: "done", label: "مُنجزة" },
                  { value: "late", label: "متأخرة" },
                ]}
              />

              <button
                type="submit"
                disabled={isUpdating}
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateStatusTaskModal;
