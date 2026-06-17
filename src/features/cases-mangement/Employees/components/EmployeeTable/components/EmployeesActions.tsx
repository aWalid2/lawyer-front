import { ButtonViewTable } from "@/shared/components/buttons/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { TableDeleteButton } from "@/shared/components/buttons/TableDeleteButton";
import React from "react";

interface EmployeesActionsProps {
  employee: any;
  onDelete?: (employee: any) => void;
  onView?: (employee: any) => void;
}

export const EmployeesActions: React.FC<EmployeesActionsProps> = ({
  employee,
  onDelete,
  onView,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonViewTable
        onClick={(event) => {
          event.stopPropagation();
          onView?.(employee);
        }}
      />

      <ConfirmDeleteDialog
        onConfirm={() => {
          onDelete?.(employee);
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
