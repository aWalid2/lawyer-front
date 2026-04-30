import { useState } from "react";
import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewIcon } from "@/shared/icons/View";
import { useRemovePoliceSessions } from "../../../api/hooks/useRemovePoliceSessions";
import type { PoliceSession } from "../../../types/typsePolice";
import { PoliceSessionDetailsDialog } from "./PoliceSessionDetailsDialog";

interface ActionsCoulmnProps {
  item: PoliceSession;
  onEdit: () => void;
}

export const ActionsCoulmn = ({ onEdit, item }: ActionsCoulmnProps) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { mutateAsync: deleteSessionAsync, isPending: isDeleting } =
    useRemovePoliceSessions();

  return (
    <>
      <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-3">
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

      <PoliceSessionDetailsDialog
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
