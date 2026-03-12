import { InputForm } from "@/components/shared/components/InputForm";
import { TextAreaForm } from "@/components/shared/components/TextAreaForm";
import Frame from "@/public/images/Frame.svg";
import { Form, Formik } from "formik";
import { useState } from "react";
import { EditModelExperts } from "./EditModelExperts";

const CLASSES = {
  formSection: "border border-gray-300 p-4 rounded-xl mb-6",
};

export const FormExperts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    expertReportNumber: "",
    assignedAuthority: "",
    assignmentDate: "",
    expertOfficeName: "",
    taskStartDate: "",
    subjectOfExpertise: "",
    finalOpinion: "",
    reportSubmissionDate: "",
    objections: "",
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = (values: any) => {
    console.log("تم الحفظ:", values);
    setFormValues({
      expertReportNumber: values.expertReportNumber,
      assignedAuthority: values.assignedAuthority,
      assignmentDate: values.assignmentDate,
      expertOfficeName: values.expertOfficeName,
      taskStartDate: values.taskStartDate,
      subjectOfExpertise: values.subjectOfExpertise,
      finalOpinion: values.finalOpinion,
      reportSubmissionDate: values.reportSubmissionDate,
      objections: values.objections,
    });
  };

  const documentForModal = {
    id: "1",
    expertReportNumber: formValues.expertReportNumber,
    assignedAuthority: formValues.assignedAuthority,
    assignmentDate: formValues.assignmentDate,
    expertOfficeName: formValues.expertOfficeName,
    taskStartDate: formValues.taskStartDate,
    subjectOfExpertise: formValues.subjectOfExpertise,
    finalOpinion: formValues.finalOpinion,
    reportSubmissionDate: formValues.reportSubmissionDate,
    objections: formValues.objections,
    type: "experts",
  };

  return (
    <>
      <Formik
        initialValues={formValues}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <div className={CLASSES.formSection}>
            <div className="flex justify-between items-center pb-8">
              <h1 className="text-xl font-cairo">بيانات الخبراء</h1>

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
                <div className="grid md:grid-cols-2 gap-4">
                  <InputForm
                    name="expertReportNumber"
                    label="رقم تقرير الخبير"
                    type="text"
                    placeholder="أدخل رقم تقرير الخبير"
                    disabled
                  />
                  <InputForm
                    name="assignedAuthority"
                    label="الجهة المكلفة"
                    type="text"
                    placeholder="محكمة / نيابة / هيئة تحكيم"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputForm
                    name="assignmentDate"
                    label="تاريخ التكليف"
                    type="date"
                    disabled
                  />
                  <InputForm
                    name="expertOfficeName"
                    label="مكتب الخبراء / الخبير"
                    type="text"
                    placeholder="أدخل اسم مكتب الخبراء"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputForm
                    name="taskStartDate"
                    label="تاريخ مباشرة المهمة"
                    type="date"
                    disabled
                  />
                  <InputForm
                    name="subjectOfExpertise"
                    label="موضوع الخبرة"
                    type="text"
                    placeholder="تقدير تعويض / فحص توقيع / فحص طبي ..."
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputForm
                    name="finalOpinion"
                    label="الرأي النهائي للخبير"
                    type="text"
                    placeholder="ملخص ما انتهى إليه الخبير"
                    disabled
                  />
                  <InputForm
                    name="reportSubmissionDate"
                    label="تاريخ إيداع التقرير"
                    type="date"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <TextAreaForm
                  name="objections"
                  label="الاعتراضات"
                  placeholder="اعتراضات الخصوم على التقرير"
                  disabled
                />
              </div>

              <TextAreaForm
                name="notes"
                label="ملاحظات إضافية"
                placeholder="أدخل أي ملاحظات إضافية عن الخبرة"
                disabled
              />
            </Form>

            <EditModelExperts
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