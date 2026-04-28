import React from "react";

import { ExpertSectionCard } from "./ExpertSectionCard";
import { InputBox } from "@/shared/components/InputBox";

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
        <InputBox label="الاعتراضات" text={objections || "لا يوجد"} />
        <InputBox label="ملاحظات" text={notes || "لا يوجد"} />
      </div>
    </ExpertSectionCard>
  );
};
