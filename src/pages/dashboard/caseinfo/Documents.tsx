import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { CaseDocuments } from "@/features/cases-mangement/Documents";

const Documents: React.FC = () => {
  return (
    <PageLayout innerPage>
      <CaseDocuments />
    </PageLayout>
  );
};

export default Documents;
