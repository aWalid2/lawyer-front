import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";

interface HeaderUserDetailsProps {
  activeTab?: string;
}

export const HeaderUserDetails: React.FC<HeaderUserDetailsProps> = ({ activeTab }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <HeaderTitle title="تفاصيل الموكل" />

      {activeTab === "info" ? (
        <div className="flex items-center gap-3">
   
       <button className="bg-[#F1F1F3] hover:bg-gray-200 text-[#3D3C48] p-3 rounded-[8px] shadow-sm transition-all h-12.5 w-12.5 flex items-center justify-center">
            <EditIcon />
          </button>

          <button className="bg-[#C60000]/8 hover:bg-red-100 text-[#C60000] p-3 rounded-[8px] shadow-sm transition-all h-12.5 w-12.5 flex items-center justify-center">
            <TrashIcon />
          </button>
   
                 <button
          className="bg-primary-gradient text-white px-6 py-2.5 rounded-[12px] font-semibold flex items-center gap-2 shadow-lg h-12.5 hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          اضافة عقد
        </button>
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
