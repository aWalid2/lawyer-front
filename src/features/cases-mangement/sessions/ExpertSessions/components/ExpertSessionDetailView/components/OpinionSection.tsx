import React from "react";
import { ExpertsSessionBox } from "../../ExpertsSessionInfo/components/ExpertsSessionBox";
import { ExpertSectionCard } from "./ExpertSectionCard";

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
        <ExpertsSessionBox label="موضوع الخبرة" text={subjectOfExpertise} />
        <ExpertsSessionBox label="الرأي النهائي للخبير" text={finalOpinion} />
      </div>
    </ExpertSectionCard>
  );
};
