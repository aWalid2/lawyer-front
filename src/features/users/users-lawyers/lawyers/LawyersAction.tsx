import React, { useState } from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import { Editlawyers } from './Editlawyers';
import { useDeleteLawyer } from '../api/hooks/useDeletLawyers';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';

interface Lawyer {
    user_id: number;
    license_number: string | null;
    specialization: string;
    experience_years: number | null;
    is_verified: boolean;
    user: {
        id: number;
        first_name: string;
        last_name: string | null;
        email: string;
        phone: string;
    };
}

interface LawyersActionProps {
    caseItem: Lawyer;
    onLawyerUpdated?: () => void;
}

export const LawyersAction: React.FC<LawyersActionProps> = ({ caseItem, onLawyerUpdated }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { mutateAsync: deleteLawyer } = useDeleteLawyer();
    
    const handleDelete = async () => {
        try {
            await deleteLawyer({ id: caseItem.user_id.toString() });
            if (onLawyerUpdated) {
                onLawyerUpdated();
            }
        } catch (error) {
            console.error('Error deleting lawyer:', error);
        }
    };
    
    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <Link
                    to={`/dashboard/users/lawyers/${caseItem.user_id}`}
                    title="عرض التفاصيل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
                >
                    <img src={view} alt="view" />
                </Link>

                <button
                    onClick={() => setIsEditDialogOpen(true)}
                    title="تعديل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={edit} alt="edit" />
                </button>

                <ConfirmDeleteDialog
                    title="حذف المحامي"
                    description={`هل أنت متأكد من حذف المحامي ${caseItem.user.first_name} ؟`}
                    onConfirm={handleDelete}
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

            <Editlawyers
                lawyer={caseItem}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onLawyerUpdated={onLawyerUpdated}
            />
        </>
    );
};