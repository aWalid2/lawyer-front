import React from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import { EditClientDialog } from './EditClientDialog';
import type { ClientRelatedT } from '../types/clientT';

interface UserClientsActionProps {
    caseItem: ClientRelatedT;
    onTaskUpdated?: () => void;
    onClientUpdated?: (client: ClientRelatedT) => void;
}

export const UserClientsAction: React.FC<UserClientsActionProps> = ({ caseItem, onTaskUpdated, onClientUpdated }) => {
    const handleClientUpdated = (values: any) => {
        if (onTaskUpdated) onTaskUpdated();
        if (onClientUpdated) onClientUpdated(values);
    };

    return (
        <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Link
                to={`/dashboard/clients/${caseItem.id}`}
                onClick={(e) => e.stopPropagation()}
                title="عرض التفاصيل"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
            >
                <img src={view} alt="view" />
            </Link>

            <EditClientDialog
                client={caseItem}
                onSave={handleClientUpdated}
                trigger={
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        title="تعديل"
                        className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                    >
                        <img src={edit} alt="edit" />
                    </button>
                }
            />

            <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                title="حذف"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
            >
                <img src={deleteIcon} alt="delete" />
            </button>
        </div>
    );
};