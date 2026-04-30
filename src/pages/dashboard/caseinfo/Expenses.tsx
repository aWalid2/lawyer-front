import React from "react";
import PageLayout from "@/shared/components/PageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { ExpensesCaseFeature } from "@/features/cases-mangement/Expenses";

const Expenses: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="المصاريف" />
      </div>
      <ExpensesCaseFeature />
    </PageLayout>
  );
};

export default Expenses;
