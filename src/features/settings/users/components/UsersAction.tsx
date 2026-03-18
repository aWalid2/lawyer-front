import React from "react";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";
import type { UserT } from "../types";
import { UserFormDialog } from "./UserFormDialog";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { TableDeleteButton } from "@/components/shared/components/TableDeleteButton";
import { TableEditButton } from "@/components/shared/components/TableEditButton";

interface UsersActionProps {
  user: UserT;
  onUserUpdated: () => void;
}

export const UsersAction: React.FC<UsersActionProps> = ({ user, onUserUpdated }) => {
  const handleDelete = () => {
    console.log("Deleting user:", user.id);
    onUserUpdated();
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <UserFormDialog
        user={user}
        onUserUpdated={onUserUpdated}
        trigger={<TableEditButton />}
      />

      <ConfirmDeleteDialog
        onConfirm={handleDelete}
        title="حذف مستخدم"
        description={`هل أنت متأكد من حذف المستخدم ${user.name}؟`}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
