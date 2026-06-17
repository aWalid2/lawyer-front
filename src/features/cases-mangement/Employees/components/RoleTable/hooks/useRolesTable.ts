import { useGetAllRoles } from "@/features/settings/permissions/api";
import { useIndexedApiPagination } from "@/shared/hooks/useIndexedApiPagination";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateCaseRole } from "../api/hooks/useCreateCaseRole";
import { useDeleteCaseRole } from "../api/hooks/useDeleteCaseRole";
import { useGetCaseRoles } from "../api/hooks/useGetCaseRoles";
import { useUpdateCaseRole } from "../api/hooks/useUpdateCaseRole";
import type { CaseRoleFormValues } from "../types";

const ITEMS_PER_PAGE = 15;

export const useRolesTable = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // ── Real API ──
  const {
    data: caseRolesResponse,
    isPending,
    isError,
    error,
  } = useGetCaseRoles(caseId);

  // ── Roles from settings (real API) ──
  const { data: rolesResponse, isLoading: isRolesLoading } = useGetAllRoles();

  const caseRoles = useMemo(
    () => caseRolesResponse?.data ?? [],
    [caseRolesResponse?.data],
  );

  const roleOptions = useMemo(() => {
    if (!Array.isArray(rolesResponse)) return [];
    return rolesResponse.map((role) => ({
      value: role.id,
      label: role.role_name,
    }));
  }, [rolesResponse]);

  const { indexedData: indexedRolesData, totalPages } =
    useIndexedApiPagination({
      data: caseRoles,
      page,
      itemsPerPage: ITEMS_PER_PAGE,
      meta: caseRolesResponse?.meta,
    });

  const selectedRole = useMemo(
    () => caseRoles.find((r: any) => r.role_id === selectedRoleId) ?? null,
    [caseRoles, selectedRoleId],
  );

  const createMutation = useCreateCaseRole(caseId!);
  const updateMutation = useUpdateCaseRole(caseId!);
  const deleteMutation = useDeleteCaseRole(caseId!);

  const handleSave = async (values: CaseRoleFormValues, id?: number) => {
    const selectedOption = roleOptions.find(
      (o) => o.value === Number(values.role_id),
    );
    if (!selectedOption) return;

    const payload = {
      role_id: Number(values.role_id),
      case_id: Number(caseId),
    };

    if (id !== undefined) {
      await updateMutation.mutateAsync({
        case_id: Number(caseId),
        role_id: Number(values.role_id),
        original_role_id: selectedRole?.role_id ?? Number(values.role_id),
      });
      return;
    }

    await createMutation.mutateAsync(payload);
  };

  const handleDelete = async (roleId: number) => {
    await deleteMutation.mutateAsync({ role_id: roleId, case_id: Number(caseId) });

    if (selectedRoleId === roleId) {
      setSelectedRoleId(null);
      setIsViewOpen(false);
      setIsFormOpen(false);
    }
  };

  const handleOpenView = (roleId: number) => {
    setSelectedRoleId(roleId);
    setIsViewOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) setSelectedRoleId(null);
  };

  const handleViewOpenChange = (open: boolean) => {
    setIsViewOpen(open);
    if (!open) setSelectedRoleId(null);
  };

  const handleEditFromView = () => {
    setIsViewOpen(false);
    setIsFormOpen(true);
  };

  return {
    page,
    setPage,
    selectedRole,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedRolesData,
    totalPages,
    roleOptions,
    handleSave,
    handleDelete,
    handleOpenView,
    handleFormOpenChange,
    handleViewOpenChange,
    handleEditFromView,
    isOptionsPending: isRolesLoading,
    isCreatePending: createMutation.isPending,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};