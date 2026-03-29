import React from "react";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { SessionDialog } from "../../SessionDialog";

interface Session {
    id?: number;
    sessionTime: string;
    courtName: string;
    hallRole: string;
    hallNumber: string;
}

interface TableSessionsActionsProps {
    item: Session;
    onSave?: (values: Session) => void;
    onDelete?: () => void;
}

export const TableSessionsActions: React.FC<TableSessionsActionsProps> = ({
    item,
    onSave,
    onDelete,
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <SessionDialog
                initialValues={item}
                onSave={onSave || (() => { })}
                trigger={
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        title="تعديل"
                        className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                    >
                        <EditIcon className="size-[14px] text-[#3D3C48]" />
                    </button>
                }
            />

            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                }}
                title="حذف"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#C60000]/8 transition-colors hover:bg-[#ffe4e4]"
            >
                <TrashIcon className="size-[16px] text-[#C60000]" />
            </button>
        </div>
    );
};
