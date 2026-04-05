import React, { useState } from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import type { Employee } from './types';
import { Editemployees } from './EditEmployees';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { useDeleteEmployee } from './api/hooks/useDeleteEmployee';

interface EmployeesActionProps {
    caseItem: Employee;
    onEmployeeUpdated?: () => void;
}

export const EmployeesAction: React.FC<EmployeesActionProps> = ({ caseItem, onEmployeeUpdated }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleEmployeeUpdated = () => {
        handleCloseDialog();
        if (onEmployeeUpdated) {
            onEmployeeUpdated();
        }
    };

        const { mutateAsync: deleteEmployee } = useDeleteEmployee();
        
        const handleDelete = async () => {
            try {
                await deleteEmployee(caseItem.user_id.toString());
                if (onEmployeeUpdated) {
                    onEmployeeUpdated();
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        };
    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <Link
                    to={`/dashboard/users/employees/${caseItem.user_id}`}
                    title="عرض التفاصيل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
                >
                    <img src={view} alt="view" />
                </Link>

                <button
                    onClick={handleEditClick}
                    title="تعديل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={edit} alt="edit" />
                </button>

                <ConfirmDeleteDialog
                    title="حذف الموظف"
                    description={`هل أنت متأكد من حذف الموظف ${caseItem.user.first_name} ؟`}
                    onConfirm={handleDelete}
                    trigger={
                        <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            title="حذف"
                            className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                        >
                            <img src={deleteIcon} alt="delete" />
                        </button>
                    }
                />
            </div>

            <Editemployees
                employee={caseItem}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onEmployeeUpdated={handleEmployeeUpdated}
            />
        </>
    );
};