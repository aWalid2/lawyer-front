import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

const RelatedCases: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="القضايا المرتبطة" />
      </div>
      <div className="text-secondary text-right">محتوى القضايا المرتبطة</div>
    </PageLayout>
  );
};

export default RelatedCases;
