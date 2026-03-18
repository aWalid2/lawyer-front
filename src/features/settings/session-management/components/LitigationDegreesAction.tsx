import React from "react";
import { TableEditButton } from "@/components/shared/components/TableEditButton";
import { TableDeleteButton } from "@/components/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { LitigationDegreeFormDialog } from "./LitigationDegreeFormDialog";
import type { LitigationDegreeT } from "../types";

interface LitigationDegreesActionProps {
  degree: LitigationDegreeT;
  onUpdate: (id: string, values: Partial<LitigationDegreeT>) => void;
  onDelete: (id: string) => void;
}

export const LitigationDegreesAction: React.FC<LitigationDegreesActionProps> = ({
  degree,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <LitigationDegreeFormDialog
        degree={degree}
        onSave={(values) => onUpdate(degree.id, values)}
        trigger={<TableEditButton />}
      />
      <ConfirmDeleteDialog
        title="حذف النوع"
        description={`هل أنت متأكد من حذف نوع درجة التقاضي "${degree.name}"؟`}
        onConfirm={() => onDelete(degree.id)}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
