import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";

interface AddTaskProps {
  context?: "tasks" | "procedures";
}

export const AddTask: React.FC<AddTaskProps> = ({ context = "tasks" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = () => {
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="font-cairo relative order-3 flex h-9 w-full flex-shrink-0 items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-xs whitespace-nowrap text-white transition-all sm:h-10 sm:w-auto sm:px-4 sm:py-2.5 md:h-[50px] md:rounded-[12px] md:px-6 md:py-3 md:text-base"
        style={{
          background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
        }}
      >
        {context === "tasks" ? (
          <span>+ مهمة جديدة</span>
        ) : (
          <span>+ اجراء جديد</span>
        )}
      </button>

      {isModalOpen && (
        <AddTaskModal
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          context={context}
        />
      )}
    </>
  );
};
