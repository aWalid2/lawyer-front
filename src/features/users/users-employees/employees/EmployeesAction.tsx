import React, { useState } from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import type { Employee } from './types';
import { Editemployees } from './EditEmployees';

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

    return (
        <>
            <div className="flex items-center justify-center gap-2">
                {/* ✅ الرابط الصحيح حسب الراوتر */}
                <Link
                    to={`/dashboard/users/employees/${caseItem.id}`}
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

                <button
                    type="button"
                    title="حذف"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={deleteIcon} alt="delete" />
                </button>
            </div>

            {/* الموديل يظهر عند الضغط على زر التعديل */}
            <Editemployees
                employee={caseItem}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onEmployeeUpdated={handleEmployeeUpdated}
            />
        </>
    );
};