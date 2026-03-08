import React from "react";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";

interface TableSessionsActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

export const TableSessionsActions: React.FC<TableSessionsActionsProps> = ({
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                }}
                title="تعديل"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#F1F1F3]"
            >
                <EditIcon className="size-[14px] text-[#3D3C48]" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                }}
                title="حذف"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#FFF0F0]"
            >
                <TrashIcon className="size-[16px] text-[#E03131]" />
            </button>
        </div>
    );
};
