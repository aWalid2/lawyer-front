import React from "react";
import { Link } from "react-router-dom";
import type { Case } from "./casesTypes";
import { SearchIcon } from "@/components/shared/icons/Search";
import { ViewIcon } from "@/components/shared/icons/View";
import { EditIcon } from "@/components/shared/icons/Edit";

export const TableCasesActions: React.FC<{
  caseItem: Case;
  onEdit?: (caseItem: Case) => void;
}> = ({ caseItem, onEdit }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        to={`/dashboard/case-management/${caseItem?.id}`}
        title="عرض التفاصيل"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#F0F6FF]"
      >
        <ViewIcon className="size-[16px] text-[#63A4F9]" />
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(caseItem);
        }}
        title="تعديل"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#F1F1F3]"
      >
        <EditIcon className="size-[14px] text-[#3D3C48]" />
      </button>
      <Link
        to={`#`}
        title="عرض القضية"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#FEEFE2]"
      >
        <SearchIcon className="size-[14px] text-[#F38630]" />
      </Link>
    </div>
  );
};
