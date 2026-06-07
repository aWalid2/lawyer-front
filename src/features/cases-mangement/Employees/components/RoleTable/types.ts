export interface EmployeeOption {
  user_id: number;
  position?: string;
  notes?: string;
  user?: {
    first_name?: string;
    email?: string;
    phone?: string;
  };
}

export interface CaseEmployee {
  id: number;
  case_id: number;
  phone: string;
  job: string;
  Employee_id: number;
  Employee?: {
    user_id?: number;
    position?: string;
    notes?: string;
    username: string;
    user?: {
      first_name?: string;
      email?: string;
      phone?: string;
    };
  };
  rowNumber?: number;
}

export interface CaseEmployeeListResponse {
  data: CaseEmployee[];
  meta?: {
    total?: number;
    totalPages?: number;
  };
}

export interface CaseEmployeeFormValues {
  Employee_id: number | "";
  phone: string;
  job: string;
}

export interface CaseEmployeeRequest {
  Employee_id: number;
  phone: string;
  job: string;
}

export const EMPTY_CASE_EMPLOYEE_FORM_VALUES: CaseEmployeeFormValues = {
  Employee_id: "",
  phone: "",
  job: "",
};

export const toCaseEmployeeFormValues = (
  employee?: Partial<CaseEmployee> | null,
): CaseEmployeeFormValues => ({
  Employee_id: employee?.Employee_id ?? "",
  phone: employee?.phone ?? "",
  job: employee?.job ?? "",
});

export const toCaseEmployeeRequest = (
  values: CaseEmployeeFormValues,
): CaseEmployeeRequest => ({
  Employee_id: Number(values.Employee_id),
  phone: values.phone.trim(),
  job: values.job.trim(),
});

export const getCaseEmployeeName = (employee: CaseEmployee) => {
  return employee.Employee?.username || `#${employee.Employee_id}`;
};

export const getCaseEmployeePosition = (employee: CaseEmployee) => {
  return employee.Employee?.position || "-";
};

export const getCaseEmployeeNotes = (employee: CaseEmployee) => {
  return employee.Employee?.notes || "-";
};

export const mergeCaseEmployeeWithOption = (
  employee: CaseEmployee,
  option?: EmployeeOption,
): CaseEmployee => ({
  ...employee,
  Employee: {
    user_id: employee.Employee?.user_id ?? option?.user_id,
    position: employee.Employee?.position ?? option?.position,
    notes: employee.Employee?.notes ?? option?.notes,
    username: employee.Employee?.username ??  "",
  },
});