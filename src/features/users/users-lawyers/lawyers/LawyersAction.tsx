import React, { useState } from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import type { Lawyer } from './types';
import { Editlawyers } from './Editlawyers';
import { useDeleteLawyer } from '../api/hooks/useDeletLawyers';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';

interface LawyersActionProps {
    caseItem: Lawyer;
    onLawyerUpdated?: () => void;
}

export const LawyersAction: React.FC<LawyersActionProps> = ({ caseItem, onLawyerUpdated }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleLawyerUpdated = () => {
        handleCloseDialog();
        if (onLawyerUpdated) {
            onLawyerUpdated();
        }
    };
        const { mutateAsync: deleteLawyer } = useDeleteLawyer();
    
    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <Link
                    to={`/dashboard/users/lawyers/${caseItem.id}`} // ✅ الرابط الصحيح
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

            <ConfirmDeleteDialog
                title="حذف المحامي"
                description={`هل أنت متأكد من حذف المحامي ${caseItem.first_name} ؟`}
                onConfirm={() => {
                    deleteLawyer({ id: caseItem.id });
                }}
                trigger={
                    <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        title="حذف"
                        className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                    >
                        <img src={deleteIcon} alt="delete" />
                    </button>
                }
            />
            </div>

            {/* الموديل يظهر عند الضغط على زر التعديل */}
            <Editlawyers
                lawyer={caseItem}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onLawyerUpdated={handleLawyerUpdated}
            />
        </>
    );
};