import React, { useState } from 'react';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { PoliceStationFormDialog } from './PoliceStationFormDialog';
import { useDeletePoliceStation } from '../api/hooks/useDeletePoliceStation';

interface PoliceStationsActionProps {
    station: any;
    onStationUpdated?: () => void;
}

export const PoliceStationsAction: React.FC<PoliceStationsActionProps> = ({ station, onStationUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutateAsync: deletePoliceStation, isPending: isDeleting } = useDeletePoliceStation();

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveStation = () => {
        console.log("تم حفظ المخفر");
        if (onStationUpdated) {
            onStationUpdated();
        }
        handleCloseModal();
    };
    
    const handleDelete = async () => {
        try {
            await deletePoliceStation(station.id.toString());
            if (onStationUpdated) {
                onStationUpdated();
            }
        } catch (error) {
            console.error('Error deleting police station:', error);
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
                    title="حذف المخفر"
                    description={`هل أنت متأكد من حذف المخفر (${station.name})`}
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
                <PoliceStationFormDialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                    station={station}
                    onSave={handleSaveStation}
                />
            )}
        </>
    );
};