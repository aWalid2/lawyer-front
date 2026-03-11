import { InputForm } from "@/components/shared/components/InputForm";
import { TextAreaForm } from "@/components/shared/components/TextAreaForm";
import Frame from "@/public/images/Frame.svg";
import { Form, Formik } from "formik";
import { useState } from "react";
import { EditModelExpenses } from "./EditModelExpenses";

const CLASSES = {
  formSection: "border border-gray-300 p-4 rounded-xl mb-6",

};

export const FormExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    caseReceiptDate: "",
    receiptStatus: "",
    caseType: "",
    caseStatus: "",
    currentDegree: "",
    fees: "",
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = (values: any) => {
    console.log("تم الحفظ:", values);
    // هنا بتحدث القيم في الفورم الرئيسي
    setFormValues({
      caseReceiptDate: values.caseReceiptDate,
      receiptStatus: values.receiptStatus,
      caseType: values.caseType,
      caseStatus: values.caseStatus,
      currentDegree: values.currentDegree,
      fees: values.fees,
    });
  };

  // تحضير الـ document object للمودال
  const documentForModal = {
    id: "1",
    caseReceiptDate: formValues.caseReceiptDate,
    receiptStatus: formValues.receiptStatus,
    caseType: formValues.caseType,
    caseStatus: formValues.caseStatus,
    currentDegree: formValues.currentDegree,
    fees: formValues.fees,
    type: "cases",
  };

  return (
    <>
      <Formik
        initialValues={formValues}
        enableReinitialize // عشان الفورم يتحدث لما يتغير formValues
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <div className={CLASSES.formSection}>
            <div className="flex justify-between items-center pb-8 ">
              <h1 className="text-xl font-cairo">بيانات المصاريف</h1>

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
              <div className="mb-4">
                <div className="grid  md:grid-cols-2 gap-4">
                  <InputForm
                    name="caseReceiptDate"
                    label="تاريخ ورود القضية"
                    type="date"
                    disabled
                  />
                  <InputForm
                    name="receiptStatus"
                    label="وضع القضية عند الاستلام"
                    type="text"
                    placeholder="أدخل وضع القضية عند الاستلام"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputForm
                    name="caseType"
                    label="نوع القضية"
                    type="text"
                    placeholder="أدخل نوع القضية"
                    disabled
                  />
                  <InputForm
                    name="caseStatus"
                    label="حالة القضية"
                    type="text"
                    placeholder="أدخل حالة القضية"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputForm
                    name="currentDegree"
                    label="درجة التقاضي الحالية"
                    type="text"
                    placeholder="أدخل درجة التقاضي الحالية"
                    disabled
                  />
                  <InputForm
                    name="fees"
                    label="الاتعاب"
                    type="text"
                    placeholder="أدخل قيمة الاتعاب"
                    disabled
                  />
                </div>
              </div>

              <TextAreaForm
                name="notes"
                label="ملاحظات"
                placeholder="أدخل أي ملاحظات إضافية"
                disabled
              />
            </Form>

            {/* Modal واحد بس وبالطريقة الصحيحة */}
            <EditModelExpenses
              document={documentForModal}
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              onSave={handleSaveChanges}
            />
          </div>
        )}
      </Formik>
    </>
  );
};