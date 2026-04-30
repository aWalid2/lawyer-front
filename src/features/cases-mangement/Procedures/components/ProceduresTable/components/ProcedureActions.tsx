import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ButtonViewTable } from "@/shared/components/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import type { Procedure } from "../../../types";

interface ProcedureActionsProps {
  procedure: Procedure;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => Promise<void> | void;
}

export const ProcedureActions = ({
  procedure,
  onView,
  onEdit,
  onDelete,
}: ProcedureActionsProps) => {
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
        title="حذف الإجراء"
        description={`هل أنت متأكد من حذف إجراء بتاريخ ${procedure.session_date || "-"}؟`}
        onConfirm={onDelete}
        trigger={
          <ButtonDeleteTable onClick={(event) => event.stopPropagation()} />
        }
      />
    </div>
  );
};
