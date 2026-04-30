import { useState } from "react";
import { useParams } from "react-router-dom";
import { useIndexedApiPagination } from "@/shared/hooks/useIndexedApiPagination";
import { useCreateProcedure } from "../../../api/hooks/useCreateProcedure";
import { useDeleteProcedure } from "../../../api/hooks/useDeleteProcedure";
import { useGetProcedures } from "../../../api/hooks/useGetProcedures";
import { useUpdateProcedure } from "../../../api/hooks/useUpdateProcedure";
import type { Procedure, ProcedureFormValues } from "../../../types";
import { toProcedureRequest } from "../../../types";

const ITEMS_PER_PAGE = 5;

export const useProceduresTable = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedProcedureId, setSelectedProcedureId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const {
    data: proceduresResponse,
    isPending,
    isError,
    error,
  } = useGetProcedures(caseId, page, ITEMS_PER_PAGE);

  const proceduresData: Procedure[] = proceduresResponse?.data ?? [];
  const { indexedData: indexedProceduresData, totalPages } =
    useIndexedApiPagination({
      data: proceduresData,
      page,
      itemsPerPage: ITEMS_PER_PAGE,
      meta: proceduresResponse?.meta,
    });

  const createMutation = useCreateProcedure(caseId!);
  const updateMutation = useUpdateProcedure(caseId!);
  const deleteMutation = useDeleteProcedure(caseId!);

  const handleSave = async (values: ProcedureFormValues, id?: number) => {
    const payload = toProcedureRequest(values);

    if (id) {
      await updateMutation.mutateAsync({ id, data: payload });
      return;
    }

    await createMutation.mutateAsync({ caseId: caseId!, data: payload });
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleOpenEdit = (id: number) => {
    setSelectedProcedureId(id);
    setIsFormOpen(true);
  };

  const handleOpenView = (id: number) => {
    setSelectedProcedureId(id);
    setIsViewOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setSelectedProcedureId(null);
    }
  };

  const handleViewOpenChange = (open: boolean) => {
    setIsViewOpen(open);
    if (!open) {
      setSelectedProcedureId(null);
    }
  };

  const handleEditFromView = () => {
    setIsViewOpen(false);
    setIsFormOpen(true);
  };

  return {
    page,
    setPage,
    selectedProcedureId,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedProceduresData,
    totalPages,
    handleSave,
    handleDelete,
    handleOpenEdit,
    handleOpenView,
    handleFormOpenChange,
    handleViewOpenChange,
    handleEditFromView,
    isCreatePending: createMutation.isPending,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};