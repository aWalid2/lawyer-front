import { ButtonUpdateInfo } from "@/shared/components/ButtonUpdateInfo";
import { Error } from "@/shared/components/Error";
import { InputBox } from "@/shared/components/InputBox";
import { LayoutDialog } from "@/shared/components/LayoutDialog";
import LoadingPage from "@/shared/components/LoadingPage";
import React from "react";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import type { CaseRole } from "../types";

interface CaseRoleDetailsDialogProps {
  role: CaseRole | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export const CaseRoleDetailsDialog: React.FC<CaseRoleDetailsDialogProps> = ({
  role,
  open,
  onOpenChange,
  onEdit,
}) => {
  const {
    data: usersInRole,
    isPending: isUsersPending,
    isError: isUsersError,
  } = useGetAllUsers(open && role ? String(role.role_id) : undefined);

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }
    onOpenChange(false);
  };

  return (
    <LayoutDialog
      title="تفاصيل الدور"
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      padding="wide"
    >
      <div className="mb-6 flex justify-end">
        <ButtonUpdateInfo onEdit={handleEdit} />
      </div>

      {!role ? (
        <Error message="تعذر تحميل تفاصيل الدور." />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <InputBox label="اسم الدور" text={role.role_name} />
            <InputBox label="عدد الموظفين" text={String(role.employee_count)} />
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-base font-bold text-[#153A4D] dark:text-white">
              الموظفين داخل الدور
            </h3>

            {isUsersPending ? (
              <LoadingPage />
            ) : isUsersError ? (
              <Error message="تعذر تحميل قائمة الموظفين." />
            ) : !usersInRole || usersInRole.length === 0 ? (
              <p className="text-sm text-gray-400">
                لا يوجد موظفين في هذا الدور
              </p>
            ) : (
              <div className="max-h-60 space-y-3 overflow-y-auto">
                {usersInRole.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 rounded-lg border border-gray-100 bg-[#FDFCFA] px-4 py-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BF9A61]/10 text-sm font-bold text-[#BF9A61]">
                      {user.first_name?.charAt(0) || "#"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {user.first_name} {user.last_name ?? ""}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </LayoutDialog>
  );
};
