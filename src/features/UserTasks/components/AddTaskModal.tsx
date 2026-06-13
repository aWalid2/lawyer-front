import { Formik, Form } from "formik";
import { useState, useCallback } from "react";
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
import { fetchCases } from "../api/service/getCases";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePaginatedOptions } from "@/shared/hooks/usePaginatedOptions";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import { decisionOptions } from "@/shared/constants/procedursOptions";

interface AddTaskModalProps {
  onClose: () => void;
  onSave?: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
  taskId?: string;
  context?: "tasks" | "procedures";
}

interface TaskFormValues {
  task_title: string;
  assigned_to: number;
  task_type: string;
  case_id?: string;
  delivery_date: string;
  status: string;
  notes: string;
  details: string;
  start_date?: string;
  end_date?: string;
}

const validationSchema = Yup.object({
  task_title: Yup.string().required("عنوان المهمة مطلوب"),
  assigned_to: Yup.number()
    .required("المكلف مطلوب")
    .min(1, "يرجى اختيار المكلف"),
  task_type: Yup.string(),
  delivery_date: Yup.string().required("تاريخ التسليم مطلوب"),
  notes: Yup.string(),
  status: Yup.string().required("حالة المهمة مطلوبة"),
});

const defaultValues: TaskFormValues = {
  task_title: "",
  assigned_to: 0,
  task_type: "",
  case_id: "",
  delivery_date: "",
  notes: "",
  status: "",
  details: "",
};

function AddTaskModal({
  onClose,
  onSave,
  initialValues = defaultValues,
  taskId,
  context = "tasks",
}: AddTaskModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isEditMode = !!taskId;

  const { mutate: addTask, isPending: isAdding } = useTaskUser(context);
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const isLoading = isEditMode ? isUpdating : isAdding;

  // ── Users: load all (no API pagination), client-side filtered via showSearch ──
  const { data: usersResponse } = useGetAllUsers();

  const employeeOptions = (usersResponse ?? []).map((user: UserT) => ({
    label: user?.first_name || user?.fullName || `#${user?.id}`,
    value: String(user?.id),
  }));

  // ── Paginated, searchable case options ──
  const [caseSearch, setCaseSearch] = useState("");
  const debouncedCaseSearch = useDebounce(caseSearch, 500);

  const fetchCasePage = useCallback(async (page: number, _search?: string) => {
    const response = await fetchCases(page, 15);
    const list = Array.isArray(response?.data)
      ? response.data
      : (response?.data?.data ?? []);
    return {
      items: list.map((caseItem: any) => ({
        value: String(caseItem.id || caseItem.case_id),
        label:
          caseItem.case_title || `قضية رقم ${caseItem.id || caseItem.case_id}`,
      })),
      totalPages:
        response?.meta?.total_pages ?? response?.data?.meta?.total_pages ?? 1,
    };
  }, []);

  const {
    options: caseOptions,
    hasMoreOptions: caseHasMoreOptions,
    isFetchingMore: caseIsFetchingMore,
    loadNextPage: loadMoreCases,
  } = usePaginatedOptions(fetchCasePage, debouncedCaseSearch);

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
    };
    if (context === "procedures" && submitValues.case_id) {
      apiValues.case_id = Number(submitValues.case_id);
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
          {() => (
            <Form className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pb-2 pl-2">
              <div className="grid grid-cols-1 gap-4">
                <InputForm
                  name="task_title"
                  label="عنوان المهمة"
                  type="text"
                  placeholder="أدخل عنوان المهمة"
                />
                {context === "procedures" && (
                  <SelectForm
                    name="case_id"
                    label="القضية"
                    options={caseOptions}
                    placeholder="اختر القضية"
                    showSearch={true}
                    onSearchChange={setCaseSearch}
                    hasMoreOptions={caseHasMoreOptions}
                    isFetchingMore={caseIsFetchingMore}
                    onReachEnd={loadMoreCases}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <SelectForm
                  name="assigned_to"
                  label="المكلف"
                  options={employeeOptions}
                  placeholder="اختر المكلف"
                  showSearch={true}
                />

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

              <SelectForm
                name="status"
                label="حالة المهمة"
                options={decisionOptions}
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
