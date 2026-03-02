import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

const Documents: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="المستندات" />
      </div>
      <div className="text-secondary text-right">محتوى المستندات</div>
    </PageLayout>
  );
};

export default Documents;
