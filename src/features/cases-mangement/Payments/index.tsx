import { useParams } from "react-router-dom";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { usePaymentsCaseFeature } from "./hooks/usePaymentsCaseFeature";
import { PaymentsActions } from "./components/PaymentsActions";
import { EditModelPayments } from "./components/EditModelPayments";
import { PaymentDetailsDialog } from "./components/PaymentDetailsDialog";
import { PaymentsSummary } from "./components/PaymentsSummary";
import type { PaymentItem } from "./types";

const PaymentsCaseFeature = () => {
  const { id } = useParams();
  const caseId = id ?? "";

  const {
    isModalOpen,
    isViewOpen,
    payments,
    indexedPayments,
    selectedPayment,

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
  } = usePaymentsCaseFeature(caseId);

  if (!caseId) return <div>معرف القضية غير موجود في الرابط</div>;
  if (isPending) return <LoadingPage />;
  if (isError) return <div>حدث خطأ أثناء جلب المدفوعات: {String(error)}</div>;

  const columns: Column<PaymentItem>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "اسم الموظف المسئول",
      accessor: (item) => item.employeeName || "-",
    },
    { header: "وصف الدفعة", accessor: "description", className: "text-right" },
    {
      header: "المبلغ",
      accessor: (item) => `${item.amount.toLocaleString("en-US")} ج.م`,
    },
    {
      header: "تاريخ الدفعة",
      accessor: (item) => formatDateToYYYYMMDD(item.paymentDate) || "-",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <PaymentsActions
          payment={item}
          onView={() => handleOpenView(item.id)}
          onEdit={() => handleOpenEdit(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <PaymentsSummary caseId={caseId} />
      <CustomLayoutBorder>
        <div className="flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-center">
          <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold sm:w-auto">
            المدفوعات
          </h1>

          <ButtonUpdateInfo
            type="add"
            text="إضافة دفعة"
            onEdit={handleOpenCreate}
          />
        </div>

        {payments.length === 0 ? (
          <EmptyTable message="لا توجد مدفوعات مضافة لهذه القضية" />
        ) : (
          <>
            <DataTable
              data={indexedPayments}
              columns={columns}
              rowIdField="id"
            />
            {/* pagination lives in surrounding layout if needed */}
          </>
        )}
      </CustomLayoutBorder>

      <EditModelPayments
        payment={selectedPayment}
        open={isModalOpen}
        onOpenChange={handleModalOpenChange}
        onSave={handleSaveChanges}
        isPending={isSaving}
      />

      {selectedPayment && (
        <PaymentDetailsDialog
          payment={selectedPayment}
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          onEdit={handleEditFromView}
        />
      )}
    </div>
  );
};

export default PaymentsCaseFeature;
