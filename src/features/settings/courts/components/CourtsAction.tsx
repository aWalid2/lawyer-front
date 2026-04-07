import { TableEditButton } from "@/shared/components/TableEditButton";
import { TableDeleteButton } from "@/shared/components/TableDeleteButton";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { CourtFormDialog } from "./CourtFormDialog";
import type { CourtT } from "../types/courtTypes";
import { useDeleteCourt } from "../api/hooks/useDeleteCourt";

interface CourtsActionProps {
  court: CourtT;
  onUpdate?: (id: number, values: { name: string, address: string }) => void;
}

export const CourtsAction: React.FC<CourtsActionProps> = ({
  court,
  onUpdate,

}) => {
  const { mutateAsync: deleteCourt } = useDeleteCourt();
  return (
    <div className="flex items-center gap-2 justify-center">
      <CourtFormDialog
        court={court}
        onSave={(values) => onUpdate?.(Number(court.id), values)}
        trigger={<TableEditButton />}
      />
      <ConfirmDeleteDialog
        title="حذف المحكمة"
        description={`هل أنت متأكد من حذف محكمة "${court.name}"؟`}
        onConfirm={() => deleteCourt({ id: Number(court.id) })}
        trigger={<TableDeleteButton />}
      />
    </div>
  );
};
