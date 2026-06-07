import type { CaseRole } from "../types";

/**
 * Fake case-role assignments used until the real API is available.
 */
export const MOCK_CASE_ROLES: CaseRole[] = [
  {
    id: 1,
    case_id: 1,
    role_id: 1,
    role_name: "محامي",
    employee_count: 3,
  },
  {
    id: 2,
    case_id: 1,
    role_id: 2,
    role_name: "مساعد قانوني",
    employee_count: 2,
  },
  {
    id: 3,
    case_id: 1,
    role_id: 3,
    role_name: "مدير القضية",
    employee_count: 1,
  },
  {
    id: 4,
    case_id: 1,
    role_id: 4,
    role_name: "باحث قانوني",
    employee_count: 4,
  },
  {
    id: 5,
    case_id: 1,
    role_id: 5,
    role_name: "سكرتير",
    employee_count: 1,
  },
];
