import edit from "@/public/images/edit.svg";
import deleteIcon from "@/public/images/delete.svg";
import { useRemoveProsecutionSessions } from "../../../api/hooks/useRemoveProsecutionSessions";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";

interface ActionsCoulmnProps {
    item: any;
    onEdit: () => void;
}

export const ActionsCoulmn = ({ item, onEdit }: ActionsCoulmnProps) => {
    const { mutateAsync: deleteSessionAsync, isPending: isDeleting } = useRemoveProsecutionSessions();



    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                className="hover:scale-110 transition shrink-0"
                onClick={onEdit}
                disabled={isDeleting}
            >
                <img src={edit} alt="edit" className="max-sm:w-5 max-sm:h-5 max-md:w-5 max-md:h-5" />
            </button>



            <ConfirmDeleteDialog
                trigger={
                    <button
                        title="حذف"
                        disabled={isDeleting}
                        className="hover:scale-110 transition shrink-0 text-red-500 disabled:opacity-50"
                    >
                        <img src={deleteIcon} alt="حذف" />
                    </button>
                }
                onConfirm={async () => {
                    await deleteSessionAsync(Number(item.id));
                }}
            />
        </div>
    );
};
