import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

const Expenses: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="المصاريف" />
      </div>
      <div className="text-secondary text-right">محتوى المصاريف</div>
    </PageLayout>
  );
};

export default Expenses;
