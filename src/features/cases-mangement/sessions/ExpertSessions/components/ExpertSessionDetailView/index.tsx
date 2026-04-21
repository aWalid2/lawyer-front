import React from "react";
import { useParams } from "react-router-dom";
import { MainInfoSection } from "./components/MainInfoSection";
import { ObjectionsSection } from "./components/ObjectionsSection";
import { OpinionSection } from "./components/OpinionSection";
import { useGetExpertSession } from "../../api/hooks/useGetExpertSession";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

export const ExpertSessionDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: expert, isPending, isError } = useGetExpertSession(id);

  if (isPending) return <LoadingPage />;
  if (isError || !expert) return <Error />;

  return (
    <div className="space-y-6">
      <MainInfoSection expert={expert} />
      <OpinionSection
        subjectOfExpertise={expert.subject_of_expertise}
        finalOpinion={expert.final_opinion}
      />
      <ObjectionsSection />
    </div>
  );
};
