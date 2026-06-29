import { useCreateCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useCreateCasePayment";
import { useDeleteCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useDeleteCasePayment";
import { useExportPaymentPdf } from "@/features/cases-mangement/Payments/api/hooks/useExportPaymentPdf";
import { useGetCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useGetCasePayment";
import { useGetCasePayments } from "@/features/cases-mangement/Payments/api/hooks/useGetCasePayments";
import { useUpdateCasePayment } from "@/features/cases-mangement/Payments/api/hooks/useUpdateCasePayment";
import type { PaymentFormValues, PaymentItem } from "@/features/cases-mangement/Payments/types";
import { useIndexedApiPagination } from "@/shared/hooks/useIndexedApiPagination";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 15;

export const usePaymentsCaseFeature = (caseId: string) => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: paymentsResponse, isPending, isError, error } = useGetCasePayments(caseId, page, ITEMS_PER_PAGE);
  const createPayment = useCreateCasePayment(caseId);
  const updatePayment = useUpdateCasePayment(caseId);
  const deletePayment = useDeleteCasePayment(caseId);
  const { handleExportPdf, isPending: isExportingPdf } = useExportPaymentPdf();
  const { data: selectedPaymentDetails } = useGetCasePayment(selectedId, Boolean(selectedId && (isModalOpen || isViewOpen)));

  const payments = useMemo(() => paymentsResponse?.data ?? [], [paymentsResponse?.data]);

  const selectedPayment = useMemo(() => {
    const fromList = payments.find((p) => p.id === selectedId) ?? null;
    return selectedPaymentDetails ?? fromList;
  }, [payments, selectedPaymentDetails, selectedId]);

  const { indexedData: indexed, totalPages } = useIndexedApiPagination({
    data: payments,
    page,
    itemsPerPage: ITEMS_PER_PAGE,
    meta: paymentsResponse?.meta,
  });

  const handleModalOpenChange = (open: boolean) => { setIsModalOpen(open); if (!open && !isViewOpen) setSelectedId(null); };
  const handleOpenCreate = () => { setSelectedId(null); setIsModalOpen(true); };
  const handleOpenEdit = (id: string) => { setSelectedId(id); setIsModalOpen(true); };
  const handleOpenView = (id: string) => { setSelectedId(id); setIsViewOpen(true); };
  const handleViewOpenChange = (open: boolean) => { setIsViewOpen(open); if (!open) setSelectedId(null); };
  const handleEditFromView = () => { setIsViewOpen(false); setIsModalOpen(true); };
  const handleDelete = (id: string) => { deletePayment.mutate(id); if (selectedId === id) { setSelectedId(null); setIsModalOpen(false); setIsViewOpen(false); } };

  const handleExportPaymentPdf = (payment: PaymentItem) => {
    const fileName = `دفعة_${payment.payment_description || payment.payment_type}_${payment.id}`;
    handleExportPdf(payment.id, fileName);
  };

  const handleSaveChanges = async (values: PaymentFormValues, paymentId?: string) => {
    if (paymentId) {
      await updatePayment.mutateAsync({ paymentId, data: values });
      return;
    }
    await createPayment.mutateAsync(values as any);
  };

  return {
    page, setPage, isModalOpen, isViewOpen, payments, indexedPayments: indexed, selectedPayment, totalPages, isPending, isError, error,
    handleModalOpenChange, handleOpenCreate, handleOpenEdit, handleOpenView, handleViewOpenChange, handleEditFromView, handleDelete, handleSaveChanges, handleExportPaymentPdf,
    isSaving: createPayment.isPending || updatePayment.isPending || isExportingPdf,
  };
};
