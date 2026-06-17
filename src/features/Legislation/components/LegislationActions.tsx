import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/buttons/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/links/ViewLinkTablePageDetails";
import React from "react";

interface LegislationActionsProps {
  legislationItem: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LegislationActions: React.FC<LegislationActionsProps> = ({
  legislationItem,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ViewLinkTablePageDetails
        to={`/dashboard/legislations/${legislationItem.id}`}
      />

      {onEdit && <ButtonUpdateTable onClick={onEdit} />}

      {onDelete && (
        <ConfirmDeleteDialog
          trigger={<ButtonDeleteTable />}
          title="حذف تشريع"
          description="هل انت متاكد من حذف التشريع"
          onConfirm={onDelete}
        />
      )}
    </div>
  );
};
