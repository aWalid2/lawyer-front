import React from "react";
import { TableEditButton } from "@/components/shared/components/TableEditButton";
import { TableDeleteButton } from "@/components/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { RoleFormDialog } from "./RoleFormDialog";
import type { RoleT } from "../types";

interface PermissionsActionProps {
  role: RoleT;
  onUpdate: (id: string, values: Partial<RoleT>) => void;
  onDelete: (id: string) => void;
}

export const PermissionsAction: React.FC<PermissionsActionProps> = ({
  role,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <RoleFormDialog
        role={role}
        onSave={(values) => onUpdate(role.id, values)}
        trigger={<TableEditButton onClick={() => {}} />}
      />

      <ConfirmDeleteDialog
        title="حذف الدور"
        description={`هل أنت متأكد من حذف الدور "${role.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={() => onDelete(role.id)}
        trigger={<TableDeleteButton onClick={() => {}} />}
      />
    </div>
  );
};
