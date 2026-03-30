import React, { useState } from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import { EditClientDialog } from './EditClientDialog';

interface UserClientsActionProps {
    caseItem: any;
    onTaskUpdated?: () => void;
}

export const UserClientsAction: React.FC<UserClientsActionProps> = ({ caseItem, onTaskUpdated }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleClientUpdated = () => {
        handleCloseDialog();
        if (onTaskUpdated) {
            onTaskUpdated();
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <Link
                    to={`/dashboard/clients/${caseItem.id}`} title="عرض التفاصيل"
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


            <EditClientDialog
                client={caseItem}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onClientUpdated={handleClientUpdated}
            />
        </>
    );
};