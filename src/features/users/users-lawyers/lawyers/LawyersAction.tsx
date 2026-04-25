import { ButtonDeleteTable } from '@/shared/components/ButtonDeleteTable';
import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { ViewLinkTablePageDetails } from '@/shared/components/ViewLinkTablePageDetails';
import React, { useState } from 'react';
import { useDeleteLawyer } from '../api/hooks/useDeletLawyers';
import type { Lawyer } from '../lawyers/types';
import { Editlawyers } from './Editlawyers';

interface LawyersActionProps {
    lawyer?: Lawyer;
    onLawyerUpdated?: () => void;
}

export const LawyersAction: React.FC<LawyersActionProps> = ({ lawyer, onLawyerUpdated }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { mutateAsync: deleteLawyer } = useDeleteLawyer();

    const handleDelete = async () => {
        try {
            if (lawyer) {
                await deleteLawyer({ id: lawyer.user_id.toString() });
                if (onLawyerUpdated) {
                    onLawyerUpdated();
                }
            }
        } catch (error) {
            console.error('Error deleting lawyer:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <ViewLinkTablePageDetails to={`/dashboard/users/lawyers/${lawyer?.user_id}`} />
                <ButtonUpdateTable onClick={() => setIsEditDialogOpen(true)} />
                <ConfirmDeleteDialog
                    title="حذف المحامي"
                    description={`هل أنت متأكد من حذف المحامي ${lawyer?.user.first_name} ؟`}
                    onConfirm={handleDelete}
                    trigger={
                        <ButtonDeleteTable />
                    }
                />
            </div>

            <Editlawyers
                lawyer={lawyer}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onLawyerUpdated={onLawyerUpdated}
            />
        </>
    );
};