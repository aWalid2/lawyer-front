import { Formik, Form } from "formik";
import { useState } from "react";
import type { FormValues } from "../typsePolice";
import { validationSchema } from "../ValidationSchema";
import Frame from "@/public/images/Frame.svg";
import EditModel from "../components/EditModel";
import { InputForm } from "@/components/shared/components/InputForm";

const FormPoliceSessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const initialValues: FormValues = {
    caseTitle: "قضية 123",
    clientName: "أحمد محمد",
    investigationSource: "النيابة العامة",
    caseReceiptDate: "2024-03-20",
    notes: "مخفر الشرطة",
  };

  const handleAddClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (values: FormValues) => {
    if (modalMode === "add") {
      console.log("تم إضافة بيانات جديدة:", values);
    } else {
      console.log("تم تعديل البيانات:", values);
    }
    setIsModalOpen(false);
  };

  const emptyValues: FormValues = {
    caseTitle: "",
    clientName: "",
    investigationSource: "",
    caseReceiptDate: "",
    notes: "",
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <div className="border border-gray-300 p-4 rounded-xl mb-6">
            <div className="flex justify-between items-center pb-8">
              <h1 className="text-xl font-cairo">بيانات المخفر</h1>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddClick}
                  className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-[114px] h-[50px] hover:bg-[#CBA46240] transition-colors duration-200 px-2 sm:w-auto sm:px-4"
                >
                  <span className="text-[16px] font-medium whitespace-nowrap text-[#CBA462]">
                    + إضافة
                  </span>
                </button>

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
            </div>

            <Form>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <InputForm
                    name="caseTitle"
                    type="text"
                    placeholder="رقم القضية في المخفر"
                    label="رقم القضية في المخفر"
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    name="clientName"
                    type="text"
                    placeholder="اسم المحقق"
                    label="اسم المحقق"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <InputForm
                    name="investigationSource"
                    type="text"
                    placeholder="جهة التحقيق المحول منها"
                    label="جهة التحقيق المحول منها"
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    name="caseReceiptDate"
                    type="date"
                    label="تاريخ ورود القضية داخل المكتب"
                  />
                </div>
              </div>

              <div className="flex flex-col" dir="rtl">
                <InputForm
                  name="notes"
                  type="text"
                  placeholder="المخفر التابع له القضية"
                  label="المخفر التابع له القضية"
                />
              </div>
            </Form>

            {isModalOpen && (
              <EditModel
                mode={modalMode}
                initialValues={modalMode === "add" ? emptyValues : values}
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