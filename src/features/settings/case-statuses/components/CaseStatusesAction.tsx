import { ButtonDeleteTable } from '@/shared/components/ButtonDeleteTable';
import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import React, { useState } from 'react';
import { useDeleteCaseStatus } from '../api/hooks/useDeleteCaseStatus';
import { CaseStatusFormDialog } from './CaseStatusFormDialog';

interface CaseStatusesActionProps {
    status: any;
}

export const CaseStatusesAction: React.FC<CaseStatusesActionProps> = ({ status }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutateAsync: deleteCaseStatus } = useDeleteCaseStatus();

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveStatus = () => {

        handleCloseModal();
    };

    const handleDelete = async () => {
        try {
            await deleteCaseStatus(status.id.toString());
        } catch (error) {
            console.error('Error deleting case status:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">

                <ButtonUpdateTable onClick={handleEditClick} />

                <ConfirmDeleteDialog
                    title="حذف الحالة"
                    description={`هل أنت متأكد من حذف الحالة (${status.name})`}
                    onConfirm={handleDelete}
                    trigger={<ButtonDeleteTable />}
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