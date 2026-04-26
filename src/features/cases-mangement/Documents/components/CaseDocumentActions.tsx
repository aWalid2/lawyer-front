import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import { DownloadIcon } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import type { CaseDocument } from "../types/CaseDocumentT";

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
        className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F1F1F3]"
      >
        <DownloadIcon size={16} className="text-[#3D3C48]" />
      </button>

      <ViewLinkTablePageDetails
        to={`/dashboard/case-management/${id}/documents/${document.id}`}
      />
      <ConfirmDeleteDialog
        title="حذف المستند"
        description={`هل أنت متأكد من حذف المستند ${document.name}؟`}
        onConfirm={() => onDelete?.(document.id)}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};
