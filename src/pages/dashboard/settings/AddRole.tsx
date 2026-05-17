import { AddRoleFeature } from "@/features/settings/permissions/components/AddRoleFeature";
import { useParams } from "react-router-dom";
import { useGetAllRoles } from "@/features/settings/permissions/api";
import LoadingPage from "@/shared/components/LoadingPage";

const AddRole = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const { data: roles, isLoading } = useGetAllRoles();

  if (isEdit && isLoading) {
    return <LoadingPage />;
  }

  const role = roles?.find((r) => r.id.toString() === id);

  const initialData = isEdit && role ? {
    id: role.id.toString(),
    name: role.role_name,
    description: "", // Description is mock or not in backend role currently
    permissions: {} // Permissions would ideally come from the role, but we can default to empty or mock
  } : undefined;

  return <AddRoleFeature isEdit={isEdit} initialData={initialData} />;
};

export default AddRole;
