import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const NewCaseLink: React.FC = () => {
  return (
    <Link
      to="/dashboard/case-management/add-case"
      className={cn(
        "h-12.5 px-8 rounded-[12px] flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 whitespace-nowrap",
        "bg-[#BF9A61] hover:bg-[#A68654] text-white shadow-[0_4px_14px_0_rgba(191,154,97,0.39)]",
      )}
    >
      <span className="text-xl">+</span>
      <span>قضية جديدة</span>
    </Link>
  );
};
