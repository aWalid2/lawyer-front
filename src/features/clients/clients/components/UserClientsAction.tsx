import { ActionLinkButton } from "@/shared/components/buttons/ActionLinkButton";
import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/buttons/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/links/ViewLinkTablePageDetails";
import { Mail, MessageCircleMore } from "lucide-react";
import React from "react";
import { useDeleteClient } from "../../api/hooks/useDeleteClient";
import type { ClientRelatedT } from "../types/clientT";
import {
  EditClientDialog,
  type EditClientFormValues,
} from "./EditClientDialog";

interface UserClientsActionProps {
  client: ClientRelatedT;
  onClientUpdated?: (client: EditClientFormValues) => void;
}

const cleanPhoneNumber = (phone: string | null | undefined) => {
  return phone ? phone.replace(/\D/g, "") : "";
};

export const UserClientsAction: React.FC<UserClientsActionProps> = ({
  client,
  onClientUpdated,
}) => {
  const { mutateAsync: deleteClient } = useDeleteClient();

  const whatsappPhone = cleanPhoneNumber(client.user.phone);

  return (
    <div className="flex items-center justify-center gap-2">
      <ActionLinkButton
        href={`mailto:${client.user.email || ""}`}
        icon={Mail}
        title={
          client.user.email ? "إرسال بريد إلكتروني" : "لا يوجد بريد إلكتروني"
        }
        disabled={!client.user.email}
      />

      <ActionLinkButton
        href={`https://wa.me/${whatsappPhone}`}
        icon={MessageCircleMore}
        title={whatsappPhone ? "إرسال واتساب" : "لا يوجد رقم هاتف"}
        openInNewTab
        disabled={!whatsappPhone}
      />

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
