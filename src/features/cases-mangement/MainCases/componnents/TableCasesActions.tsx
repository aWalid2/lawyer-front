import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import React from "react";
import type { Case } from "../types/casesTypes";
import { EditCaseDialog } from "./EditCaseDialog";
import { OutLinkTable } from "@/shared/components/OutLinkTable";

export const TableCasesActions: React.FC<{
  caseItem: Case;
  onEdit?: (caseItem: Case) => void;
}> = ({ caseItem, onEdit }) => {
  return (
    <div
      className="flex items-center justify-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <ViewLinkTablePageDetails
        to={`/dashboard/case-management/${caseItem?.id}`}
      />

      <EditCaseDialog
        caseItem={caseItem}
        onSave={(values) => onEdit?.(values)}
        trigger={<ButtonUpdateTable />}
      />
      <OutLinkTable to="#" />
    </div>
  );
};
