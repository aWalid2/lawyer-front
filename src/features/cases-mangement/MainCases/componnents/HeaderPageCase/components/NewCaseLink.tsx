import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const NewCaseLink: React.FC = () => {
  return (
    <Link
      to="/dashboard/case-management/add-case"
      className={cn(
        "h-11.5  px-4 rounded-main flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 whitespace-nowrap ",
        "bg-primary-gradient  hover:bg-primary-gradient text-white",
      )}
    >
      <span className="text-xl">+</span>
      <span>قضية جديدة</span>
    </Link>
  );
};
