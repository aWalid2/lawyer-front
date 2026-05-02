import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Pagination } from "@/shared/components/Pagination";
import { InputBox } from "@/shared/components/InputBox";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import React, { useMemo, useState } from "react";
import { ExpenseDetailsDialog } from "./components/ExpenseDetailsDialog";
import { EditModelExpenses } from "./components/EditModelExpenses";
import { ExpensesActions } from "./components/ExpensesActions";
import type { ExpenseFormValues, ExpenseItem } from "./types";

const ITEMS_PER_PAGE = 10;

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "expense-1",
    expenseType: "رسوم محكمة",
    description: "رسوم قيد الدعوى",
    amount: 1200,
    expenseDate: "2026-04-15",
    notes: "تم دفع الرسوم عند تسجيل الدعوى.",
    attachments: ["court-fees.pdf"],
  },
  {
    id: "expense-2",
    expenseType: "انتقالات",
    description: "انتقال لحضور الجلسة",
    amount: 350,
    expenseDate: "2026-04-28",
    notes: "انتقال فريق العمل إلى المحكمة.",
    attachments: [],
  },
];

export const ExpensesCaseFeature = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );

  const totalExpensesValue = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const latestExpenseDate = useMemo(() => {
    if (!expenses.length) return "-";

    const latest = [...expenses].sort(
      (left, right) =>
        new Date(right.expenseDate).getTime() -
        new Date(left.expenseDate).getTime(),
    )[0];

    return formatDateToYYYYMMDD(latest.expenseDate) || "-";
  }, [expenses]);

  const selectedExpense = useMemo(
    () => expenses.find((expense) => expense.id === selectedExpenseId) ?? null,
    [expenses, selectedExpenseId],
  );

  const totalPages = Math.max(1, Math.ceil(expenses.length / ITEMS_PER_PAGE));

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
    setExpenses((current) =>
      current.filter((expense) => expense.id !== expenseId),
    );
    if (selectedExpenseId === expenseId) {
      setSelectedExpenseId(null);
      setIsModalOpen(false);
      setIsViewOpen(false);
    }
  };

  const handleSaveChanges = (values: ExpenseFormValues, expenseId?: string) => {
    const attachments = values.attachments
      ? Array.isArray(values.attachments)
        ? values.attachments
        : Array.from(values.attachments).map((file) => file.name)
      : [];

    const payload: ExpenseItem = {
      id: expenseId || crypto.randomUUID(),
      expenseType: values.expenseType,
      description: values.description,
      amount: Number(values.amount),
      expenseDate: values.expenseDate,
      notes: values.notes || "",
      attachments,
    };

    setExpenses((current) => {
      if (!expenseId) {
        return [payload, ...current];
      }

      return current.map((expense) =>
        expense.id === expenseId ? payload : expense,
      );
    });
  };

  const columns: Column<ExpenseItem>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "نوع المصروف",
      accessor: "expenseType",
    },
    {
      header: "وصف المصروف",
      accessor: "description",
      className: "text-right",
    },
    {
      header: "قيمة المصروف",
      accessor: (item) => `${item.amount.toLocaleString("en-US")} ج.م`,
    },
    {
      header: "تاريخ المصروف",
      accessor: (item) => formatDateToYYYYMMDD(item.expenseDate) || "-",
    },
    {
      header: "المرفقات",
      accessor: (item) =>
        item.attachments.length > 0
          ? item.attachments.length === 1
            ? item.attachments[0]
            : `${item.attachments[0]} +${item.attachments.length - 1}`
          : "-",
      className: "text-right",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <ExpensesActions
          expense={item}
          onView={() => handleOpenView(item.id)}
          onEdit={() => handleOpenEdit(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <CustomLayoutBorder>
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold">
            موجز المصروفات
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputBox
            label="إجمالي المصروفات"
            text={`${totalExpensesValue.toLocaleString("en-US")} ج.م`}
          />
          <InputBox label="تاريخ آخر مصروف" text={latestExpenseDate} />
        </div>
      </CustomLayoutBorder>

      <CustomLayoutBorder>
        <div className="flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-center">
          <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold sm:w-auto">
            المصروفات
          </h1>

          <ButtonUpdateInfo
            type="add"
            text="إضافة مصروف"
            onEdit={handleOpenCreate}
          />
        </div>

        {expenses.length === 0 ? (
          <EmptyTable message="لا توجد مصروفات مضافة لهذه القضية" />
        ) : (
          <>
            <DataTable
              data={indexedExpenses}
              columns={columns}
              rowIdField="id"
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </CustomLayoutBorder>

      <EditModelExpenses
        expense={selectedExpense}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSaveChanges}
      />

      {selectedExpense && (
        <ExpenseDetailsDialog
          expense={selectedExpense}
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          onEdit={handleEditFromView}
        />
      )}
    </div>
  );
};
