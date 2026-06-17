import React from "react";
import { TableEditButton } from "@/shared/components/buttons/TableEditButton";
import { TableDeleteButton } from "@/shared/components/buttons/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { ClientStatusFormDialog } from "./ClientStatusFormDialog";
import type { ClientStatusT } from "../types/clientStatusT";
import { useDeleteClientStatus } from "../api/hooks/useDeleteClientStatus";

interface ClientStatusesActionProps {
  clientStatus: ClientStatusT;
}

export const ClientStatusesAction: React.FC<ClientStatusesActionProps> = ({
  clientStatus,
}) => {
  const { mutateAsync: deleteClientStatus } = useDeleteClientStatus();

  return (
    <div className="flex items-center justify-center gap-2">
      <ClientStatusFormDialog
        clientStatus={clientStatus}
        trigger={<TableEditButton onClick={() => {}} />}
      />

      <ConfirmDeleteDialog
        title="حذف صفة الموكل"
        description={`هل أنت متأكد من حذف صفة الموكل "${clientStatus.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={async () => {
          await deleteClientStatus(clientStatus.id);
        }}
        trigger={<TableDeleteButton onClick={() => {}} />}
      />
    </div>
  );
};
