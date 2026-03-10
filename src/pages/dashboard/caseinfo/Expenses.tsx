import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { FormExpenses } from "@/features/cases-mangement/Expenses/FormExpenses";

const Expenses: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="المصاريف" />
      </div>
      <FormExpenses />
    </PageLayout>
  );
};

export default Expenses;
