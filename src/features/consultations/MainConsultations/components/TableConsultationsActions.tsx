import React from "react";
import type { Consultation } from "../types";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";

import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { Link } from "react-router-dom";
import { ViewIcon } from "@/components/shared/icons/View";
import { ConsultationsDialog } from "./ConsultationsDialog";

interface TableConsultationsActionsProps {
  consultation: Consultation;
  onEdit?: (consultation: Consultation) => void;
  onDelete?: (consultation: Consultation) => void;
}

export const TableConsultationsActions: React.FC<TableConsultationsActionsProps> = ({
  consultation,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">

      <Link
        to={`/dashboard/consultations/${consultation?.id}`}
        onClick={(e) => e.stopPropagation()}
        title="عرض التفاصيل"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#F0F6FF]"
      >
        <ViewIcon className="size-[16px] text-[#63A4F9]" />
      </Link>

      <ConsultationsDialog
        initialValues={consultation}
        onSave={(values) => onEdit?.(values)}
        trigger={
          <button
            title="تعديل"
            className="h-9 w-9 flex items-center justify-center rounded-main bg-[#F1F1F3] hover:bg-gray-200 transition-colors outline-none"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />

      <ConfirmDeleteDialog
        title="حذف الاستشارة"
        description={`هل أنت متأكد من حذف الاستشارة: ${consultation.title}؟`}
        onConfirm={() => onDelete?.(consultation)}
        trigger={
          <button
            title="حذف"
            className="h-9 w-9 flex items-center justify-center rounded-main bg-[#C60000]/8 hover:bg-red-100 transition-colors outline-none"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
