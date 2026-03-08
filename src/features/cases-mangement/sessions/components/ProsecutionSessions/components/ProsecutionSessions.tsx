import { Formik, Form, Field } from "formik";
import Frame from "@/public/images/Frame.svg";
import { useState } from "react";
import type { FormValues } from "./typseProsecution";
import { validationSchema } from "./ValidationSchema";
import EditModelProsecution from "./EditModelProsecution";

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
  labelText: "block mb-1 text-sm text-gray-700 pb-3",
  sectionTitle: "text-base md:text-lg font-semibold",
  submitButton:
    "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
  errorText: "text-red-500 text-xs mt-1",
};

const ProsecutionSessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    caseNumberInProsecution: "", // رقم القضية في النيابة
    prosecutionName: "", // النيابة
    prosecutionRegistrationDate: "", // تاريخ تسجيل القضية داخل النيابة
    policeStation: "", // المخفر التابع له القضية
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (values: FormValues) => {
    setFormValues(values);
    console.log("تم تحديث القيم:", values);
    setIsModalOpen(false);
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <div className={CLASSES.formSection}>
            <div className="flex justify-between items-center pb-8">
              <h1 className="text-[18px] font-cairo">بيانات النيابة العامة</h1>

              <button
                type="button"
                onClick={handleOpenModal}
                className="flex shrink-0 items-center justify-center gap-2 bg-[#F1F1F3] rounded-md w-[114px] h-[50px] hover:bg-[#E1E1E6] transition-colors duration-200 px-2 sm:w-auto sm:px-4"
              >
                <img src={Frame} alt="" className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="text-[16px] font-medium whitespace-nowrap">
                  تعديل
                </span>
              </button>
            </div>

            <Form>
              {/* رقم القضية في النيابة - بمفرده في صف كامل */}
              <div className="mb-4">
                <label className={CLASSES.labelText}>
                  رقم القضية داخل النيابة:
                </label>
                <Field
                  name="caseNumberInProsecution"
                  type="text"
                  value={formValues.caseNumberInProsecution}
                  className={`${CLASSES.inputField} ${errors.caseNumberInProsecution && touched.caseNumberInProsecution ? "border-red-500" : ""
                    }`}
                  placeholder="أدخل رقم القضية في النيابة"
                  disabled
                />
                {errors.caseNumberInProsecution && touched.caseNumberInProsecution && (
                  <div className={CLASSES.errorText}>{errors.caseNumberInProsecution}</div>
                )}
              </div>

              {/* النيابة + تاريخ تسجيل القضية في النيابة */}
              <div className={CLASSES.flexRow + " mb-4"}>
                <div className="flex-1">
                  <label className={CLASSES.labelText}>
                    النيابة:
                  </label>
                  <Field
                    name="prosecutionName"
                    type="text"
                    value={formValues.prosecutionName}
                    className={`${CLASSES.inputField} ${errors.prosecutionName && touched.prosecutionName ? "border-red-500" : ""
                      }`}
                    placeholder="اسم النيابة"
                    disabled
                  />
                  {errors.prosecutionName && touched.prosecutionName && (
                    <div className={CLASSES.errorText}>{errors.prosecutionName}</div>
                  )}
                </div>

                <div className="flex-1">
                  <label className={CLASSES.labelText}>
                    تاريخ تسجيل القضية داخل النيابة:
                  </label>
                  <Field
                    name="prosecutionRegistrationDate"
                    type="date"
                    value={formValues.prosecutionRegistrationDate}
                    className={`${CLASSES.inputField} appearance-none text-right ${errors.prosecutionRegistrationDate && touched.prosecutionRegistrationDate ? "border-red-500" : ""
                      }`}
                    disabled
                  />
                  {errors.prosecutionRegistrationDate && touched.prosecutionRegistrationDate && (
                    <div className={CLASSES.errorText}>{errors.prosecutionRegistrationDate}</div>
                  )}
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>

      {/* موديل التعديل */}
      {isModalOpen && (
        <EditModelProsecution
          initialValues={formValues}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
    </>
  );
};

export default ProsecutionSessions;