import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { CourtFormDialog } from "./CourtFormDialog";
import type { CourtT } from "../types";

interface CourtsActionProps {
  court: CourtT;
  onUpdate: (id: string, values: Partial<CourtT>) => void;
  onDelete: (id: string) => void;
}

export const CourtsAction: React.FC<CourtsActionProps> = ({
  court,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <CourtFormDialog
        court={court}
        onSave={(values) => onUpdate(court.id, values)}
        trigger={<TableEditButton />}
      />
      <ConfirmDeleteDialog
        title="حذف المحكمة"
        description={`هل أنت متأكد من حذف محكمة "${court.name}"؟`}
        onConfirm={() => onDelete(court.id)}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
