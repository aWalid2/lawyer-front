import deleteic from "@/public/images/delete.svg";
import editefff from "@/public/images/edit.svg";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useRemovePoliceSessions } from "../../../api/hooks/useRemovePoliceSessions";
import type { PoliceSession } from "../../../types/typsePolice";
interface ActionsCoulmnProps {
    item: PoliceSession;
    onEdit: () => void;
}

export const ActionsCoulmn = ({ onEdit, item }: ActionsCoulmnProps) => {
    const { mutateAsync: deleteSessionAsync, isPending: isDeleting } = useRemovePoliceSessions();
    return (
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
            <button
                title="تعديل"
                onClick={onEdit}
                className="hover:scale-110 transition shrink-0 text-[#CBA462]"
            >
                <img src={editefff} alt="تعديل" />
            </button>
            <ConfirmDeleteDialog
                trigger={
                    <button
                        title="حذف"
                        disabled={isDeleting}
                        className="hover:scale-110 transition shrink-0 text-red-500 disabled:opacity-50"
                    >
                        <img src={deleteic} alt="حذف" />
                    </button>
                }
                onConfirm={async () => {
                    await deleteSessionAsync(Number(item.id));
                }}
            />
        </div>
    );
};
