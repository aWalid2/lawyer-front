import { Formik, Form, Field } from "formik";
import close from "../../../../../public/images/close.svg";
import { useState, useEffect } from "react";
import { validationSchema } from "./ValidationSchema";

// تعريف الـ interface للـ props
interface EditModelProps {
  initialValues: FormValues;
  onClose: () => void;
  onSave: (values: FormValues) => void;
}

interface FormValues {
  caseTitle: string;
  notes: string;
  clientName: string;
  investigationSource: string;
  caseReceiptDate: string;
}

// تعريف CSS classes مجمعة
const modalClasses = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6",
  backdrop: "absolute inset-0 bg-black/30",
  container: "relative w-full max-w-[520px] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden",
  header: "relative px-5 sm:px-7 pt-5 sm:pt-6 pb-3",
  closeButton: "absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition-colors",
  closeIcon: "w-4 h-4 sm:w-5 sm:h-5",
  title: "text-center text-[15px] pt-10 sm:pt-12 sm:text-base font-semibold text-gray-800",
  body: "px-5 sm:px-7 pt-4 pb-24 sm:pb-28 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto",
  formContainer: "flex flex-col items-center space-y-4",
  fieldWrapper: "w-full max-w-[420px] space-y-1.5",
  label: "block text-xs sm:text-sm font-medium text-gray-700 text-right px-1 pb-4",
  input: "w-full h-10 sm:h-11 rounded-xl bg-[#FBFBFB] border border-transparent px-4 text-right text-sm outline-none focus:ring-2 focus:ring-[#CBA462]/40",
  textarea: "w-full min-h-[80px] sm:min-h-[100px] rounded-xl bg-[#FBFBFB] border border-transparent px-4 py-3 text-right text-sm resize-none outline-none focus:ring-2 focus:ring-[#CBA462]/40",
  footer: "absolute inset-x-0 bottom-0 bg-white px-5 sm:px-7 py-4 border-t border-gray-100",
  submitButton: "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-medium text-white bg-[linear-gradient(to_right,#E3C086,#CBA462)] hover:brightness-95 transition"
};

function EditModel({ initialValues, onClose, onSave }: EditModelProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const validationSchem = validationSchema;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose(); // استدعاء onClose من props
  };

  const handleSaveChanges = (values: FormValues) => {
    console.log("تم حفظ التغييرات:", values);
    setIsModalOpen(false);
    onSave(values); // استدعاء onSave من props مع القيم الجديدة
  };

  if (!isModalOpen) return null;

  return (
    <div className={modalClasses.overlay}>
      <div
        className={modalClasses.backdrop}
      />

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
            تعديل بيانات المخفر
          </h2>
        </div>

        <Formik<FormValues>
          initialValues={initialValues} // استخدام initialValues من props
          validationSchema={validationSchem}
          onSubmit={handleSaveChanges}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className={modalClasses.body}>
                <div className={modalClasses.formContainer}>
                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      رقم القضية في المخفر
                    </label>
                    <Field
                      name="caseTitle"
                      type="text"
                      className={modalClasses.input}
                        placeholder="رقم القضية في المخفر"
                    />
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      المخفر التابع له القضية
                    </label>
                    <Field
                      name="notes"
                      as="textarea"
                      className={modalClasses.textarea}
                        placeholder="المخفر التابع له القضية"
                    />
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      اسم المحقق
                    </label>
                    <Field
                      name="clientName"
                      type="text"
                      className={modalClasses.input}
                        placeholder="اسم المحقق"
                    />
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      جهة التحقيق المحول منها
                    </label>
                    <Field
                      name="investigationSource"
                      type="text"
                      className={modalClasses.input}
                        placeholder="جهة التحقيق المحول منها"
                    />
                  </div>

                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      تاريخ ورود القضية داخل المكتب
                    </label>
                    <Field
                      name="caseReceiptDate"
                      type="date"
                      className={modalClasses.input}
                        placeholder="تاريخ ورود القضية داخل المكتب"
                    />
                  </div>
                </div>
              </div>

              <div className={modalClasses.footer}>
                <button
                  type="submit"
                  className={modalClasses.submitButton}
                >
                  إضافة
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditModel;