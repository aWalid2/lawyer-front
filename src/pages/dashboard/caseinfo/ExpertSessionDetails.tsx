import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { ExpertSessionDetailView } from "@/features/cases-mangement/sessions/ExpertSessions/components/ExpertSessionDetailView";

const ExpertSessionDetails: React.FC = () => {
  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="تفاصيل جلسة الخبير" />
      </div>
      <ExpertSessionDetailView />
    </PageLayout>
  );
};

export default ExpertSessionDetails;
