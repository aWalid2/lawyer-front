
import { AddOtherSessionDialog } from "./AddOtherSessionDialog";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { TrashIcon } from "@/components/shared/icons/Trash";
import type { OtherSession, OtherSessionFormValues } from "./typesOther";
import { EditIcon } from "@/components/shared/icons/Edit";

interface OtherActionsProps {
  item: OtherSession;
  onDelete: (id: string) => void;
  onSave: (values: OtherSessionFormValues) => void;
}

export const OtherActions = ({
  item,
  onDelete,
  onSave,
}: OtherActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <AddOtherSessionDialog
        initialValues={item}
        onSave={onSave}
        trigger={
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave?.(item);
            }}
            title="تعديل"
            className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
          >
            <EditIcon className="size-[14px] text-[#3D3C48]" />
          </button>
        }
      />

      <ConfirmDeleteDialog
        title="حذف الجلسة"
        description={`هل أنت متأكد من حذف جلسة بتاريخ ${item.sessionDate}؟`}
        onConfirm={() => onDelete(item.id)}
        trigger={
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            title="حذف"
            className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#C60000]/8 transition-colors hover:bg-[#ffe4e4]"
          >
            <TrashIcon className="size-[16px] text-[#C60000]" />
          </button>
        }
      />
    </div>
  );
};
