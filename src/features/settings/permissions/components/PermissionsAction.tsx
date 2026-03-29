import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";

import type { RoleT } from "../types";
import { useNavigate } from "react-router-dom";

interface PermissionsActionProps {
  role: RoleT;
  onDelete: (id: string) => void;
}

export const PermissionsAction: React.FC<PermissionsActionProps> = ({
  role,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center gap-2">
      <TableEditButton onClick={() => navigate(`/dashboard/settings/permissions/${role.id}`)} />
      <ConfirmDeleteDialog
        title="حذف الدور"
        description={`هل أنت متأكد من حذف الدور "${role.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={() => onDelete(role.id)}
        trigger={<TableDeleteButton onClick={() => { }} />}
      />
    </div>
  );
};
