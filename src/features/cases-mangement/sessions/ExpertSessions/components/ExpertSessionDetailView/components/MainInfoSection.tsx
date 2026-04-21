import React from "react";
import { ExpertsSessionBox } from "../../ExpertsSessionInfo/components/ExpertsSessionBox";
import type { ExpertSessionType } from "../../../types/ExperstSessionType";
import { ExpertSectionCard } from "./ExpertSectionCard";
import { ExpertStatusBadge } from "./ExpertStatusBadge";

interface MainInfoSectionProps {
  expert: ExpertSessionType;
}

export const MainInfoSection: React.FC<MainInfoSectionProps> = ({ expert }) => {
  return (
    <ExpertSectionCard
      title="بيانات تقرير الخبير"
      action={<ExpertStatusBadge status={expert.status ?? ""} />}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <ExpertsSessionBox
          label="رقم تقرير الخبير"
          text={expert.expertReportNumber}
        />
        <ExpertsSessionBox
          label="الجهة المكلفة"
          text={expert.assignedAuthority}
        />
        <ExpertsSessionBox label="تاريخ التكليف" text={expert.assignmentDate} />
        <ExpertsSessionBox
          label="مكتب الخبراء / الخبير"
          text={expert.expertOfficeName}
        />
        <ExpertsSessionBox
          label="تاريخ بدء المهمة"
          text={expert.taskStartDate ?? "—"}
        />
        <ExpertsSessionBox
          label="تاريخ إيداع التقرير"
          text={expert.reportSubmissionDate}
        />
      </div>
    </ExpertSectionCard>
  );
};
