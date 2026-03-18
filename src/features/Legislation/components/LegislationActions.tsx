import React from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';

interface LegislationActionsProps {
    legislationItem: any;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const LegislationActions: React.FC<LegislationActionsProps> = ({ 
    legislationItem, 
    onEdit, 
    onDelete 
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Link
                to={`/dashboard/legislations/${legislationItem.id}`}
                title="عرض"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
            >
                <img src={view} alt="view" />
            </Link>

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