import React from "react";
import { ExpertsSessionBox } from "../../ExpertsSessionInfo/components/ExpertsSessionBox";
import { ExpertSectionCard } from "./ExpertSectionCard";

interface ObjectionsSectionProps {
  objections?: string;
  notes?: string;
}

export const ObjectionsSection: React.FC<ObjectionsSectionProps> = ({
  objections,
  notes,
}) => {
  return (
    <ExpertSectionCard title="الاعتراضات والملاحظات">
      <div className="grid gap-6 md:grid-cols-2">
        <ExpertsSessionBox label="الاعتراضات" text={objections || "لا يوجد"} />
        <ExpertsSessionBox label="ملاحظات" text={notes || "لا يوجد"} />
      </div>
    </ExpertSectionCard>
  );
};
