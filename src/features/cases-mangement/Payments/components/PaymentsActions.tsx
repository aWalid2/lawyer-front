import type { PaymentItem } from "@/features/cases-mangement/Payments/types";
import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonPdfExport } from "@/shared/components/buttons/ButtonPdfExport";
import { ButtonViewTable } from "@/shared/components/buttons/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";

interface PaymentsActionsProps {
  payment: PaymentItem;
  onView: () => void;
  onDelete: () => void;
  onExportPdf?: () => void;
}

export const PaymentsActions = ({
  payment,
  onView,
  onDelete,
  onExportPdf,
}: PaymentsActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonViewTable
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
      />

      {onExportPdf && (
        <ButtonPdfExport
          onClick={(e) => {
            e.stopPropagation();
            onExportPdf();
          }}
        />
      )}

      <ConfirmDeleteDialog
        title="حذف الدفعة"
        description={`هل أنت متأكد من حذف الدفعة "${payment.payment_description}"؟`}
        onConfirm={onDelete}
        trigger={<ButtonDeleteTable onClick={(e) => e.stopPropagation()} />}
      />
    </div>
  );
};

export default PaymentsActions;
