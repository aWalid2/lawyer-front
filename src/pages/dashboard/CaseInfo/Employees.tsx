import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";

const Employees: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="الموظفين" />
      </div>
      <div className="text-secondary text-right">محتوى الموظفين</div>
    </PageLayout>
  );
};

export default Employees;
