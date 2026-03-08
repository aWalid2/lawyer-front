import React, { useState } from 'react';
import view from '../../../../public/images/view.svg';
import edit from '../../../../public/images/edit.svg';
import deleteIcon from '../../../../public/images/delete.svg';
import AddTaskModal from './AddTaskModal';

interface UsersTaskActionsProps {
    caseItem: any;
    onTaskUpdated?: () => void;
}

export const UsersTaskActions: React.FC<UsersTaskActionsProps> = ({ caseItem, onTaskUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveTask = (values: any) => {
        console.log("تم تعديل المهمة:", values);
        if (onTaskUpdated) {
            onTaskUpdated();
        }
        handleCloseModal();
    };

    const editInitialValues = {
        taskTitle: caseItem.TaskTitle || "",
        assignee: caseItem.PersonInCharge || "",
        taskType: caseItem.TaskType || "",
        deliveryDate: caseItem.DeliveryDate || "",
        notes: "",
    };

    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <button
                    type="button"
                    title="عرض"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F0F6FF] transition-colors hover:bg-[#e0eaff]"
                >
                    <img src={view} alt="view" />
                </button>

                <button
                    onClick={handleEditClick}
                    title="تعديل"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={edit} alt="edit" />
                </button>

                <button
                    type="button"
                    title="حذف"
                    className="h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#F1F1F3] transition-colors hover:bg-[#e4e4e7]"
                >
                    <img src={deleteIcon} alt="delete" />
                </button>
            </div>

            {isEditModalOpen && (
                <AddTaskModal
                    onClose={handleCloseModal}
                    onSave={handleSaveTask}
                    initialValues={editInitialValues}
                />
            )}
        </>
    );
};
