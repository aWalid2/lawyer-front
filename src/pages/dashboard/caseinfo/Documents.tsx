import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { CaseDocuments } from "@/features/cases-mangement/Documents";

const Documents: React.FC = () => {
  return (
    <PageLayout innerPage>
      <CaseDocuments />
    </PageLayout>
  );
};

export default Documents;
