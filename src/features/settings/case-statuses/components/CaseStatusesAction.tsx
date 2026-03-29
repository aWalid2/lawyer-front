import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { CaseStatusFormDialog } from "./CaseStatusFormDialog";
import type { CaseStatusT } from "../types";

interface CaseStatusesActionProps {
  status: CaseStatusT;
  onUpdate: (id: string, values: Partial<CaseStatusT>) => void;
  onDelete: (id: string) => void;
}

export const CaseStatusesAction: React.FC<CaseStatusesActionProps> = ({
  status,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <CaseStatusFormDialog
        status={status}
        onSave={(values) => onUpdate(status.id, values)}
        trigger={<TableEditButton />}
      />
      <ConfirmDeleteDialog
        title="حذف حالة القضية"
        description={`هل أنت متأكد من حذف الحالة "${status.name}"؟`}
        onConfirm={() => onDelete(status.id)}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
