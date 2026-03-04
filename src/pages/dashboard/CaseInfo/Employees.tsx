import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { Employees } from "@/features/cases-mangement/Employees";

const EmployeesPage: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="الموظفين" />
      </div>
      <Employees />
    </PageLayout>
  );
};

export default EmployeesPage;
