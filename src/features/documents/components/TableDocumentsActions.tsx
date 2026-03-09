import React from "react";
import { Link } from "react-router-dom";
import type { Document } from "../types";
import { ViewIcon } from "@/components/shared/icons/View";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";

import { EditDocumentDialog } from "./EditDocumentDialog";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";

export const TableDocumentsActions: React.FC<{
  document: Document;
  onEdit?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
}> = ({ document, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        to={`#`}
        title="عرض"
        className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#F0F6FF]"
      >
        <ViewIcon className="size-[16px] text-[#63A4F9]" />
      </Link>

      <EditDocumentDialog
        document={document}
        trigger={
            <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(document);
            }}
            title="تعديل"
            className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#F1F1F3]"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />


      <ConfirmDeleteDialog
        title="حذف المستند"
        description={`هل أنت متأكد من حذف المستند ${document.type === 'cases' ? document.caseTitle : document.clientName}؟`}
        onConfirm={() => {
            if (onDelete) {
                onDelete(document);
            }
        }}
        trigger={
            <button
                onClick={(e) => {
                e.stopPropagation();
                }}
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
