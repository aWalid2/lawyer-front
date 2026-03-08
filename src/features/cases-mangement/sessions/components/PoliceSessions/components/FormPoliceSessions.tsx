import { Formik, Form, Field } from "formik";
import { useState } from "react";
import type { FormValues } from "../typsePolice";
import { validationSchema } from "../ValidationSchema";
import Frame from "../../../../../../../public/images/Frame.svg";
import EditModel from "../components/EditModel";


// ثوابت الكلاسات (كما هي بدون أي تغيير)
const CLASSES = {
  inputBase: "w-full border rounded-md p-2 bg-[#FBFBFB]",
  inputMedium: "h-10 md:h-[50px]",
  inputLarge: "h-[50px]",
  inputField: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px]",
  inputFieldLarge: "w-full border rounded-md p-2 bg-[#FBFBFB] h-[50px]",
  selectTrigger:
    "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] flex items-center justify-between",
  selectContent: "bg-white z-50 w-full",
  uploadContainer:
    "border border-gray-300 border-dashed border-2 rounded-xl bg-[#FBFBFB] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition",
  uploadBox: "w-[150px] h-[125px]",
  uploadBoxSmall: "w-24 md:w-[150px] h-24 md:h-[125px]",
  uploadText: "text-sm text-gray-400 flex flex-col gap-2",
  uploadTextSmall:
    "text-xs md:text-sm text-gray-400 flex flex-col gap-1 md:gap-2 px-2",
  fieldWithIcon:
    "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] pr-10",
  formSection: "border border-gray-300 p-4 rounded-xl mb-6",
  flexRow: "flex flex-col md:flex-row gap-3",
  flexBetween: "flex justify-between items-center",
  sectionPadding: "pt-3 md:pt-5",
  largeSectionPadding: "pt-8 md:pt-14",
  extraLargeSectionPadding: "pt-16",
  labelText: "block mb-5 text-sm",
  sectionTitle: "text-base md:text-lg",
  submitButton:
    "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};

const FormPoliceSessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const validationSchem = validationSchema;

  const initialValues: FormValues = {
    // فقط الحقول الموجودة في الفورم
    caseTitle: "", // رقم القضية في المخفر
    clientName: "", // اسم المحقق
    investigationSource: "", // جهة التحقيق المحول منها
    caseReceiptDate: "", // تاريخ ورود القضية داخل المكتب
    notes: "", // المخفر التابع له القضية
  };

  // دوال التحكم في المودال
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (values: FormValues) => {
    console.log("تم حفظ التغييرات:", values);
    setIsModalOpen(false);
    // هنا يمكنك تحديث قيم الفورم بالقيم الجديدة إذا أردت
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchem}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <div className={CLASSES.formSection}>
            <div className="flex justify-between items-center pb-8 ">
              <h1 className="text-xl font-cairo">بيانات المخفر</h1>

              <button
                type="button"
                onClick={handleEditClick}
                className="flex shrink-0 items-center justify-center gap-2 bg-[#F1F1F3] rounded-md w-[114px] h-[50px] hover:bg-[#E1E1E6] transition-colors duration-200 px-2 sm:w-auto sm:px-4"
              >
                <img src={Frame} alt="" className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="text-[16px] font-medium whitespace-nowrap">
                  تعديل
                </span>
              </button>
            </div>

            <Form>
              {/* رقم القضية + اسم المحقق */}
              <div className={CLASSES.flexRow + " mb-4"}>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>
                    رقم القضية في المخفر
                  </label>
                  <Field
                    name="caseTitle"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="رقم القضية في المخفر"
                  />
                </div>

                <div className="flex-1">
                  <label className={CLASSES.labelText}>اسم المحقق</label>
                  <Field
                    name="clientName"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="اسم المحقق"
                  />
                </div>
              </div>

              {/* جهة التحقيق + تاريخ ورود القضية */}
              <div className={CLASSES.flexRow + " mb-4"}>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>
                    جهة التحقيق المحول منها
                  </label>
                  <Field
                    name="investigationSource"
                    type="text"
                    className={CLASSES.inputField}
                    placeholder="جهة التحقيق المحول منها"
                  />
                </div>

                <div className="flex-1">
                  <label className={CLASSES.labelText}>
                    تاريخ ورود القضية داخل المكتب
                  </label>
                  <Field
                    name="caseReceiptDate"
                    type="date"
                    className={`${CLASSES.inputField} appearance-none text-left`}
                  />
                </div>
              </div>

              {/* المخفر التابع له القضية */}
              <div className="flex flex-col" dir="rtl">
                <h1 className={`${CLASSES.sectionTitle} pb-3 md:pb-5 text-right`}>
                  المخفر التابع له القضية
                </h1>
                <Field
                  name="notes"
                  as="textarea"
                  className="w-full border rounded-md p-2 text-sm bg-[#FBFBFB] h-[50px] resize-none text-right"
                  placeholder="المخفر التابع له القضية"
                />
              </div>
            </Form>

            {/* Modal التعديل */}
            {isModalOpen && (
              <EditModel
                initialValues={values}
                onClose={handleCloseModal}
                onSave={handleSaveChanges}
              />
            )}
          </div>
        )}
      </Formik>
    </>
  );
};

export default FormPoliceSessions;