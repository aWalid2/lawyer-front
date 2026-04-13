import editefff from "@/public/images/edit.svg";
import deleteic from "@/public/images/delete.svg";
import type { PoliceSession } from "../../../types/typsePolice";
interface ActionsCoulmnProps {
    item: PoliceSession;
    onEdit: () => void;
}

export const ActionsCoulmn = ({ onEdit }: ActionsCoulmnProps) => {
    return (
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
            <button
                title="تعديل"
                onClick={onEdit}
                className="hover:scale-110 transition shrink-0 text-[#CBA462]"
            >
                <img src={editefff} alt="تعديل" />
            </button>
            <button
                title="حذف"
                className="hover:scale-110 transition shrink-0 text-red-500"
            >
                <img src={deleteic} alt="حذف" />
            </button>
        </div>
    );
};
