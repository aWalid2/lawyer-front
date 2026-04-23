import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useRemoveProsecutionSessions } from "../../../api/hooks/useRemoveProsecutionSessions";

interface ActionsCoulmnProps {
  item: { id: string | number };
  onEdit: () => void;
}

export const ActionsCoulmn = ({ item, onEdit }: ActionsCoulmnProps) => {
  const { mutateAsync: deleteSessionAsync, isPending: isDeleting } =
    useRemoveProsecutionSessions();

  return (
    <div className="flex items-center gap-4">
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
