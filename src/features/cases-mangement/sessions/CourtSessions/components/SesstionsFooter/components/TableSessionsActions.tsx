import deleteic from "@/public/images/delete.svg";
import editefff from "@/public/images/edit.svg";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { SessionDialog } from "./SessionDialog";
interface ActionsCoulmnProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const TableSessionsActions = ({ onEdit, onDelete }: ActionsCoulmnProps) => {
    return (
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
            <SessionDialog
                trigger={
                    <button
                        title="تعديل"
                        onClick={onEdit}
                        className="hover:scale-110 transition shrink-0 text-[#CBA462]"
                    >
                        <img src={editefff} alt="تعديل" />
                    </button>
                }
                onSave={onEdit}
            />

            <ConfirmDeleteDialog
                trigger={
                    <button
                        title="حذف"
                        className="hover:scale-110 transition shrink-0 text-red-500 disabled:opacity-50"
                    >
                        <img src={deleteic} alt="حذف" />
                    </button>
                }
                onConfirm={onDelete}
            />
        </div>
    );
};
