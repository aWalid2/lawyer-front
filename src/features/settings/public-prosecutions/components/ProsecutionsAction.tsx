import React, { useState } from 'react';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { ProsecutionFormDialog } from './ProsecutionFormDialog';
import { useDeleteProsecution } from '../api/hooks/useDeleteProsecution';

interface ProsecutionsActionProps {
    prosecution: any;
    onProsecutionUpdated?: () => void;
}

export const ProsecutionsAction: React.FC<ProsecutionsActionProps> = ({ prosecution, onProsecutionUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutateAsync: deleteProsecution, isPending: isDeleting } = useDeleteProsecution();

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
                <button
                    onClick={handleEditClick}
                    title="تعديل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={edit} alt="edit" />
                </button>

                <ConfirmDeleteDialog
                    title="حذف النيابة"
                    description={`هل أنت متأكد من حذف النيابة (${prosecution.name})`}
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
                <ProsecutionFormDialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                    prosecution={prosecution}
                    trigger={<></>}
                    onSave={handleSaveProsecution}
                />
            )}
        </>
    );
};