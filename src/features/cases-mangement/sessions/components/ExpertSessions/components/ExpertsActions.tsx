import deleteIcon from '@/public/images/delete.svg';
import edit from '@/public/images/edit.svg';
import React from 'react';

interface ExpertsActionsProps {
    expertItem: any;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const ExpertsActions: React.FC<ExpertsActionsProps> = ({
    onEdit,
    onDelete
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={onEdit}
                title="تعديل"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
            >
                <img src={edit} alt="edit" />
            </button>

            <button
                onClick={onDelete}
                type="button"
                title="حذف"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
            >
                <img src={deleteIcon} alt="delete" />
            </button>
        </div>
    );
};