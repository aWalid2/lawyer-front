import { EmployeesTable } from "./components/EmployeeTable/indext";
import { RoleTable } from "./components/RoleTable/indext";

export const Employees: React.FC = () => {
  return (
    <>
      <EmployeesTable />;
      <RoleTable />;
    </>
  );
};
