// ============================================================
// Permissions Constants
// ============================================================


/** A single permission definition */
export interface PermissionDef {
  id: number;
  nameEn: string;
  nameAr: string;
}

/** A module/group containing related permissions */
export interface ModulePermissions {
  moduleEn: string;
  moduleAr: string;
  permissions: PermissionDef[];
}

// ============================================================
// All permissions organized by module (matching backend CSV data)
// ============================================================
export const PERMISSIONS_MODULES: ModulePermissions[] = [
  {
    moduleEn: "DASHBOARD",
    moduleAr: "الصفحة الرئيسية",
    permissions: [
      { id: 50, nameEn: "VIEW_DASHBOARD", nameAr: "عرض الصفحة الرئيسية" },
      { id: 51, nameEn: "VIEW_FINANCE", nameAr: "عرض المعلومات المالية" },
    ],
  },
  {
    moduleEn: "PROFILE",
    moduleAr: "الملف الشخصي",
    permissions: [
      { id: 56, nameEn: "VIEW_PROFILE", nameAr: "عرض الملف الشخصي" },
      { id: 57, nameEn: "UPDATE_PROFILE", nameAr: "تعديل الملف الشخصي" },
    ],
  },
  {
    moduleEn: "CASE_MANAGEMENT",
    moduleAr: "إدارة القضايا",
    permissions: [
      { id: 13, nameEn: "VIEW_CASES", nameAr: "رؤية القضايا" },
      { id: 5, nameEn: "CREATE_CASES", nameAr: "إضافة قضية" },
      { id: 15, nameEn: "UPDATE_CASES", nameAr: "تعديل قضية" },
      { id: 14, nameEn: "VIEW_CASE_DETAILS", nameAr: "عرض تفاصيل القضية" },
      { id: 17, nameEn: "CASE_ANALYSIS", nameAr: "تحليل القضية" },
      { id: 16, nameEn: "DELETE_CASES", nameAr: "حذف قضية" },
      { id: 18, nameEn: "PLEADING", nameAr: "المرافعة" },
    ],
  },
  {
    moduleEn: "CLIENT_MANAGEMENT",
    moduleAr: "إدارة الموكلين",
    permissions: [
      { id: 23, nameEn: "VIEW_CLIENTS", nameAr: "رؤية الموكلين" },
      { id: 26, nameEn: "CREATE_CLIENTS", nameAr: "إضافة موكل" },
      { id: 27, nameEn: "UPDATE_CLIENTS", nameAr: "تعديل موكل" },
      { id: 24, nameEn: "VIEW_CLIENT_DETAILS", nameAr: "رؤية تفاصيل الموكل" },
      { id: 25, nameEn: "DELETE_CLIENTS", nameAr: "حذف موكل" },
    ],
  },
  {
    moduleEn: "SETTINGS",
    moduleAr: "الإعدادات",
    permissions: [
      { id: 73, nameEn: "VIEW_SETTINGS_PAGE", nameAr: "رؤية صفحة الإعدادات" },
      { id: 74, nameEn: "OFFICE_SETTINGS", nameAr: "إعدادات المكتب" },
      { id: 75, nameEn: "MANAGE_PERMISSIONS", nameAr: "إدارة الصلاحيات" },
    ],
  },
  {
    moduleEn: "USER_MANAGEMENT",
    moduleAr: "إدارة المستخدمين",
    permissions: [
      { id: 4, nameEn: "GET_USER", nameAr: "رؤية المستخدمين" },
      { id: 3, nameEn: "CREATE_USER", nameAr: "إضافة مستخدم" },
      { id: 2, nameEn: "UPDATE_USER", nameAr: "تعديل مستخدم" },
      { id: 1, nameEn: "DELETE_USER", nameAr: "حذف مستخدم" },
    ],
  },
  {
    moduleEn: "COURT_MANAGEMENT",
    moduleAr: "إدارة المحاكم",
    permissions: [
      { id: 28, nameEn: "VIEW_COURTS", nameAr: "رؤية المحاكم" },
      { id: 29, nameEn: "CREATE_COURTS", nameAr: "إضافة محكمة" },
      { id: 30, nameEn: "UPDATE_COURTS", nameAr: "تعديل محكمة" },
      { id: 31, nameEn: "DELETE_COURTS", nameAr: "حذف محكمة" },
    ],
  },
  {
    moduleEn: "STATUS_MANAGEMENT",
    moduleAr: "إدارة الحالات",
    permissions: [
      { id: 76, nameEn: "VIEW_STATUS", nameAr: "رؤية الحالات" },
      { id: 79, nameEn: "CREATE_STATUS", nameAr: "إضافة حالة" },
      { id: 77, nameEn: "UPDATE_STATUS", nameAr: "تعديل حالة" },
      { id: 78, nameEn: "DELETE_STATUS", nameAr: "حذف حالة" },
    ],
  },
  {
    moduleEn: "CASE_TYPES",
    moduleAr: "أنواع القضايا",
    permissions: [
      { id: 19, nameEn: "VIEW_CASES_TYPES", nameAr: "رؤية أنواع القضايا" },
      { id: 20, nameEn: "CREATE_CASES_TYPES", nameAr: "إضافة نوع قضية" },
      { id: 21, nameEn: "UPDATE_CASES_TYPES", nameAr: "تعديل نوع قضية" },
      { id: 22, nameEn: "DELETE_CASES_TYPES", nameAr: "حذف نوع قضية" },
    ],
  },
  {
    moduleEn: "SESSION_MANAGEMENT",
    moduleAr: "إدارة الجلسات",
    permissions: [
      { id: 67, nameEn: "VIEW_SESSIONS", nameAr: "رؤية الجلسات" },
      { id: 68, nameEn: "CREATE_SESSIONS", nameAr: "إضافة جلسة" },
      { id: 69, nameEn: "UPDATE_SESSIONS", nameAr: "تعديل جلسة" },
      { id: 70, nameEn: "DELETE_SESSIONS", nameAr: "حذف جلسة" },
      { id: 72, nameEn: "VIEW_SESSIONS_TAB", nameAr: "رؤية تبويب الجلسات" },
      { id: 71, nameEn: "SESSIONS_TYPES", nameAr: "أنواع الجلسات" },
    ],
  },
  {
    moduleEn: "EMPLOYEE_ASSIGNMENT",
    moduleAr: "تعيين الموظفين",
    permissions: [
      { id: 46, nameEn: "VIEW_THE_APPOINTMENTS_TAB", nameAr: "رؤية تبويب التعيين" },
      { id: 47, nameEn: "HIRE_AN_EMPLOYEE", nameAr: "تعيين موظف" },
      { id: 48, nameEn: "EDIT_AN_EMPLOYEE_APPOINTMENT", nameAr: "تعديل تعيين موظف" },
      { id: 49, nameEn: "DELETE_AN_EMPLOYEE_APPOINTMENT", nameAr: "حذف تعيين موظف" },
    ],
  },
  {
    moduleEn: "PAYMENT_MANAGEMENT",
    moduleAr: "إدارة المدفوعات",
    permissions: [
      { id: 52, nameEn: "PAYMENT_MANAGEMENT", nameAr: "إدارة المدفوعات" },
      { id: 53, nameEn: "EDIT_PAYMENTS", nameAr: "تعديل مدفوعات" },
      { id: 54, nameEn: "CREATE_PAYMENTS", nameAr: "إضافة مدفوعات جديده" },
      { id: 55, nameEn: "DELETE_PAYMENTS", nameAr: "حذف مدفوعات" },
    ],
  },
  {
    moduleEn: "EXPENSE_MANAGEMENT",
    moduleAr: "إدارة المصروفات",
    permissions: [
      { id: 38, nameEn: "VIEWING_EXPENSES_AND_EXPENSE_TYPES", nameAr: "رؤية المصروفات وأنواع المصروفات" },
      { id: 39, nameEn: "EDIT_EXPENSE_TYPES", nameAr: "تعديل أنواع المصروفات" },
      { id: 40, nameEn: "ADD_EXPENSE_TYPE", nameAr: "إضافة نوع المصروفات" },
      { id: 41, nameEn: "DELETE_EXPENSE_TYPE", nameAr: "حذف نوع المصروفات" },
      { id: 42, nameEn: "MANAGE_EXPENSE_TYPES", nameAr: "إدارة أنواع المصروفات" },
      { id: 43, nameEn: "ADD_EXPENSES", nameAr: "إضافة مصروفات" },
      { id: 44, nameEn: "DELETE_EXPENSES", nameAr: "حذف مصروفات" },
      { id: 45, nameEn: "EDIT_EXPENSES", nameAr: "تعديل مصروفات" },
    ],
  },
  {
    moduleEn: "DOCUMENT_MANAGEMENT",
    moduleAr: "إدارة الوثائق",
    permissions: [
      { id: 32, nameEn: "VIEW_DOCUMENTS", nameAr: "رؤية الوثائق" },
      { id: 33, nameEn: "CREATE_DOCUMENTS", nameAr: "إضافة وثائق" },
      { id: 34, nameEn: "EDIT_DOCUMENTS", nameAr: "تعديل وثائق" },
      { id: 35, nameEn: "DELETE_DOCUMENTS", nameAr: "حذف وثائق" },
      { id: 36, nameEn: "MANAGE_DOCUMENTS", nameAr: "إدارة وثائق" },
      { id: 37, nameEn: "UPLOAD_DOCUMENTS", nameAr: "تحميل وثائق" },
    ],
  },
  {
    moduleEn: "REPORTS",
    moduleAr: "التقارير",
    permissions: [
      { id: 58, nameEn: "CLIENT_REPORTS", nameAr: "تقارير الموكلين" },
      { id: 59, nameEn: "USER_REPORTS", nameAr: "تقارير المستخدمين" },
      { id: 60, nameEn: "CASE_REPORTS", nameAr: "تقارير القضايا" },
      { id: 61, nameEn: "SESSION_REPORTS", nameAr: "تقارير الجلسات" },
      { id: 62, nameEn: "PAYMENT_REPORTS", nameAr: "تقارير المدفوعات" },
      { id: 63, nameEn: "EXPENSE_REPORTS", nameAr: "تقارير المصروفات" },
    ],
  },
  {
    moduleEn: "CASE_FIELDS",
    moduleAr: "حقول القضية",
    permissions: [
      { id: 7, nameEn: "MANAGE_CASE_FIELDS", nameAr: "إدارة حقول القضية" },
    ],
  },
  {
    moduleEn: "VIEW_ROLLS",
    moduleAr: "رؤية الرول",
    permissions: [
      { id: 66, nameEn: "VIEW_ROLLS", nameAr: "رؤية الرول" },
    ],
  },
  {
    moduleEn: "CALENDAR",
    moduleAr: "التقويم",
    permissions: [
      { id: 6, nameEn: "VIEW_CALENDAR", nameAr: "التقويم" },
    ],
  },
];

// ============================================================
// Flat lookup maps for quick access
// ============================================================

export const ALL_PERMISSIONS = PERMISSIONS_MODULES.flatMap((m) => m.permissions);

export const PERMISSION_BY_ID = new Map<number, PermissionDef>(
  ALL_PERMISSIONS.map((p) => [p.id, p]),
);

export const PERMISSION_BY_EN_NAME = new Map<string, PermissionDef>(
  ALL_PERMISSIONS.map((p) => [p.nameEn, p]),
);

export const PERMISSION_BY_AR_NAME = new Map<string, PermissionDef>(
  ALL_PERMISSIONS.map((p) => [p.nameAr, p]),
);


export function getPermissionId(nameEn: string): number | undefined {
  return PERMISSION_BY_EN_NAME.get(nameEn)?.id;
}


export function getPermissionIds(nameEns: string[]): number[] {
  return nameEns
    .map((name) => getPermissionId(name))
    .filter((id): id is number => id !== undefined);
}


export function getPermissionIdsFromArabic(
  selectedPermissions: Record<string, string[]>,
): number[] {
  const ids: number[] = [];
  for (const [, permNames] of Object.entries(selectedPermissions)) {
    for (const nameAr of permNames) {
      const perm = PERMISSION_BY_AR_NAME.get(nameAr.trim());
      if (perm) {
        ids.push(perm.id);
      }
    }
  }
  return ids;
}

export function getArabicPermissionsFromIds(
  permissionIds: number[],
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const mod of PERMISSIONS_MODULES) {
    const selected = mod.permissions
      .filter((p) => permissionIds.includes(p.id))
      .map((p) => p.nameAr);
    if (selected.length > 0) {
      result[mod.moduleEn] = selected;
    }
  }
  return result;
}
