import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useState } from "react";
import { SessionDialog } from "./SessionDialog";

interface Session {
  session_date: string;
  court_id: number;
  hall_floor: number;
  hall_number: number;
}

interface ActionsCoulmnProps {
  item: Session;
  onEdit: (values: Session) => void;
  onDelete: () => void;
}

export const TableSessionsActions = ({
  item,
  onEdit,
  onDelete,
}: ActionsCoulmnProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-3">
      <SessionDialog
        open={open}
        onOpenChange={setOpen}
        initialValues={item}
        trigger={<ButtonUpdateTable />}
        onSave={onEdit}
      />

      <ConfirmDeleteDialog
        trigger={<ButtonDeleteTable />}
        onConfirm={onDelete}
      />
    </div>
  );
};
