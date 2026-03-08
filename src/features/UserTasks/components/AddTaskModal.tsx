import { Formik, Form } from "formik";
import close from "../../../../public/images/close.svg";
import { useState } from "react";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const modalClasses = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6",
  backdrop: "absolute inset-0 bg-black/30",
  container: "relative w-full max-w-[520px] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden",
  header: "relative px-5 sm:px-7 pt-5 sm:pt-6 pb-3",
  closeButton: "absolute left-4 top-4 pt-4 px-16 text-gray-400 hover:text-gray-600 transition-colors",
  closeIcon: "w-4 h-4 sm:w-5 sm:h-5",
  title: "text-center text-[15px] pt-10 sm:pt-16 sm:text-base font-semibold text-gray-800",
  body: "px-5 sm:px-7 pt-4 pb-24 sm:pb-28 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto",
  formContainer: "flex flex-col items-center space-y-4",
  fieldWrapper: "w-full max-w-[420px] space-y-1.5",
  label: "block text-xs sm:text-sm font-medium text-gray-700 text-right px-1 pb-4",
  input: "w-full h-10 sm:h-11 rounded-xl bg-[#FBFBFB] border border-transparent px-4 text-right text-sm outline-none focus:ring-2 focus:ring-[#CBA462]/40",
  textarea: "w-full min-h-[80px] sm:min-h-[100px] rounded-xl bg-[#FBFBFB] border border-transparent px-4 py-3 text-right text-sm resize-none outline-none focus:ring-2 focus:ring-[#CBA462]/40",
  select: "w-full h-10 sm:h-11 rounded-xl bg-[#FBFBFB] border border-transparent px-4 text-right text-sm outline-none focus:ring-2 focus:ring-[#CBA462]/40 cursor-pointer",
  footer: "absolute inset-x-0 bottom-0 bg-white px-5 sm:px-7 py-4 border-t border-gray-100",
  submitButton: "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-medium text-white bg-[linear-gradient(to_right,#E3C086,#CBA462)] hover:brightness-95 transition"
};

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
    <div className={modalClasses.overlay}>
      <div className={modalClasses.backdrop} onClick={handleCloseModal} />

      <div dir="rtl" className={modalClasses.container}>
        <div className={modalClasses.header}>
          <button
            type="button"
            className={modalClasses.closeButton}
            aria-label="close"
            onClick={handleCloseModal}
          >
            <img src={close} alt="Close" className={modalClasses.closeIcon} />
          </button>

          <h2 className={modalClasses.title}>
            {initialValues === defaultValues ? "إضافة مهمة جديدة" : "تعديل المهمة"}
          </h2>
        </div>

        <Formik<TaskFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className={modalClasses.body}>
                <div className={modalClasses.formContainer}>
                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      عنوان المهمة
                    </label>
                    <input
                      name="taskTitle"
                      type="text"
                      placeholder="أدخل عنوان المهمة"
                      value={values.taskTitle}
                      onChange={(e) => setFieldValue("taskTitle", e.target.value)}
                      className={`${modalClasses.input} ${
                        errors.taskTitle && touched.taskTitle ? "border-red-500" : ""
                      }`}
                    />
                    {errors.taskTitle && touched.taskTitle && (
                      <div className="text-red-500 text-xs mt-1">{errors.taskTitle}</div>
                    )}
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      المكلف
                    </label>
                    <input
                      name="assignee"
                      type="text"
                      placeholder="أدخل اسم المكلف"
                      value={values.assignee}
                      onChange={(e) => setFieldValue("assignee", e.target.value)}
                      className={`${modalClasses.input} ${
                        errors.assignee && touched.assignee ? "border-red-500" : ""
                      }`}
                    />
                    {errors.assignee && touched.assignee && (
                      <div className="text-red-500 text-xs mt-1">{errors.assignee}</div>
                    )}
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      نوع المهمة
                    </label>
                    <Select
                      value={values.taskType}
                      onValueChange={(value) => setFieldValue("taskType", value)}
                    >
                      <SelectTrigger className={`${modalClasses.select} ${
                        errors.taskType && touched.taskType ? "border-red-500" : ""
                      }`}>
                        <SelectValue placeholder="اختر نوع المهمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="قضية 1">قضية 1</SelectItem>
                        <SelectItem value="قضية 2">قضية 2</SelectItem>
                        <SelectItem value="قضية 3">قضية 3</SelectItem>
                        <SelectItem value="قضية 4">قضية 4</SelectItem>
                        <SelectItem value="قضية 5">قضية 5</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.taskType && touched.taskType && (
                      <div className="text-red-500 text-xs mt-1">{errors.taskType}</div>
                    )}
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      تاريخ التسليم
                    </label>
                    <input
                      name="deliveryDate"
                      type="date"
                      value={values.deliveryDate}
                      onChange={(e) => setFieldValue("deliveryDate", e.target.value)}
                      className={`${modalClasses.input} ${
                        errors.deliveryDate && touched.deliveryDate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.deliveryDate && touched.deliveryDate && (
                      <div className="text-red-500 text-xs mt-1">{errors.deliveryDate}</div>
                    )}
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      ملاحظات
                    </label>
                    <textarea
                      name="notes"
                      placeholder="أدخل ملاحظات إضافية"
                      value={values.notes}
                      onChange={(e) => setFieldValue("notes", e.target.value)}
                      className={modalClasses.textarea}
                    />
                  </div>
                </div>
              </div>

              <div className={modalClasses.footer}>
                <button
                  type="submit"
                  className={modalClasses.submitButton}
                >
                  {initialValues === defaultValues ? "إضافة مستند" : "تحديث المهمة"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddTaskModal;