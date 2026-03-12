import React from "react";
import { Link, useParams } from "react-router-dom";
import { ViewIcon } from "@/components/shared/icons/View";
import { TrashIcon } from "@/components/shared/icons/Trash";
import { DownloadIcon } from "lucide-react";
import type { CaseDocument } from "../types";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";

interface CaseDocumentActionsProps {
  document: CaseDocument;
  onDelete?: (id: string) => void;
}

export const CaseDocumentActions: React.FC<CaseDocumentActionsProps> = ({
  document,
  onDelete,
}) => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        title="تحميل"
        className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#F1F1F3]"
      >
        <DownloadIcon size={16} className="text-[#3D3C48]" />
      </button>

      <Link
        to={`/dashboard/case-management/${id}/documents/${document.id}`}
        title="عرض"
        className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#F0F6FF]"
      >
        <ViewIcon className="size-[16px] text-[#63A4F9]" />
      </Link>

      <ConfirmDeleteDialog
        title="حذف المستند"
        description={`هل أنت متأكد من حذف المستند ${document.name}؟`}
        onConfirm={() => onDelete?.(document.id)}
        trigger={
          <button
            title="حذف"
            className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#C60000]/8"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
