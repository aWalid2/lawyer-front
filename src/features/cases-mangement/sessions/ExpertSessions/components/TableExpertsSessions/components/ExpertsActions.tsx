import deleteIcon from "@/public/images/delete.svg";
import edit from "@/public/images/edit.svg";
import view from "@/public/images/view.svg";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import React from "react";
import { Link } from "react-router-dom";

interface ExpertItem {
  id: string | number;
}

interface ExpertsActionsProps {
  expertItem: ExpertItem;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ExpertsActions: React.FC<ExpertsActionsProps> = ({
  expertItem,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onEdit}
        title="تعديل"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
      >
        <img src={edit} alt="edit" />
      </button>

      <ConfirmDeleteDialog
        trigger={
          <button
            type="button"
            title="حذف"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        }
        onConfirm={onDelete!}
      />

      <Link
        to={`/dashboard/case-management/sessions/expert-sessions/${expertItem?.id}`}
      >
        <img src={view} alt="view" />
      </Link>
    </div>
  );
};
