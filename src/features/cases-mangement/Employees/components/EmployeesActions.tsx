import React from "react";
import { ViewIcon } from "@/shared/icons/View";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { EditEmployeeDialog } from "./EditEmployeeDialog";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";

interface EmployeesActionsProps {
    employee: any;
    onEdit?: (employee: any) => void;
    onDelete?: (employee: any) => void;
    onView?: (employee: any) => void;
}

export const EmployeesActions: React.FC<EmployeesActionsProps> = ({
    employee,
    onEdit,
    onDelete,
    onView,
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onView?.(employee);
                }}
                title="عرض"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
            >
                <ViewIcon className="size-[16px] text-[#63A4F9]" />
            </button>

            <EditEmployeeDialog
                employee={employee}
                trigger={
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(employee);
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
                    onDelete?.(employee);
                }}
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
