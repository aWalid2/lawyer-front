import { Formik, Form, Field } from "formik";
import close from "../../../../../../../public/images/close.svg";
import { useState } from "react";
import { validationSchema } from "./ValidationSchema";
import type { FormValues } from "./typseProsecution";

// تعريف الـ interface للـ props
interface EditModelProps {
  initialValues: FormValues;  // الآن يستخدم FormValues الكامل
  onClose: () => void;
  onSave: (values: FormValues) => void;
}

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
  footer: "absolute inset-x-0 bottom-0 bg-white px-5 sm:px-7 py-4 border-t border-gray-100",
  submitButton: "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-medium text-white bg-[linear-gradient(to_right,#E3C086,#CBA462)] hover:brightness-95 transition"
};

function EditModelProsecution({ initialValues, onClose, onSave }: EditModelProps) {
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
            تعديل بيانات النيابة
          </h2>
        </div>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSaveChanges}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <div className={modalClasses.body}>
                <div className={modalClasses.formContainer}>
                  {/* النيابة */}
                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      النيابة
                    </label>
                    <Field
                      name="prosecutionName"
                      type="text"
                      className={`${modalClasses.input} ${errors.prosecutionName && touched.prosecutionName ? "border-red-500" : ""
                        }`}
                      placeholder="النيابة"
                    />
                    {errors.prosecutionName && touched.prosecutionName && (
                      <div className="text-red-500 text-xs mt-1">{errors.prosecutionName}</div>
                    )}
                  </div>

                  {/* رقم القضية في النيابة */}
                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      رقم القضية في النيابة
                    </label>
                    <Field
                      name="caseNumberInProsecution"
                      type="text"
                      className={`${modalClasses.input} ${errors.caseNumberInProsecution && touched.caseNumberInProsecution ? "border-red-500" : ""
                        }`}
                      placeholder="رقم القضية في النيابة"
                    />
                    {errors.caseNumberInProsecution && touched.caseNumberInProsecution && (
                      <div className="text-red-500 text-xs mt-1">{errors.caseNumberInProsecution}</div>
                    )}
                  </div>

                  {/* تاريخ تسجيل القضية داخل النيابة */}
                  <div className={modalClasses.fieldWrapper}>
                    <label className={modalClasses.label}>
                      تاريخ تسجيل القضية داخل النيابة
                    </label>
                    <Field
                      name="prosecutionRegistrationDate"
                      type="date"
                      className={`${modalClasses.input} ${errors.prosecutionRegistrationDate && touched.prosecutionRegistrationDate ? "border-red-500" : ""
                        }`}
                    />
                    {errors.prosecutionRegistrationDate && touched.prosecutionRegistrationDate && (
                      <div className="text-red-500 text-xs mt-1">{errors.prosecutionRegistrationDate}</div>
                    )}
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

export default EditModelProsecution;