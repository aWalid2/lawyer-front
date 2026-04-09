import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { CaseTypeFormDialog } from "./CaseTypeFormDialog";
import type { CaseTypeT } from "../types/casesT";
import { useDeleteCaseType } from "../api/hooks/useDeleteCaseType";

interface CaseTypesActionProps {
  caseType: CaseTypeT;
}

export const CaseTypesAction: React.FC<CaseTypesActionProps> = ({
  caseType,
}) => {
  const { mutateAsync: deleteCaseType, isPending } = useDeleteCaseType();

  return (
    <div className="flex items-center justify-center gap-2">
      <CaseTypeFormDialog
        caseType={caseType}
        trigger={<TableEditButton onClick={() => { }} />}
      />

      <ConfirmDeleteDialog
        title="حذف نوع القضية"
        description={`هل أنت متأكد من حذف نوع القضية "${caseType.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={async () => {
          await deleteCaseType(caseType.id);
        }}
        trigger={<TableDeleteButton onClick={() => { }} />}
      />
    </div>
  );
};
