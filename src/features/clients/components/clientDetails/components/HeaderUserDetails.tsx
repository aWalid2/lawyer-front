import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
export const HeaderUserDetails: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <HeaderTitle title="تفاصيل الموكل" />

      <Link
        to="/dashboard/cases/new"
        className="bg-primary-gradient text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg h-12.5 hover:shadow-xl transition-all"
      >
        <Plus size={20} />
        قضية جديدة
      </Link>
    </div>
  );
};
