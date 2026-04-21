import React from "react";
import { ExpertsSessionBox } from "../../ExpertsSessionInfo/components/ExpertsSessionBox";
import type { ExpertSessionResponse } from "../../../types/ExpertSessionApiTypes";
import { ExpertSectionCard } from "./ExpertSectionCard";
import { ExpertStatusBadge } from "./ExpertStatusBadge";

interface MainInfoSectionProps {
  expert: ExpertSessionResponse;
}

export const MainInfoSection: React.FC<MainInfoSectionProps> = ({ expert }) => {
  return (
    <ExpertSectionCard
      title="بيانات تقرير الخبير"
      action={<ExpertStatusBadge status={expert.status} />}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <ExpertsSessionBox
          label="رقم تقرير الخبير"
          text={expert.expert_report_number}
        />
        <ExpertsSessionBox
          label="الجهة المكلفة"
          text={expert.assigning_authority}
        />
        <ExpertsSessionBox
          label="تاريخ التكليف"
          text={expert.assignment_date}
        />
        <ExpertsSessionBox
          label="مكتب الخبراء / الخبير"
          text={expert.expert_office_name}
        />
        <ExpertsSessionBox
          label="تاريخ بدء المهمة"
          text={expert.task_start_date ?? "—"}
        />
        <ExpertsSessionBox
          label="تاريخ إيداع التقرير"
          text={expert.submission_date}
        />
      </div>
    </ExpertSectionCard>
  );
};
