import React from "react";
import type { RollSession } from "../types";
import { RollSessionDialog } from "./RollSessionDialog";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { TableEditButton } from "@/components/shared/components/TableEditButton";
import { TableDeleteButton } from "@/components/shared/components/TableDeleteButton";

interface TableRollActionsProps {
  session: RollSession;
  onEdit?: (session: RollSession) => void;
  onDelete?: (session: RollSession) => void;
}

export const TableRollActions: React.FC<TableRollActionsProps> = ({
  session,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <RollSessionDialog
        initialValues={session}
        onSave={(values) => onEdit?.(values)}
        trigger={
          <TableEditButton />
        }
      />

      <ConfirmDeleteDialog
        title="حذف الجلسة"
        description={`هل أنت متأكد من حذف الجلسة رقم ${session.sessionDateTime}؟`}
        onConfirm={() => onDelete?.(session)}
        trigger={
          <TableDeleteButton />
        }
      />
    </div>
  );
};
