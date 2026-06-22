import { AddRoleFeature } from "@/features/settings/permissions/components/AddRoleFeature";
import { useParams } from "react-router-dom";
import {
  useGetAllRoles,
  useGetRolePermissions,
} from "@/features/settings/permissions/api";
import { getArabicPermissionsFromIds } from "@/shared/constants/permissions";
import LoadingPage from "@/shared/components/LoadingPage";

const AddRole = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const roleId = id ? Number(id) : undefined;

  const { data: roles, isLoading: isRolesLoading } = useGetAllRoles();
  const { data: rolePermissions, isLoading: isPermsLoading } =
    useGetRolePermissions(roleId);

  if (isEdit && (isRolesLoading || isPermsLoading)) {
    return <LoadingPage />;
  }

  const role = roles?.find((r) => r.id === roleId);

  const permissions = rolePermissions?.permissions
    ? getArabicPermissionsFromIds(rolePermissions.permissions.map((p) => p.id))
    : {};

  const initialData =
    isEdit && role
      ? {
          id: role.id.toString(),
          name: role.role_name,
          description: "",
          permissions,
        }
      : undefined;

  return <AddRoleFeature isEdit={isEdit} initialData={initialData} />;
};

export default AddRole;
