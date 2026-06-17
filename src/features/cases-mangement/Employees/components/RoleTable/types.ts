
export interface RoleInfo {
  id: number;
  role_name: string;
    user_counts: number;
  permission: any[];
}

export interface CaseInfo {
  id: number;
  case_title: string;
  case_sequence: string;
  case_situation: string;
}

export interface CaseRole {
  id: number;
  case_id: number;
  role_id: number;
  role_name: string;
  employee_count: number;
  role?: RoleInfo;
  case?: CaseInfo;
  rowNumber?: number;
  _count?:{
    users:number;
  }
  user_counts?:number
}

export interface CaseRoleFormValues {
  role_id: number | "";
}

export const EMPTY_CASE_ROLE_FORM_VALUES: CaseRoleFormValues = {
  role_id: "",
};

export const getCaseRoleName = (role: CaseRole) => role.role_name;

export const getCaseRoleEmployeeCount = (role: CaseRole) => role.user_counts ?? role.role?.user_counts ?? 0;
