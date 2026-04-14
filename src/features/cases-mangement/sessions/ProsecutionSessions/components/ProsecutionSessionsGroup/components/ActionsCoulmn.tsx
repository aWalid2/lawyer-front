import edit from "@/public/images/edit.svg";
import deleteIcon from "@/public/images/delete.svg";
import { useRemoveProsecutionSessions } from "../../../api/hooks/useRemoveProsecutionSessions";

interface ActionsCoulmnProps {
    item: any;
    onEdit: () => void;
}

export const ActionsCoulmn = ({ item, onEdit }: ActionsCoulmnProps) => {
    const { mutateAsync: deleteSessionAsync, isPending: isDeleting } = useRemoveProsecutionSessions();

    const handleDelete = async () => {
        try {
            await deleteSessionAsync(item.id);
        } catch (error) {
            console.error("Failed to delete session", error);
        }
    };

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
            <button
                onClick={handleDelete}
                type="button"
                disabled={isDeleting}
                className="hover:scale-110 transition shrink-0 disabled:opacity-50"
            >
                {isDeleting ? (
                    <span className="animate-spin h-5 w-5 border-2 border-red-500 rounded-full border-t-transparent inline-block"></span>
                ) : (
                    <img src={deleteIcon} alt="delete" className="max-sm:w-5 max-sm:h-5 max-md:w-5 max-md:h-5" />
                )}
            </button>
        </div>
    );
};
