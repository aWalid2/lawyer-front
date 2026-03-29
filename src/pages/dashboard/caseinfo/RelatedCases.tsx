import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { RelationalCases } from "@/features/cases-mangement/RelationalCases";

const RelatedCases: React.FC = () => {
  return (
    <PageLayout innerPage>
      <RelationalCases
      />
    </PageLayout>
  );
};

export default RelatedCases;
