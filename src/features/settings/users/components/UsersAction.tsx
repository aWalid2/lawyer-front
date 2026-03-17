import React, { useState } from "react";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";
import type { UserT } from "../types";
import { UserFormDialog } from "./UserFormDialog";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";

interface UsersActionProps {
  user: UserT;
  onUserUpdated: () => void;
}

export const UsersAction: React.FC<UsersActionProps> = ({ user, onUserUpdated }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    console.log("Deleting user:", user.id);
    onUserUpdated();
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => setIsEditOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/5 text-secondary hover:bg-secondary/10 transition-colors"
      >
        <EditIcon className="h-4 w-4" />
      </button>

      <ConfirmDeleteDialog
        onConfirm={handleDelete}
        title="حذف مستخدم"
        description={`هل أنت متأكد من حذف المستخدم ${user.name}؟`}
        trigger={
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <TrashIcon className="h-4 w-4" />
          </button>
        }
      />

      <UserFormDialog
        user={user}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onUserUpdated={onUserUpdated}
      />
    </div>
  );
};
