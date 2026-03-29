import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { Procedures } from "@/features/cases-mangement/Procedures";

const ProceduresPage: React.FC = () => {
  return (
    <PageLayout innerPage>
      <Procedures />
    </PageLayout>
  );
};

export default ProceduresPage;

