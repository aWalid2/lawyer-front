import React from "react";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ButtonViewTable } from "@/shared/components/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";

interface EmployeesActionsProps {
  employee: any;
  onEdit?: (employee: any) => void;
  onDelete?: (employee: any) => void;
  onView?: (employee: any) => void;
}

export const EmployeesActions: React.FC<EmployeesActionsProps> = ({
  employee,
  onEdit,
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

      <ButtonUpdateTable
        onClick={(event) => {
          event.stopPropagation();
          onEdit?.(employee);
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
