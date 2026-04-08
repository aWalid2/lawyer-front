import React from "react";
import { Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { AddContractDialog } from "./AddContractDialog";
import { EditClientDialog } from "../clients/components/EditClientDialog";

interface HeaderUserDetailsProps {
  activeTab?: string;
  client?: any;
}

export const HeaderUserDetails: React.FC<HeaderUserDetailsProps> = ({
  activeTab,
  client,
}) => {
  return (
    <div className="flex items-center  flex-wrap gap-y-3 justify-between mb-6">
      <HeaderTitle title="تفاصيل الموكل" />

      {activeTab === "info" ? (
        <div className="flex items-center gap-3">
          <EditClientDialog
            client={client}
            trigger={
              <button className={`bg-[#F1F1F3] text-[#3D3C48] hover:opacity-90 p-3 rounded-[8px] shadow-sm transition-all h-12.5 w-12.5 flex items-center justify-center`}
              >
                <EditIcon />
              </button>
            }
          />

          <button className="bg-[#C60000]/8 hover:bg-red-100 text-[#C60000] p-3 rounded-[8px] shadow-sm transition-all h-12.5 w-12.5 flex items-center justify-center">
            <TrashIcon />
          </button>

          <AddContractDialog />
        </div>
      ) : (
        <Link
          to="/dashboard/case-management/add-case"
          className="bg-primary-gradient text-white px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 shadow-lg h-12.5 hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          قضية جديدة
        </Link>
      )}
    </div>
  );
};
