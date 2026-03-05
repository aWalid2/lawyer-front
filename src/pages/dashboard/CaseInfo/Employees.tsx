import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import PageLayout from "@/components/shared/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Employees } from "@/features/cases-mangement/Employees";
import React from "react";

const EmployeesPage: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <HeaderTitle title="الموظفين" />
        <Button
          className="rounded-[12px] h-12.5 px-6 bg-primary-gradient font-semibold text-white "
        >
          تعيين موظف
        </Button>
      </div>
      <Employees />
    </PageLayout>
  );
};

export default EmployeesPage;
