import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { AddContractDialog } from "./AddContractDialog";
import { EditClientDialog } from "../../clients/components/EditClientDialog";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useDeleteClient } from "../../api/hooks/useDeleteClient";

interface HeaderUserDetailsProps {
  activeTab?: string;
  client?: any;
}

export const HeaderUserDetails: React.FC<HeaderUserDetailsProps> = ({
  activeTab,
  client,
}) => {
  const { mutate: deleteClient } = useDeleteClient();
  const navigate = useNavigate();
  const hasContractInfo = Boolean(client?.contract);
  console.log("Client in HeaderUserDetails:", client);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-y-3">
      <HeaderTitle title="تفاصيل الموكل" />

      {activeTab === "info" ? (
        <div className="flex items-center gap-3">
          <EditClientDialog
            client={client}
            trigger={
              <button
                className={`flex h-12.5 w-12.5 items-center justify-center rounded-[8px] bg-[#F1F1F3] p-3 text-[#3D3C48] shadow-sm transition-all hover:opacity-90`}
              >
                <EditIcon />
              </button>
            }
          />

          <ConfirmDeleteDialog
            trigger={
              <button className="flex h-12.5 w-12.5 items-center justify-center rounded-[8px] bg-[#C60000]/8 p-3 text-[#C60000] shadow-sm transition-all hover:bg-red-100">
                <TrashIcon />
              </button>
            }
            onConfirm={async () => {
              await deleteClient({ id: client.user_id });
              navigate("/dashboard/clients");
            }}
          />

          {!hasContractInfo && <AddContractDialog clientId={client.user_id} />}
        </div>
      ) : (
        <Link
          to="/dashboard/case-management/add-case"
          className="bg-primary-gradient rounded-mainfont-semibold rounded-main flex h-12.5 items-center gap-2 px-6 py-2.5 text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Plus size={20} />
          قضية جديدة
        </Link>
      )}
    </div>
  );
};
