import { useState } from "react";
import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewIcon } from "@/shared/icons/View";
import { useRemoveProsecutionSessions } from "../../../api/hooks/useRemoveProsecutionSessions";
import { ProsecutionSessionDetailsDialog } from "./ProsecutionSessionDetailsDialog";

interface ActionsCoulmnProps {
  item: { id: string | number };
  onEdit: () => void;
}

export const ActionsCoulmn = ({ item, onEdit }: ActionsCoulmnProps) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { mutateAsync: deleteSessionAsync, isPending: isDeleting } =
    useRemoveProsecutionSessions();

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          type="button"
          title="عرض التفاصيل"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]"
          onClick={(e) => {
            e.stopPropagation();
            setIsViewOpen(true);
          }}
        >
          <ViewIcon className="size-4 text-[#63A4F9]" />
        </button>

        <ButtonUpdateTable
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        />

        <ConfirmDeleteDialog
          trigger={
            <ButtonDeleteTable
              disabled={isDeleting}
              onClick={(e) => e.stopPropagation()}
            />
          }
          onConfirm={async () => {
            await deleteSessionAsync(Number(item.id));
          }}
        />
      </div>

      <ProsecutionSessionDetailsDialog
        sessionId={item.id}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        onEdit={() => {
          setIsViewOpen(false);
          onEdit();
        }}
      />
    </>
  );
};
