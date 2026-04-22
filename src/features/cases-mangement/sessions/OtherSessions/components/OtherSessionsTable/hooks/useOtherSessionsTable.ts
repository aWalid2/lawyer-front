import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOtherSessions } from "../../../api/hooks/useGetOtherSessions";
import { useCreateOtherSession } from "../../../api/hooks/useCreateOtherSession";
import { useUpdateOtherSession } from "../../../api/hooks/useUpdateOtherSession";
import { useDeleteOtherSession } from "../../../api/hooks/useDeleteOtherSession";
import type {
  OtherSession,
  OtherSessionFormValues,
} from "../../../types/typesOther";
import { toOtherSessionRequest } from "../../../types/typesOther";
import { useIndexedApiPagination } from "../../../../../../../shared/hooks/useIndexedApiPagination";

const ITEMS_PER_PAGE = 5;

export const useOtherSessionsTable = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const {
    data: sessionsResponse,
    isPending,
    isError,
    error,
  } = useGetOtherSessions(caseId, page, ITEMS_PER_PAGE);

  const sessionsData: OtherSession[] = sessionsResponse?.data ?? [];
  const { indexedData: indexedSessionsData, totalPages } =
    useIndexedApiPagination({
      data: sessionsData,
      page,
      itemsPerPage: ITEMS_PER_PAGE,
      meta: sessionsResponse?.meta,
    });

  const createMutation = useCreateOtherSession(caseId!);
  const updateMutation = useUpdateOtherSession(caseId!);
  const deleteMutation = useDeleteOtherSession(caseId!);

  const handleSave = async (values: OtherSessionFormValues, id?: number) => {
    const payload = toOtherSessionRequest(values);

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
    setSelectedSessionId(id);
    setIsFormOpen(true);
  };

  const handleOpenView = (id: number) => {
    setSelectedSessionId(id);
    setIsViewOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setSelectedSessionId(null);
    }
  };

  const handleViewOpenChange = (open: boolean) => {
    setIsViewOpen(open);
    if (!open) {
      setSelectedSessionId(null);
    }
  };

  const handleEditFromView = () => {
    setIsViewOpen(false);
    setIsFormOpen(true);
  };

  return {
    page,
    setPage,
    selectedSessionId,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedSessionsData,
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