import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useIndexedApiPagination } from "@/shared/hooks/useIndexedApiPagination";
import { useGetAllRoles } from "@/features/settings/permissions/api";
import { MOCK_CASE_ROLES } from "../components/mockCaseRoles";
import type { CaseRole, CaseRoleFormValues } from "../types";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 15;

export const useRolesTable = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // ── Fake data: replace with real API later ──
  const [caseRoles, setCaseRoles] = useState<CaseRole[]>(MOCK_CASE_ROLES);
  const isPending = false;
  const isError = false;
  const error = null;

  // ── Roles from settings (real API) ──
  const { data: rolesResponse, isLoading: isRolesLoading } = useGetAllRoles();

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
    });

  const selectedRole = useMemo(
    () => caseRoles.find((r) => r.id === selectedRoleId) ?? null,
    [caseRoles, selectedRoleId],
  );

  // ── Fake mutations (replace with real API later) ──
  const isSubmitting = false;

  const handleSave = async (values: CaseRoleFormValues, _id?: number) => {
    const selectedOption = roleOptions.find(
      (o) => o.value === Number(values.role_id),
    );
    if (!selectedOption) return;

    const newRole: CaseRole = {
      id: Date.now(),
      case_id: Number(caseId),
      role_id: Number(values.role_id),
      role_name: String(selectedOption.label),
      employee_count: 0,
    };

    setCaseRoles((prev) => [...prev, newRole]);
    toast.success("تم تعيين الدور بنجاح");
  };

  const handleDelete = async (id: number) => {
    setCaseRoles((prev) => prev.filter((r) => r.id !== id));

    if (selectedRoleId === id) {
      setSelectedRoleId(null);
      setIsViewOpen(false);
      setIsFormOpen(false);
    }

    toast.success("تم حذف الدور من القضية");
  };

  const handleOpenView = (id: number) => {
    setSelectedRoleId(id);
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
    isCreatePending: false,
    isSubmitting,
  };
};