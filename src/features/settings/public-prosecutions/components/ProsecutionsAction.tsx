import React from "react";
import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ProsecutionFormDialog } from "./ProsecutionFormDialog";
import type { PublicProsecutionT } from "../types";

interface ProsecutionsActionProps {
  prosecution: PublicProsecutionT;
  onUpdate: (id: string, values: Partial<PublicProsecutionT>) => void;
  onDelete: (id: string) => void;
}

export const ProsecutionsAction: React.FC<ProsecutionsActionProps> = ({
  prosecution,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <ProsecutionFormDialog
        prosecution={prosecution}
        onSave={(values) => onUpdate(prosecution.id, values)}
        trigger={<TableEditButton />}
      />
      <ConfirmDeleteDialog
        title="حذف النيابة"
        description={`هل أنت متأكد من حذف النيابة "${prosecution.name}"؟`}
        onConfirm={() => onDelete(prosecution.id)}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
