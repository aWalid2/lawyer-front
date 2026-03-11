import PageLayout from "@/components/shared/components/PageLayout";
import { Employees } from "@/features/cases-mangement/Employees";
import React from "react";

const EmployeesPage: React.FC = () => {
  return (
    <PageLayout innerPage>
      <Employees />
    </PageLayout>
  );
};

export default EmployeesPage;
