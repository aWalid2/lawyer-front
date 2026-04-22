import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import React from "react";
import { ProcedureDialog } from "./ProcedureDialog";

interface Procedure {
  id: string;
  type: string;
  date: string;
  description: string;
  status: string;
}

interface ProcedureActionsProps {
  procedure: Procedure;
  onEdit?: (procedure: Procedure) => void;
  onDelete?: (procedure: Procedure) => void;
}

export const ProcedureActions: React.FC<ProcedureActionsProps> = ({
  procedure,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ProcedureDialog
        procedure={procedure}
        trigger={<ButtonUpdateTable onClick={() => onEdit?.(procedure)} />}
      />

      <ConfirmDeleteDialog
        onConfirm={() => {
          onDelete?.(procedure);
        }}
        trigger={<ButtonDeleteTable onClick={() => onDelete?.(procedure)} />}
      />
    </div>
  );
};
