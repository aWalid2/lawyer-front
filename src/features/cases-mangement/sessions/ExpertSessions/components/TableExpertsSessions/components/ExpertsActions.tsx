import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonViewTable } from "@/shared/components/ButtonViewTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import React from "react";
import { ExpertSessionDetailsDialog } from "./ExpertSessionDetailsDialog";

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
  const [isViewOpen, setIsViewOpen] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <ButtonViewTable
          onClick={(event) => {
            event.stopPropagation();
            setIsViewOpen(true);
          }}
        />

        <ConfirmDeleteDialog
          trigger={<ButtonDeleteTable />}
          onConfirm={onDelete!}
        />
      </div>

      <ExpertSessionDetailsDialog
        sessionId={expertItem.id}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        onEdit={onEdit}
      />
    </>
  );
};
