import React from "react";
import { useParams } from "react-router-dom";
import type { ExpertSessionType } from "../../types/ExperstSessionType";
import { MainInfoSection } from "./components/MainInfoSection";
import { ObjectionsSection } from "./components/ObjectionsSection";
import { OpinionSection } from "./components/OpinionSection";

const experts: ExpertSessionType[] = [
  {
    id: "1",
    expertReportNumber: "EXP-2024-001",
    assignedAuthority: "محكمة استئناف القاهرة",
    assignmentDate: "2024-01-15",
    expertOfficeName: "مكتب الخبراء الهندسيين",
    taskStartDate: "2024-01-20",
    subjectOfExpertise: "فحص هندسي",
    finalOpinion: "وجود عيوب إنشائية",
    reportSubmissionDate: "2024-02-10",
    objections: "لا يوجد",
    notes: "",
    status: "مُعتمد",
  },
  {
    id: "2",
    expertReportNumber: "EXP-2024-002",
    assignedAuthority: "نيابة جنوب القاهرة",
    assignmentDate: "2024-02-01",
    expertOfficeName: "مكتب الخبراء الطبيين",
    taskStartDate: "2024-02-05",
    subjectOfExpertise: "فحص طبي",
    finalOpinion: "نسبة عجز 25%",
    reportSubmissionDate: "2024-02-20",
    objections: "",
    notes: "",
    status: "قيد المراجعة",
  },
  {
    id: "3",
    expertReportNumber: "EXP-2024-003",
    assignedAuthority: "محكمة الأسرة",
    assignmentDate: "2024-02-10",
    expertOfficeName: "مكتب الخبراء الماليين",
    taskStartDate: "2024-02-14",
    subjectOfExpertise: "تقدير تعويض",
    finalOpinion: "تعويض 500,000 جنيه",
    reportSubmissionDate: "2024-03-05",
    objections: "اعتراض طرف الخصم",
    notes: "تم رفع الاعتراض للمحكمة",
    status: "مُعترض عليه",
  },
  {
    id: "4",
    expertReportNumber: "EXP-2024-004",
    assignedAuthority: "هيئة التحكيم",
    assignmentDate: "2024-02-15",
    expertOfficeName: "مكتب الخبراء القانونيين",
    taskStartDate: "2024-02-18",
    subjectOfExpertise: "فحص توقيع",
    finalOpinion: "التوقيع سليم",
    reportSubmissionDate: "2024-03-01",
    objections: "",
    notes: "",
    status: "مُعتمد",
  },
  {
    id: "5",
    expertReportNumber: "EXP-2024-005",
    assignedAuthority: "محكمة القضاء الإداري",
    assignmentDate: "2024-02-20",
    expertOfficeName: "مكتب الخبراء الهندسيين",
    taskStartDate: "2024-02-23",
    subjectOfExpertise: "تقدير تعويض",
    finalOpinion: "تعويض 750,000 جنيه",
    reportSubmissionDate: "2024-03-10",
    objections: "",
    notes: "",
    status: "قيد المراجعة",
  },
  {
    id: "6",
    expertReportNumber: "EXP-2024-006",
    assignedAuthority: "نيابة شمال القاهرة",
    assignmentDate: "2024-02-25",
    expertOfficeName: "مكتب الخبراء الجنائيين",
    taskStartDate: "2024-02-27",
    subjectOfExpertise: "فحص مستندات",
    finalOpinion: "المستندات سليمة",
    reportSubmissionDate: "2024-03-12",
    objections: "",
    notes: "",
    status: "مُعترض عليه",
  },
];

export const ExpertSessionDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const expert = experts.find((e) => e.id === id) ?? experts[0];

  return (
    <div className="space-y-6">
      <MainInfoSection expert={expert} />
      <OpinionSection
        subjectOfExpertise={expert.subjectOfExpertise}
        finalOpinion={expert.finalOpinion}
      />
      <ObjectionsSection objections={expert.objections} notes={expert.notes} />
    </div>
  );
};
