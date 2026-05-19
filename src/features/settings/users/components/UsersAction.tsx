import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { TableEditButton } from "@/shared/components/TableEditButton";
import React from "react";
import type { UserT } from "../types/userT";
import { UserFormDialog } from "./UserFormDialog";
import { useDeleteUser } from "../api/hooks/useDeleteUser";
import { toast } from "sonner";

interface UsersActionProps {
  user: UserT;
  onUserUpdated: () => void;
}

export const UsersAction: React.FC<UsersActionProps> = ({
  user,
  onUserUpdated,
}) => {
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        toast.success("تم حذف المستخدم بنجاح");
        onUserUpdated();
      },
      onError: (error: unknown) => {
        const errorMessage = (error as any)?.response?.data?.message || "حدث خطأ أثناء حذف المستخدم";
        toast.error(errorMessage);
      },
    });
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
        description={`هل أنت متأكد من حذف المستخدم ${user.first_name}؟`}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
