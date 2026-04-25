import { ButtonDeleteTable } from '@/shared/components/ButtonDeleteTable';
import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { ViewLinkTablePageDetails } from '@/shared/components/ViewLinkTablePageDetails';
import React, { useState } from 'react';
import { useDeleteEmployee } from './api/hooks/useDeleteEmployee';
import { Editemployees } from './EditEmployees';
import type { Employee } from './types';

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
                <ViewLinkTablePageDetails to={`/dashboard/users/employees/${caseItem.user_id}`} />
                <ButtonUpdateTable onClick={handleEditClick} />


                <ConfirmDeleteDialog
                    title="حذف الموظف"
                    description={`هل أنت متأكد من حذف الموظف ${caseItem.user.first_name} ؟`}
                    onConfirm={handleDelete}
                    trigger={
                        <ButtonDeleteTable />
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