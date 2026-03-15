import React from "react";
import type { RollSession } from "../types";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";
import { RollSessionDialog } from "./RollSessionDialog";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";

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
          <button
            title="تعديل"
            className="h-9 w-9 flex items-center justify-center rounded-main bg-[#F1F1F3] hover:bg-gray-200 transition-colors outline-none"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />

      <ConfirmDeleteDialog
        title="حذف الجلسة"
        description={`هل أنت متأكد من حذف الجلسة رقم ${session.sessionDateTime}؟`}
        onConfirm={() => onDelete?.(session)}
        trigger={
          <button
            title="حذف"
            className="h-9 w-9 flex items-center justify-center rounded-main bg-[#C60000]/8 hover:bg-red-100 transition-colors outline-none"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
