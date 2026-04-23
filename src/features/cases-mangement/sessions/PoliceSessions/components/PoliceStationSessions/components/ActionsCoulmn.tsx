import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useRemovePoliceSessions } from "../../../api/hooks/useRemovePoliceSessions";
import type { PoliceSession } from "../../../types/typsePolice";
interface ActionsCoulmnProps {
  item: PoliceSession;
  onEdit: () => void;
}

export const ActionsCoulmn = ({ onEdit, item }: ActionsCoulmnProps) => {
  const { mutateAsync: deleteSessionAsync, isPending: isDeleting } =
    useRemovePoliceSessions();
  return (
    <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-3">
      <ButtonUpdateTable
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      />
      <ConfirmDeleteDialog
        trigger={<ButtonDeleteTable disabled={isDeleting} />}
        onConfirm={async () => {
          await deleteSessionAsync(Number(item.id));
        }}
      />
    </div>
  );
};
