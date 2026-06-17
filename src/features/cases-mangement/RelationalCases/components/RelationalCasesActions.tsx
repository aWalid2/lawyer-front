import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/buttons/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/links/ViewLinkTablePageDetails";
import React from "react";
import type { RelatedCaseTableItem } from "../types";
import { RelationalCaseDialog } from "./RelationalCaseDialog";

interface RelationalCasesProps {
  caseId: string;
  caseItem: RelatedCaseTableItem;
  onDelete: (caseItem: RelatedCaseTableItem) => Promise<void> | void;
}

export const RelationalCasesActions: React.FC<RelationalCasesProps> = ({
  caseId,
  caseItem,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ViewLinkTablePageDetails
        to={`/dashboard/case-management/${caseItem.id}`}
      />

      <RelationalCaseDialog
        title="تعديل قضية مرتبطة"
        caseId={caseId}
        caseItem={caseItem}
        trigger={<ButtonUpdateTable />}
      />

      <ConfirmDeleteDialog
        title="حذف قضية مرتبطة"
        description="هل انت متاكد من حذف القضية المرتبطة"
        onConfirm={() => {
          onDelete?.(caseItem);
        }}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};
