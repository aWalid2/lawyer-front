import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewIcon } from "@/shared/icons/View";
import type { OtherSession } from "./typesOther";

interface OtherActionsProps {
  item: OtherSession;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => Promise<void> | void;
}

export const OtherActions = ({
  item,
  onView,
  onEdit,
  onDelete,
}: OtherActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        title="عرض التفاصيل"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]"
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
        title="حذف الجلسة"
        description={`هل أنت متأكد من حذف جلسة بتاريخ ${item.session_date || "-"}؟`}
        onConfirm={onDelete}
        trigger={<ButtonDeleteTable onClick={(e) => e.stopPropagation()} />}
      />
    </div>
  );
};
