import { buildExpenseFormData } from "../api/services/buildExpenseFormData";
import { useCreateCaseExpense } from "../api/hooks/useCreateCaseExpense";
import { useDeleteCaseExpense } from "../api/hooks/useDeleteCaseExpense";
import { useGetCaseExpense } from "../api/hooks/useGetCaseExpense";
import { useGetCaseExpenses } from "../api/hooks/useGetCaseExpenses";
import { useUpdateCaseExpense } from "../api/hooks/useUpdateCaseExpense";
import type { ExpenseFormValues, ExpenseItem } from "../types";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import React from "react";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 10;
const EMPTY_EXPENSES: ExpenseItem[] = [];

export const useExpensesCaseFeature = (caseId: string) => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );

  const {
    data: expensesResponse,
    isPending,
    isError,
    error,
  } = useGetCaseExpenses(caseId);
  const createExpenseMutation = useCreateCaseExpense(caseId);
  const updateExpenseMutation = useUpdateCaseExpense(caseId);
  const deleteExpenseMutation = useDeleteCaseExpense(caseId);
  const { data: selectedExpenseDetails } = useGetCaseExpense(
    selectedExpenseId,
    Boolean(selectedExpenseId && (isModalOpen || isViewOpen)),
  );

  const expenses = useMemo(
    () => expensesResponse?.data ?? EMPTY_EXPENSES,
    [expensesResponse?.data],
  );

  const selectedExpense = useMemo(() => {
    const expenseFromList =
      expenses.find((expense) => expense.id === selectedExpenseId) ?? null;

    return selectedExpenseDetails ?? expenseFromList;
  }, [expenses, selectedExpenseDetails, selectedExpenseId]);

  const totalPages =
    expensesResponse?.meta?.totalPages ??
    Math.max(1, Math.ceil(expenses.length / ITEMS_PER_PAGE));

  const paginatedExpenses = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return expenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [expenses, page]);

  const indexedExpenses = useIndexedData(
    paginatedExpenses,
    page,
    ITEMS_PER_PAGE,
  ) as ExpenseItem[];

  React.useEffect(() => {
    setPage(1);
  }, [expenses.length]);

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open && !isViewOpen) {
      setSelectedExpenseId(null);
    }
  };

  const handleOpenCreate = () => {
    setSelectedExpenseId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (expenseId: string) => {
    setSelectedExpenseId(expenseId);
    setIsModalOpen(true);
  };

  const handleOpenView = (expenseId: string) => {
    setSelectedExpenseId(expenseId);
    setIsViewOpen(true);
  };

  const handleViewOpenChange = (open: boolean) => {
    setIsViewOpen(open);
    if (!open) {
      setSelectedExpenseId(null);
    }
  };

  const handleEditFromView = () => {
    setIsViewOpen(false);
    setIsModalOpen(true);
  };

  const handleDelete = (expenseId: string) => {
    deleteExpenseMutation.mutate(expenseId);
    if (selectedExpenseId === expenseId) {
      setSelectedExpenseId(null);
      setIsModalOpen(false);
      setIsViewOpen(false);
    }
  };

  const handleSaveChanges = async (
    values: ExpenseFormValues,
    expenseId?: string,
  ) => {
    const formData = buildExpenseFormData(values);

    if (expenseId) {
      await updateExpenseMutation.mutateAsync({
        expenseId,
        data: formData,
      });
      return;
    }

    await createExpenseMutation.mutateAsync({
      caseId,
      data: formData,
    });
  };

  return {
    page,
    setPage,
    isModalOpen,
    isViewOpen,
    expenses,
    indexedExpenses,
    selectedExpense,
    totalPages,
    isPending,
    isError,
    error,
    handleModalOpenChange,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenView,
    handleViewOpenChange,
    handleEditFromView,
    handleDelete,
    handleSaveChanges,
    isSaving:
      createExpenseMutation.isPending || updateExpenseMutation.isPending,
  };
};