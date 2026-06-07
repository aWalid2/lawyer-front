import type { CaseEmployee } from "../../types";

export const normalizeCaseEmployee = (employee: any): CaseEmployee => ({
  id: Number(employee?.id ?? 0),
  case_id: Number(employee?.case_id ?? 0),
  phone: employee?.phone ?? "",
  job: employee?.job ?? "",
  Employee_id: Number(
    employee?.Employee_id ?? employee?.employee_id ?? employee?.Employee?.user_id ?? 0,
  ),
  Employee: employee?.Employee
    ? {
        user_id: Number(
          employee?.Employee?.user_id ?? employee?.Employee_id ?? 0,
        ),
        position: employee?.Employee?.position ?? "",
        notes: employee?.Employee?.notes ?? "",
        username: employee?.Employee?.username ?? "",
        user: employee?.Employee?.user
          ? {
              first_name: employee.Employee.user.first_name ?? "",
              email: employee.Employee.user.email ?? "",
              phone: employee.Employee.user.phone ?? "",
            }
          : undefined,
      }
    : undefined,
  rowNumber: employee?.rowNumber,
});