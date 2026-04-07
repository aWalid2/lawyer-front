import React, { useState } from 'react';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { CaseStatusFormDialog } from './CaseStatusFormDialog';
import { useDeleteCaseStatus } from '../api/hooks/useDeleteCaseStatus';

interface CaseStatusesActionProps {
    status: any;
    onStatusUpdated?: () => void;
}

export const CaseStatusesAction: React.FC<CaseStatusesActionProps> = ({ status, onStatusUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutateAsync: deleteCaseStatus, isPending: isDeleting } = useDeleteCaseStatus();

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveStatus = () => {
        console.log("تم حفظ الحالة");
        if (onStatusUpdated) {
            onStatusUpdated();
        }
        handleCloseModal();
    };
    
    const handleDelete = async () => {
        try {
            await deleteCaseStatus(status.id.toString());
            if (onStatusUpdated) {
                onStatusUpdated();
            }
        } catch (error) {
            console.error('Error deleting case status:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={handleEditClick}
                    title="تعديل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={edit} alt="edit" />
                </button>

                <ConfirmDeleteDialog
                    title="حذف الحالة"
                    description={`هل أنت متأكد من حذف الحالة (${status.name})`}
                    onConfirm={handleDelete}
                    trigger={
                        <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            title="حذف"
                            disabled={isDeleting}
                            className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <img src={deleteIcon} alt="delete" />
                        </button>
                    }
                />
            </div>

            {isEditModalOpen && (
                <CaseStatusFormDialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                    status={status}
                    trigger={<></>}
                    onSave={handleSaveStatus}
                />
            )}
        </>
    );
};