import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useIndexedApiPagination } from "@/shared/hooks/useIndexedApiPagination";
import { useCreateCaseEmployee } from "../api/hooks/useCreateCaseEmployee";
import { useDeleteCaseEmployee } from "../api/hooks/useDeleteCaseEmployee";
import { useGetCaseEmployees } from "../api/hooks/useGetCaseEmployees";
import { useUpdateCaseEmployee } from "../api/hooks/useUpdateCaseEmployee";
import type { CaseEmployeeFormValues } from "../types";
import { toCaseEmployeeRequest } from "../types";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";

const ITEMS_PER_PAGE = 15;

export const useRolesTable = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const {
    data: caseEmployeesResponse,
    isPending,
    isError,
    error,
  } = useGetCaseEmployees(caseId);



  const { data: employeesOptionsResponse, isPending: isEmployeesPending } =
    useGetAllUsers();

  const caseEmployees = useMemo(
    () => caseEmployeesResponse?.data ?? [],
    [caseEmployeesResponse?.data],
  );

  const { indexedData: indexedEmployeesData, totalPages } =
    useIndexedApiPagination({
      data: caseEmployees,
      page,
      itemsPerPage: ITEMS_PER_PAGE,
      meta: caseEmployeesResponse?.meta,
    });

  const employeeOptions = useMemo(() => {
    if (!Array.isArray(employeesOptionsResponse)) return [];
    return employeesOptionsResponse.map((user) => ({
      value: user.id,
      label: user.first_name || `#${user.id}`,
    }));
  }, [employeesOptionsResponse]);

  const selectedEmployee = useMemo(
    () =>
      caseEmployees.find((employee) => employee.id === selectedEmployeeId) ??
      null,
    [caseEmployees, selectedEmployeeId],
  );

  const createMutation = useCreateCaseEmployee(caseId!);
  const updateMutation = useUpdateCaseEmployee(caseId!);
  const deleteMutation = useDeleteCaseEmployee(caseId!);

  const handleSave = async (values: CaseEmployeeFormValues, id?: number) => {
    const payload = toCaseEmployeeRequest(values);

    if (id) {
      await updateMutation.mutateAsync({ id, data: payload });
      return;
    }

    await createMutation.mutateAsync({ caseId: caseId!, data: payload });
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);

    if (selectedEmployeeId === id) {
      setSelectedEmployeeId(null);
      setIsViewOpen(false);
      setIsFormOpen(false);
    }
  };

  const handleOpenEdit = (id: number) => {
    setSelectedEmployeeId(id);
    setIsFormOpen(true);
  };

  const handleOpenView = (id: number) => {
    setSelectedEmployeeId(id);
    setIsViewOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setSelectedEmployeeId(null);
    }
  };

  const handleViewOpenChange = (open: boolean) => {
    setIsViewOpen(open);
    if (!open) {
      setSelectedEmployeeId(null);
    }
  };

  const handleEditFromView = () => {
    setIsViewOpen(false);
    setIsFormOpen(true);
  };

  return {
    page,
    setPage,
    selectedEmployee,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedEmployeesData,
    totalPages,
    employeeOptions,
    handleSave,
    handleDelete,
    handleOpenEdit,
    handleOpenView,
    handleFormOpenChange,
    handleViewOpenChange,
    handleEditFromView,
    isOptionsPending: isEmployeesPending,
    isCreatePending: createMutation.isPending,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};