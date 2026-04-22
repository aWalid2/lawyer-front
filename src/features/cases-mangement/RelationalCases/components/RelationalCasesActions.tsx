import React from "react";
import { ViewIcon } from "@/shared/icons/View";
import { EditIcon } from "@/shared/icons/Edit";
import { RelationalCaseDialog } from "./RelationalCaseDialog";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { TrashIcon } from "@/shared/icons/Trash";

interface RelationalCasesProps {
  caseItem: any;
  onEdit: (caseItem: any) => void;
  onView: (caseItem: any) => void;
  onDelete: (caseItem: any) => void;
}

export const RelationalCasesActions: React.FC<RelationalCasesProps> = ({
  caseItem,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onView?.(caseItem);
        }}
        title="عرض تفاصيل القضية"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
      >
        <ViewIcon className="size-4 text-[#63A4F9]" />
      </button>

      <RelationalCaseDialog
        title="تعديل قضية مرتبطة"
        caseItem={caseItem}
        trigger={
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(caseItem);
            }}
            title="تعديل"
            className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />

      <ConfirmDeleteDialog
        title="حذف قضية مرتبطة"
        description="هل انت متاكد من حذف القضية المرتبطة"
        onConfirm={() => {
          onDelete?.(caseItem);
        }}
        trigger={
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            title="حذف"
            className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#C60000]/8 transition-colors hover:bg-[#ffe4e4]"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
