
import { useState } from "react";
import { EditModelExperts } from "../EditModelExperts";
import { ExpertsSessionBox } from "./components/ExpertsSessionBox";
import { HeaderExpertsSessionInfo } from "./components/HeaderExpertsSessionInfo";



export const ExpertsSessionInfo = () => {
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
      <div className="border border-gray-300 p-4 rounded-xl mb-6">
        <HeaderExpertsSessionInfo handleEditClick={handleEditClick} />
        <div className="space-y-6 grid md:grid-cols-2 gap-4">
          <ExpertsSessionBox
            label="رقم تقرير الخبير"
            text={"123"}
          />
          <ExpertsSessionBox
            label="الجهة المكلفة"
            text={"123"}
          />

          <ExpertsSessionBox
            label="تاريخ التكليف"
            text={"123"}
          />
          <ExpertsSessionBox
            label="مكتب الخبراء / الخبير"
            text={"123"}
          />
          <ExpertsSessionBox
            label="تاريخ مباشرة المهمة"
            text={"123"}
          />
          <ExpertsSessionBox
            label="موضوع الخبرة"
            text={"123"}
          />

          <ExpertsSessionBox
            label="الرأي النهائي للخبير"
            text={"123"}
          />
          <ExpertsSessionBox
            label="تاريخ إيداع التقرير"
            text={"123"}
          />

          <ExpertsSessionBox
            label="الاعتراضات"
            text={"123"}
          />

          <ExpertsSessionBox
            label="ملاحظات إضافية"
            text={"123"}
          />
        </div>
        <EditModelExperts
          document={documentForModal}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={handleSaveChanges}
        />
      </div>
    </>
  );
};