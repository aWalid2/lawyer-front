import React from "react";
import { EditIcon } from "@/components/shared/icons/Edit";
import { TrashIcon } from "@/components/shared/icons/Trash";
import { ConfirmDeleteDialog } from "@/components/shared/components/ConfirmDeleteDialog";
import { ProcedureDialog } from "./ProcedureDialog";

interface Procedure {
    id: string;
    type: string;
    date: string;
    description: string;
    status: string;
}

interface ProcedureActionsProps {
    procedure: Procedure;
    onEdit?: (procedure: Procedure) => void;
    onDelete?: (procedure: Procedure) => void;
}

export const ProcedureActions: React.FC<ProcedureActionsProps> = ({
    procedure,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex items-center justify-center gap-2">

            <ProcedureDialog
                procedure={procedure}
                trigger={
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(procedure);
                        }}
                        title="تعديل"
                        className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                    >
                        <EditIcon className="size-[14px] text-[#3D3C48]" />
                    </button>
                }
            />

            <ConfirmDeleteDialog
                onConfirm={() => {
                    onDelete?.(procedure);
                }}
                trigger={
                    <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
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
