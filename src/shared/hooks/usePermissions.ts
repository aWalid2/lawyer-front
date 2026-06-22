import { useMemo } from "react";
import { PERMISSION_BY_EN_NAME } from "@/shared/constants/permissions";

/**
 * Hook to check if a set of permission IDs includes a specific permission.
 *
 * Use this across the app to conditionally render UI based on user permissions.
 *
 * @example
 * ```tsx
 * const { hasPermission } = usePermissions(userPermissionIds);
 *
 * if (hasPermission("CREATE_CASES")) {
 *   return <button>إضافة قضية</button>;
 * }
 * ```
 */
export function usePermissions(permissionIds: number[] | undefined | null) {
  const permissionSet = useMemo(
    () => new Set(permissionIds ?? []),
    [permissionIds],
  );

  /** Check by English permission name (e.g. "CREATE_CASES") */
  const hasPermission = (nameEn: string): boolean => {
    const perm = PERMISSION_BY_EN_NAME.get(nameEn);
    if (!perm) return false;
    return permissionSet.has(perm.id);
  };

  /** Check by numeric permission ID */
  const hasPermissionById = (id: number): boolean => {
    return permissionSet.has(id);
  };

  /** Check if user has ALL of the specified permissions */
  const hasAllPermissions = (nameEns: string[]): boolean => {
    return nameEns.every(hasPermission);
  };

  /** Check if user has ANY of the specified permissions */
  const hasAnyPermission = (nameEns: string[]): boolean => {
    return nameEns.some(hasPermission);
  };

  /** Get the list of permission IDs the user has */
  const getPermissionIds = (): number[] => {
    return Array.from(permissionSet);
  };

  return {
    hasPermission,
    hasPermissionById,
    hasAllPermissions,
    hasAnyPermission,
    getPermissionIds,
    permissionCount: permissionSet.size,
  };
}
