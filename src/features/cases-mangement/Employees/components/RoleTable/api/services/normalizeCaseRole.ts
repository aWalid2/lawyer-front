import type { CaseRole } from "../../types";

export const normalizeCaseRole = (item: any): CaseRole => ({

  id: Number(item?.id ?? 0),
  case_id: Number(item?.case_id ?? 0),
  role_id: Number(item?.role?.id ?? item?.role_id ?? 0),
  role_name: item?.role?.role_name ?? "",
  _count: item?.role?._count ? { users: Number(item.role._count.users ?? 0) } : undefined,
  user_counts: item?.role?._count.users ?? "",
  role: item?.role
    ? {
        id: Number(item.role.id ?? 0),
        role_name: item.role.role_name ?? "",
          user_counts: item?.role?._count.users ?? "",
        permission: Array.isArray(item.role.permission) ? item.role.permission : [],
      }
    : undefined,
  case: item?.case
    ? {
        id: Number(item.case.id ?? 0),
        case_title: item.case.case_title ?? "",
        case_sequence: item.case.case_sequence ?? "",
        case_situation: item.case.case_situation ?? "",
      }
    : undefined,
  employee_count: Number(item?.employee_count ?? 0),
  rowNumber: item?.rowNumber,
});

