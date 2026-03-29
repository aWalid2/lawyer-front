import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { CaseTypeFormDialog } from "./CaseTypeFormDialog";
import type { CaseTypeT } from "../types";

interface CaseTypesActionProps {
  caseType: CaseTypeT;
  onUpdate: (id: string, values: Partial<CaseTypeT>) => void;
  onDelete: (id: string) => void;
}

export const CaseTypesAction: React.FC<CaseTypesActionProps> = ({
  caseType,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <CaseTypeFormDialog
        caseType={caseType}
        onSave={(values) => onUpdate(caseType.id, values)}
        trigger={<TableEditButton onClick={() => { }} />}
      />

      <ConfirmDeleteDialog
        title="حذف نوع القضية"
        description={`هل أنت متأكد من حذف نوع القضية "${caseType.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={() => onDelete(caseType.id)}
        trigger={<TableDeleteButton onClick={() => { }} />}
      />
    </div>
  );
};
