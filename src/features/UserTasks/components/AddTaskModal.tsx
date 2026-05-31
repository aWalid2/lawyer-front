import { Formik, Form } from "formik";
import { useState, useMemo } from "react";
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
import type { UserT } from "@/features/settings/users/types/userT";
import { useTaskUser } from "../api/hooks/useAddTask";
import { useUpdateTask } from "../api/hooks/useUpdateTask";
import { useFetchCases } from "../api/hooks/useGetCase";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";

interface AddTaskModalProps {
  onClose: () => void;
  onSave?: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
  taskId?: string;
}

interface TaskFormValues {
  task_title: string;
  assigned_to: number;
  task_type: string;
  delivery_date: string;
  status: string;
  notes: string;
  details: string;
  start_date: string;
  end_date: string;
  task_relation?: string;
}

const validationSchema = Yup.object({
  task_title: Yup.string().required("عنوان المهمة مطلوب"),
  assigned_to: Yup.number()
    .required("المكلف مطلوب")
    .min(1, "يرجى اختيار المكلف"),
  task_type: Yup.string().when("task_relation", {
    is: "case",
    then: (schema) => schema.required("نوع المهمة مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  delivery_date: Yup.string().required("تاريخ التسليم مطلوب"),
  notes: Yup.string(),
  details: Yup.string().required("تفاصيل المهمة مطلوبة"),
  start_date: Yup.string().required("تاريخ بدء المهمة مطلوب"),
  end_date: Yup.string().required("تاريخ انتهاء المهمة مطلوب"),
  status: Yup.string().required("حالة المهمة مطلوبة"),
  task_relation: Yup.string().required("يرجى اختيار نوع المهمة"),
});

const defaultValues: TaskFormValues = {
  task_title: "",
  assigned_to: 0,
  task_type: "",
  delivery_date: "",
  notes: "",
  status: "",
  details: "",
  start_date: "",
  end_date: "",
  task_relation: "case",
};

function AddTaskModal({
  onClose,
  onSave,
  initialValues = defaultValues,
  taskId,
}: AddTaskModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isEditMode = !!taskId;

  const { mutate: addTask, isPending: isAdding } = useTaskUser();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { data: usersResponse, isPending: isUsersLoading } = useGetAllUsers();
  const { data: cases, isPending: isCasesLoading } = useFetchCases();

  const isLoading = isEditMode ? isUpdating : isAdding;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSubmit = (values: TaskFormValues) => {
    const submitValues = { ...values };

    if (submitValues.delivery_date) {
      submitValues.delivery_date = new Date(
        submitValues.delivery_date,
      ).toISOString();
    }
    if (submitValues.start_date) {
      submitValues.start_date = new Date(submitValues.start_date).toISOString();
    }
    if (submitValues.end_date) {
      submitValues.end_date = new Date(submitValues.end_date).toISOString();
    }

    const apiValues: any = {
      task_title: submitValues.task_title,
      assigned_to: submitValues.assigned_to,
      delivery_date: submitValues.delivery_date,
      status: submitValues.status,
      notes: submitValues.notes,
      details: submitValues.details,
      start_date: submitValues.start_date,
      end_date: submitValues.end_date,
    };

    if (values.task_relation === "case") {
      apiValues.task_type = submitValues.task_type;
    } else {
      apiValues.task_type = submitValues.task_type;
    }

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
      addTask(apiValues, {
        onSuccess: () => {
          if (onSave) onSave(submitValues);
          setIsModalOpen(false);
          onClose();
        },
        onError: (error) => console.error("خطأ في إضافة المهمة:", error),
      });
    }
  };

  const employeeOptions =
    usersResponse?.map((user: UserT) => ({
      label: user?.first_name || user?.fullName || `#${user?.id}`,
      value: String(user?.id),
    })) || [];

  const CaseOptions = useMemo(() => {
    if (!cases?.data || cases.data.length === 0) return [];
    return cases.data.map((caseItem: any) => ({
      value: String(caseItem.id || caseItem.case_id),
      label:
        caseItem.case_title || `قضية رقم ${caseItem.id || caseItem.case_id}`,
    }));
  }, [cases]);

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
            {isEditMode ? "تعديل المهمة" : "إضافة مهمة جديدة"}
          </DialogTitle>
        </DialogHeader>

        <Formik<TaskFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="task_relation"
                  label="نوع المهمة"
                  options={[
                    { value: "case", label: "المهمة تابعة للقضايا" },
                    { value: "non_case", label: "المهمة غير تابعة للقضايا" },
                  ]}
                  placeholder="اختر نوع المهمة"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="task_title"
                  label="عنوان المهمة"
                  type="text"
                  placeholder="أدخل عنوان المهمة"
                />

                <SelectForm
                  name="assigned_to"
                  label="المكلف"
                  options={employeeOptions}
                  placeholder={
                    isUsersLoading ? "جاري تحميل المستخدمين..." : "اختر المكلف"
                  }
                  disabled={isUsersLoading || employeeOptions.length === 0}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {values.task_relation === "case" ? (
                  <SelectForm
                    name="task_type"
                    label="القضية"
                    options={CaseOptions}
                    placeholder={
                      isCasesLoading ? "جاري تحميل القضايا..." : "اختر القضية"
                    }
                    disabled={isCasesLoading || CaseOptions.length === 0}
                  />
                ) : (
                  <InputForm
                    name="task_type"
                    label="نوع المهمة"
                    type="text"
                    placeholder="أدخل نوع المهمة"
                  />
                )}

                <InputForm
                  name="delivery_date"
                  label="تاريخ التسليم"
                  type="date"
                />
              </div>

              <TextAreaForm
                name="notes"
                label="ملاحظات"
                placeholder="أدخل ملاحظات إضافية"
              />
              <TextAreaForm
                name="details"
                label="تفاصيل المهمة"
                placeholder="أدخل تفاصيل إضافية"
              />

              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="start_date"
                  label="تاريخ بدء المهمة"
                  type="date"
                />
                <InputForm
                  name="end_date"
                  label="تاريخ انتهاء المهمة"
                  type="date"
                />
              </div>

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
                disabled={isLoading}
                className="bg-primary-gradient mt-4 w-full rounded-[12px] px-8 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? "جاري الحفظ..."
                  : isEditMode
                    ? "حفظ التغييرات"
                    : "إضافة مهمة"}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
