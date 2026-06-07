
export interface CaseRole {
  id: number;
  case_id: number;
  role_id: number;
  role_name: string;
  employee_count: number;
  rowNumber?: number;
}

export interface CaseRoleFormValues {
  role_id: number | "";
}

export const EMPTY_CASE_ROLE_FORM_VALUES: CaseRoleFormValues = {
  role_id: "",
};

export const getCaseRoleName = (role: CaseRole) => role.role_name;

export const getCaseRoleEmployeeCount = (role: CaseRole) => role.employee_count;
