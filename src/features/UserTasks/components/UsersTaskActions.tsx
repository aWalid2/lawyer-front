import React, { useState } from 'react';
import view from '@/public/images/view.svg';
import edit from '@/public/images/edit.svg';
import deleteIcon from '@/public/images/delete.svg';
import AddTaskModal from './AddTaskModal';
import { Link } from 'react-router-dom';
import { useDeleteTask } from '../api/hooks/useDelateTask';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';

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
                <Link
                    to={`/dashboard/user-tasks/${caseItem.id}`}
                    title="عرض"
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
                    title="حذف المهمة"
                    description={`هل أنت متأكد من حذف المهمة (${caseItem.task_title})`}
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