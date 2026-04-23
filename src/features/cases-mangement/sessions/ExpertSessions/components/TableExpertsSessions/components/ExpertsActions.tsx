import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import React from "react";

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
      <ViewLinkTablePageDetails
        to={`/dashboard/case-management/sessions/expert-sessions/${expertItem?.id}`}
      />
      <ButtonUpdateTable onClick={onEdit} />

      <ConfirmDeleteDialog
        trigger={<ButtonDeleteTable />}
        onConfirm={onDelete!}
      />
    </div>
  );
};
