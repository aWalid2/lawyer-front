import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewIcon } from "@/shared/icons/View";
import { useState } from "react";
import { AppealSessionDetailsDialog } from "./AppealSessionDetailsDialog";
import { CassationSessionDetailsDialog } from "./CassationSessionDetailsDialog";
import { FirstInstanceSessionDetailsDialog } from "./FirstInstanceSessionDetailsDialog";
import { SessionDialog } from "./SessionDialog";

interface Session {
  id?: number;
  session_date: string;
  court_id: number;
  hall_floor: number;
  hall_number: number;
  court?: {
    name?: string;
  };
}

interface ActionsCoulmnProps {
  item: Session;
  onEdit: (values: Session) => void;
  onDelete: () => void;
  tab?: string;
}

export const TableSessionsActions = ({
  item,
  onEdit,
  onDelete,
  tab,
}: ActionsCoulmnProps) => {
  const [open, setOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const canViewDetails =
    (tab === "cassation" || tab === "first_instance" || tab === "appeal") &&
    item.id;

  return (
    <>
      <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-3">
        {canViewDetails ? (
          <button
            type="button"
            title="عرض التفاصيل"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]"
            onClick={(event) => {
              event.stopPropagation();
              setIsViewOpen(true);
            }}
          >
            <ViewIcon className="size-4 text-[#63A4F9]" />
          </button>
        ) : null}

        <SessionDialog
          open={open}
          onOpenChange={setOpen}
          initialValues={item}
          trigger={
            <ButtonUpdateTable
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          }
          onSave={onEdit}
        />

        <ConfirmDeleteDialog
          trigger={
            <ButtonDeleteTable
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          }
          onConfirm={onDelete}
        />
      </div>

      {tab === "cassation" && item.id ? (
        <CassationSessionDetailsDialog
          sessionId={item.id}
          open={isViewOpen}
          onOpenChange={setIsViewOpen}
          onEdit={() => {
            setIsViewOpen(false);
            setOpen(true);
          }}
        />
      ) : null}

      {tab === "first_instance" && item.id ? (
        <FirstInstanceSessionDetailsDialog
          sessionId={item.id}
          open={isViewOpen}
          onOpenChange={setIsViewOpen}
          onEdit={() => {
            setIsViewOpen(false);
            setOpen(true);
          }}
        />
      ) : null}

      {tab === "appeal" && item.id ? (
        <AppealSessionDetailsDialog
          sessionId={item.id}
          open={isViewOpen}
          onOpenChange={setIsViewOpen}
          onEdit={() => {
            setIsViewOpen(false);
            setOpen(true);
          }}
        />
      ) : null}
    </>
  );
};
