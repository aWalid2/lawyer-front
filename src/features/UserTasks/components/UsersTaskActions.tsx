import { ButtonDeleteTable } from '@/shared/components/ButtonDeleteTable';
import { ButtonUpdateTable } from '@/shared/components/ButtonUpdateTable';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { ViewLinkTablePageDetails } from '@/shared/components/ViewLinkTablePageDetails';
import React, { useState } from 'react';
import { useDeleteTask } from '../api/hooks/useDelateTask';
import AddTaskModal from './AddTaskModal';

interface UsersTaskActionsProps {
    caseItem: any;
    onTaskUpdated?: () => void;
}

export const UsersTaskActions: React.FC<UsersTaskActionsProps> = ({ caseItem, onTaskUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutateAsync: deleteTask } = useDeleteTask();

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveTask = (values: any) => {
        console.log("تم حفظ المهمة:", values);
        if (onTaskUpdated) {
            onTaskUpdated();
        }
        handleCloseModal();
    };

    const handleDelete = async () => {
        try {
            await deleteTask({ id: caseItem.id.toString() });
            if (onTaskUpdated) {
                onTaskUpdated();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const determineTaskRelation = (taskType: string): string => {
        if (!taskType) return "case";
        if (/^\d+$/.test(taskType)) {
            return "case";
        }
        return "non_case";
    };

    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return "";
        return dateString.split('T')[0];
    };

    const editInitialValues = {
        task_title: caseItem.task_title || "",
        assigned_to: caseItem.assigned_to || 0,
        task_type: caseItem.task_type || "",
        delivery_date: formatDateForInput(caseItem.delivery_date),
        status: caseItem.status || "",
        notes: caseItem.notes || "",
        details: caseItem.details || "",
        start_date: formatDateForInput(caseItem.start_date),
        end_date: formatDateForInput(caseItem.end_date),
        task_relation: determineTaskRelation(caseItem.task_type),
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">

                <ViewLinkTablePageDetails to={`/dashboard/user-tasks/${caseItem.id}`} />


                <ButtonUpdateTable onClick={handleEditClick} />

                <ConfirmDeleteDialog
                    title="حذف المهمة"
                    description={`هل أنت متأكد من حذف المهمة (${caseItem.task_title})`}
                    onConfirm={handleDelete}
                    trigger={
                        <ButtonDeleteTable />
                    }
                />
            </div>

            {isEditModalOpen && (
                <AddTaskModal
                    onClose={handleCloseModal}
                    onSave={handleSaveTask}
                    initialValues={editInitialValues}
                    taskId={caseItem.id.toString()}
                />
            )}
        </>
    );
};