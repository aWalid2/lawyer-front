import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import { Pagination } from "@/shared/components/Pagination";
import LoadingPage from "@/shared/components/LoadingPage";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { getExpenseTypeLabel } from "@/shared/utils/getExpenseTypeLabel";
import { useParams } from "react-router-dom";
import { ExpenseDetailsDialog } from "./components/ExpenseDetailsDialog";
import { ExpensesSummary } from "./components/ExpensesSummary";
import { EditModelExpenses } from "./components/EditModelExpenses";
import { ExpensesActions } from "./components/ExpensesActions";
import { useExpensesCaseFeature } from "./hooks/useExpensesCaseFeature";
import type { ExpenseItem } from "./types";

export const ExpensesCaseFeature = () => {
  const { id } = useParams();
  const caseId = id ?? "";
  const {
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
    isSaving,
  } = useExpensesCaseFeature(caseId);

  if (!caseId) {
    return <Error message="معرف القضية غير موجود في الرابط" />;
  }

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <Error message="حدث خطأ أثناء جلب مصروفات القضية." error={error} />;
  }

  const columns: Column<ExpenseItem>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "نوع المصروف",
      accessor: (item) => getExpenseTypeLabel(item.expenseType) || "-",
    },
    {
      header: "اسم الموظف المسئول",
      accessor: (item) => item.employeeName || "-",
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
      <ExpensesSummary caseId={caseId} />

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
        onOpenChange={handleModalOpenChange}
        onSave={handleSaveChanges}
        isPending={isSaving}
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
