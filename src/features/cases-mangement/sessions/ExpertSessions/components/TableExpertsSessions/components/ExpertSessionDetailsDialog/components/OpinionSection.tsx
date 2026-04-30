import React from "react";
import { ExpertSectionCard } from "./ExpertSectionCard";
import { InputBox } from "@/shared/components/InputBox";

interface OpinionSectionProps {
  subjectOfExpertise: string;
  finalOpinion: string;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  subjectOfExpertise,
  finalOpinion,
}) => {
  return (
    <ExpertSectionCard title="موضوع الخبرة والرأي النهائي">
      <div className="grid gap-6 md:grid-cols-2">
        <InputBox label="موضوع الخبرة" text={subjectOfExpertise} />
        <InputBox label="الرأي النهائي للخبير" text={finalOpinion} />
      </div>
    </ExpertSectionCard>
  );
};
