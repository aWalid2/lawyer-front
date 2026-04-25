import { ButtonDeleteTable } from '@/shared/components/ButtonDeleteTable';
import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import React, { useState } from 'react';
import { useDeleteProsecution } from '../api/hooks/useDeleteProsecution';
import { ProsecutionFormDialog } from './ProsecutionFormDialog';

interface ProsecutionsActionProps {
    prosecution: any;
    onProsecutionUpdated?: () => void;
}

export const ProsecutionsAction: React.FC<ProsecutionsActionProps> = ({ prosecution, onProsecutionUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutateAsync: deleteProsecution } = useDeleteProsecution();

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProsecution = () => {
        console.log("تم حفظ النيابة");
        if (onProsecutionUpdated) {
            onProsecutionUpdated();
        }
        handleCloseModal();
    };

    const handleDelete = async () => {
        try {
            await deleteProsecution(prosecution.id.toString());
            if (onProsecutionUpdated) {
                onProsecutionUpdated();
            }
        } catch (error) {
            console.error('Error deleting prosecution:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">

                <ButtonUpdateTable onClick={handleEditClick} />

                <ConfirmDeleteDialog
                    title="حذف النيابة"
                    description={`هل أنت متأكد من حذف النيابة (${prosecution.name})`}
                    onConfirm={handleDelete}
                    trigger={
                        <ButtonDeleteTable />
                    }
                />
            </div>

            {isEditModalOpen && (
                <ProsecutionFormDialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                    prosecution={prosecution}
                    onSave={handleSaveProsecution}
                />
            )}
        </>
    );
};