import React from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import { Link } from 'react-router-dom';
import { EditClientDialog } from './EditClientDialog';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { useDeleteClient } from '@/features/clients/api/hooks/useDeleteClient';
import type { ClientRelatedT } from '../types/types';


interface UserClientsActionProps {

    client: ClientRelatedT;
    onClientUpdated?: (client: any) => void;
}

export const UserClientsAction: React.FC<UserClientsActionProps> = ({ client, onClientUpdated }) => {


    const { mutateAsync: deleteClient } = useDeleteClient();

    return (
        <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Link
                to={`/dashboard/clients/${client.user_id}`}
                onClick={(e) => e.stopPropagation()}
                title="عرض التفاصيل"
                className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
            >
                <img src={view} alt="view" />
            </Link>

            <EditClientDialog
                client={client}
                onSave={(values) => onClientUpdated?.(values)}
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

            <ConfirmDeleteDialog
                title="حذف الموكل"
                description={`هل أنت متأكد من حذف الموكل ${client.user.first_name} ؟`}
                onConfirm={() => {
                    deleteClient({ id: client.user_id });
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
    );
};