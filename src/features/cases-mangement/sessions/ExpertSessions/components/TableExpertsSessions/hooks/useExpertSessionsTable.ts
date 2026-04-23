import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetExpertSessions } from "../../../api/hooks/useGetExpertSessions";
import { useCreateExpertSession } from "../../../api/hooks/useCreateExpertSession";
import { useUpdateExpertSession } from "../../../api/hooks/useUpdateExpertSession";
import { useDeleteExpertSession } from "../../../api/hooks/useDeleteExpertSession";
import type {
  ExpertSessionRequest,
  ExpertSessionResponse,
} from "../../../types/ExpertSessionApiTypes";
import { useIndexedApiPagination } from "../../../../../../../shared/hooks/useIndexedApiPagination";

const ITEMS_PER_PAGE = 5;

export const useExpertSessionsTable = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpert, setEditingExpert] =
    useState<ExpertSessionResponse | null>(null);

  const { id: caseId } = useParams<{ id: string }>();

  const {
    data: expertsResponse,
    isPending,
    isError,
  } = useGetExpertSessions(caseId!, page, ITEMS_PER_PAGE);

  const expertsData: ExpertSessionResponse[] = expertsResponse?.data ?? [];

  const { indexedData: indexedExpertsData, totalPages } =
    useIndexedApiPagination({
      data: expertsData,
      page,
      itemsPerPage: ITEMS_PER_PAGE,
      meta: expertsResponse?.meta,
    });

  const createMutation = useCreateExpertSession(caseId!);
  const updateMutation = useUpdateExpertSession(caseId!);
  const deleteMutation = useDeleteExpertSession(caseId!);

  const handleOpenModal = () => {
    setEditingExpert(null);
    setIsModalOpen(true);
  };

  const handleEditExpert = (item: ExpertSessionResponse) => {
    setEditingExpert(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpert(null);
  };

  const handleSaveExpert = async (values: ExpertSessionRequest) => {
    if (editingExpert) {
      await updateMutation.mutateAsync({
        reportId: editingExpert.id,
        data: values,
      });
      return;
    }

    await createMutation.mutateAsync({ caseId: caseId!, data: values });
  };

  const handleDelete = (item: ExpertSessionResponse) => {
    deleteMutation.mutate(item.id);
  };

  return {
    page,
    setPage,
    isPending,
    isError,
    indexedExpertsData,
    totalPages,
    isModalOpen,
    editingExpert,
    handleOpenModal,
    handleEditExpert,
    handleCloseModal,
    handleSaveExpert,
    handleDelete,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};