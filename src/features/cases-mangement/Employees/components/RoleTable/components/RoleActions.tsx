import { ButtonViewTable } from "@/shared/components/buttons/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { TableDeleteButton } from "@/shared/components/buttons/TableDeleteButton";
import React from "react";
import type { CaseRole } from "../types";

interface RolesActionsProps {
  role: CaseRole;
  onDelete?: (role: CaseRole) => void;
  onView?: (role: CaseRole) => void;
}

export const RolesActions: React.FC<RolesActionsProps> = ({
  role,
  onDelete,
  onView,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonViewTable
        onClick={(event) => {
          event.stopPropagation();
          onView?.(role);
        }}
      />

      <ConfirmDeleteDialog
        onConfirm={() => {
          onDelete?.(role);
        }}
        trigger={
          <TableDeleteButton
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        }
      />
    </div>
  );
};
