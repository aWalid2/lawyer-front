import { LayoutDialog } from "@/shared/components/LayoutDialog";
import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { InputBox } from "@/shared/components/InputBox";
import { DateIcon } from "@/shared/icons/Date";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { getExpenseTypeLabel } from "@/shared/utils/getExpenseTypeLabel";
import type { ExpenseItem } from "../types";

interface ExpenseDetailsDialogProps {
  expense: ExpenseItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const ExpenseDetailsDialog: React.FC<ExpenseDetailsDialogProps> = ({
  expense,
  open,
  onOpenChange,
  onEdit,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }

    onOpenChange(false);
  };

  return (
    <LayoutDialog
      title="تفاصيل المصروف"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={handleEdit} />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <InputBox
          label="نوع المصروف"
          text={getExpenseTypeLabel(expense?.expenseType) || "-"}
        />
        <InputBox
          label="اسم الموظف المسئول"
          text={expense?.employeeName || "-"}
        />
        <InputBox
          label="تاريخ المصروف"
          text={formatDateToYYYYMMDD(expense?.expenseDate) || "-"}
          icon={<DateIcon />}
        />
        <InputBox label="وصف المصروف" text={expense?.description || "-"} />
        <InputBox
          label="قيمة المصروف"
          text={expense ? `${expense.amount.toLocaleString("en-US")} ج.م` : "-"}
        />
        <div className="col-span-1 md:col-span-2">
          <InputBox
            label="المرفقات"
            text={
              expense?.attachments.length ? expense.attachments.join("، ") : "-"
            }
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <InputBox label="ملاحظات" text={expense?.notes || "-"} />
        </div>
      </div>
    </LayoutDialog>
  );
};
