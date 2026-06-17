import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/buttons/ButtonUpdateTable";
import { ButtonViewTable } from "@/shared/components/buttons/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import type { ExpenseItem } from "../types";

interface ExpensesActionsProps {
  expense: ExpenseItem;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ExpensesActions = ({
  expense,
  onView,
  onEdit,
  onDelete,
}: ExpensesActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonViewTable
        onClick={(event) => {
          event.stopPropagation();
          onView();
        }}
      />

      <ButtonUpdateTable
        onClick={(event) => {
          event.stopPropagation();
          onEdit();
        }}
      />

      <ConfirmDeleteDialog
        title="حذف المصروف"
        description={`هل أنت متأكد من حذف المصروف \"${expense.description}\"؟`}
        onConfirm={onDelete}
        trigger={
          <ButtonDeleteTable onClick={(event) => event.stopPropagation()} />
        }
      />
    </div>
  );
};
