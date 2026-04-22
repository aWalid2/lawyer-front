import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import React from "react";
import { useDeleteClient } from "../../api/hooks/useDeleteClient";
import type { ClientRelatedT } from "../types/clientT";
import { EditClientDialog } from "./EditClientDialog";

interface UserClientsActionProps {
  client: ClientRelatedT;
  onClientUpdated?: (client: ClientRelatedT) => void;
}

export const UserClientsAction: React.FC<UserClientsActionProps> = ({
  client,
  onClientUpdated,
}) => {
  const { mutateAsync: deleteClient } = useDeleteClient();

  return (
    <div className="flex items-center justify-center gap-2">
      <ViewLinkTablePageDetails to={`/dashboard/clients/${client.user_id}`} />
      <EditClientDialog
        client={client}
        onSave={(values) => onClientUpdated?.(values)}
        trigger={<ButtonUpdateTable />}
      />

      <ConfirmDeleteDialog
        title="حذف الموكل"
        description={`هل أنت متأكد من حذف الموكل ${client.user.first_name} ؟`}
        onConfirm={() => {
          deleteClient({ id: client.user_id });
        }}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};
