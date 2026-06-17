import React from "react";
import type { Consultation } from "../types";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { Link } from "react-router-dom";
import { ViewIcon } from "@/shared/icons/View";
import { ConsultationsDialog } from "./ConsultationsDialog";
import { useDeleteConsultation } from "../../api/hooks/useDelateConsultations";

interface TableConsultationsActionsProps {
  consultation: Consultation;
  onEdit?: (consultation: Consultation) => void;
  onDelete?: (consultation: Consultation) => void;
}

export const TableConsultationsActions: React.FC<
  TableConsultationsActionsProps
> = ({ consultation, onEdit, onDelete }) => {
  const { mutate } = useDeleteConsultation();

  const handleDelete = () => {
    mutate(consultation.id, {
      onSuccess: () => {
        if (onDelete) {
          onDelete(consultation);
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        to={`/dashboard/consultations/${consultation?.id}`}
        onClick={(e) => e.stopPropagation()}
        title="عرض التفاصيل"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]"
      >
        <ViewIcon className="size-[16px] text-[#63A4F9]" />
      </Link>

      <ConsultationsDialog
        initialValues={consultation}
        onUpdate={(values) => onEdit?.(values)}
        isEdit={true}
        trigger={
          <button
            title="تعديل"
            className="rounded-main flex h-9 w-9 items-center justify-center bg-[#F1F1F3] transition-colors outline-none hover:bg-gray-200"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />

      <ConfirmDeleteDialog
        title="حذف الاستشارة"
        description={`هل أنت متأكد من حذف الاستشارة: ${consultation.consultation_title}؟`}
        onConfirm={handleDelete}
        trigger={
          <button
            title="حذف"
            className="rounded-main flex h-9 w-9 items-center justify-center bg-[#C60000]/8 transition-colors outline-none hover:bg-red-100"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
