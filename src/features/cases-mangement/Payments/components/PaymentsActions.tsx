import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ButtonViewTable } from "@/shared/components/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import type { PaymentItem } from "@/features/cases-mangement/Payments/types";

interface PaymentsActionsProps {
  payment: PaymentItem;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const PaymentsActions = ({
  payment,
  onView,
  onEdit,
  onDelete,
}: PaymentsActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonViewTable
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
      />
      <ButtonUpdateTable
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      />
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
