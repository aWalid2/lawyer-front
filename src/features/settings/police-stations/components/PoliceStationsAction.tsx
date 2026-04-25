import { ButtonDeleteTable } from '@/shared/components/ButtonDeleteTable';
import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import React, { useState } from 'react';
import { useDeletePoliceStation } from '../api/hooks/useDeletePoliceStation';
import { PoliceStationFormDialog } from './PoliceStationFormDialog';

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
                <ButtonUpdateTable onClick={handleEditClick} />

                <ConfirmDeleteDialog
                    title="حذف المخفر"
                    description={`هل أنت متأكد من حذف المخفر (${station.name})`}
                    onConfirm={handleDelete}
                    trigger={
                        <ButtonDeleteTable disabled={isDeleting} />
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