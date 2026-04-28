import React from "react";

import type { ExpertSessionResponse } from "@/features/cases-mangement/sessions/ExpertSessions/types/ExpertSessionApiTypes";
import { ExpertSectionCard } from "./ExpertSectionCard";
import { ExpertStatusBadge } from "./ExpertStatusBadge";
import { InputBox } from "@/shared/components/InputBox";

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
        <InputBox label="رقم تقرير الخبير" text={expert.expert_report_number} />
        <InputBox label="الجهة المكلفة" text={expert.assigning_authority} />
        <InputBox label="تاريخ التكليف" text={expert.assignment_date} />
        <InputBox
          label="مكتب الخبراء / الخبير"
          text={expert.expert_office_name}
        />
        <InputBox
          label="تاريخ بدء المهمة"
          text={expert.task_start_date ?? "—"}
        />
        <InputBox label="تاريخ إيداع التقرير" text={expert.submission_date} />
      </div>
    </ExpertSectionCard>
  );
};
