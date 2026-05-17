import { useIndexedData } from "@/shared/utils/useIndexedData";
import React, { useMemo, useState } from "react";
import { useGetCasePayments } from "@/features/cases-mangement/Payments/api/hooks/useGetCasePayments";
import { useGetCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useGetCasePayment";
import { useCreateCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useCreateCasePayment";
import { useUpdateCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useUpdateCasePayment";
import { useDeleteCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useDeleteCasePayment";
import type { PaymentFormValues, PaymentItem } from "@/features/cases-mangement/Payments/types";

const ITEMS_PER_PAGE = 10;

export const usePaymentsCaseFeature = (caseId: string) => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: paymentsResponse, isPending, isError, error } = useGetCasePayments(caseId);
  const createPayment = useCreateCasePayment(caseId);
  const updatePayment = useUpdateCasePayment(caseId);
  const deletePayment = useDeleteCasePayment(caseId);
  const { data: selectedPaymentDetails } = useGetCasePayment(selectedId, Boolean(selectedId && (isModalOpen || isViewOpen)));

  const payments = useMemo(() => paymentsResponse?.data ?? [], [paymentsResponse?.data]);

  const selectedPayment = useMemo(() => {
    const fromList = payments.find((p) => p.id === selectedId) ?? null;
    return selectedPaymentDetails ?? fromList;
  }, [payments, selectedPaymentDetails, selectedId]);

  const totalPages = paymentsResponse?.meta?.total_pages ?? Math.max(1, Math.ceil(payments.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return payments.slice(start, start + ITEMS_PER_PAGE);
  }, [payments, page]);

  const indexed = useIndexedData(paginated, page, ITEMS_PER_PAGE) as PaymentItem[];

  React.useEffect(() => setPage(1), [payments.length]);

  const handleModalOpenChange = (open: boolean) => { setIsModalOpen(open); if (!open && !isViewOpen) setSelectedId(null); };
  const handleOpenCreate = () => { setSelectedId(null); setIsModalOpen(true); };
  const handleOpenEdit = (id: string) => { setSelectedId(id); setIsModalOpen(true); };
  const handleOpenView = (id: string) => { setSelectedId(id); setIsViewOpen(true); };
  const handleViewOpenChange = (open: boolean) => { setIsViewOpen(open); if (!open) setSelectedId(null); };
  const handleEditFromView = () => { setIsViewOpen(false); setIsModalOpen(true); };
  const handleDelete = (id: string) => { deletePayment.mutate(id); if (selectedId === id) { setSelectedId(null); setIsModalOpen(false); setIsViewOpen(false); } };

  const handleSaveChanges = async (values: PaymentFormValues, paymentId?: string) => {
    if (paymentId) {
      await updatePayment.mutateAsync({ paymentId, data: values });
      return;
    }
    await createPayment.mutateAsync(values as any);
  };

  return {
    page, setPage, isModalOpen, isViewOpen, payments, indexedPayments: indexed, selectedPayment, totalPages, isPending, isError, error,
    handleModalOpenChange, handleOpenCreate, handleOpenEdit, handleOpenView, handleViewOpenChange, handleEditFromView, handleDelete, handleSaveChanges,
    isSaving: createPayment.isPending || updatePayment.isPending,
  };
};
