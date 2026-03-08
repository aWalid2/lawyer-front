import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";

export const AddTask: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = (values: any) => {
    console.log("تم حفظ المهمة:", values);
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden flex-shrink-0 order-3 w-full sm:w-auto"
        style={{
          background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
        }}
      >
        <span>+ مهمة جديدة</span>
      </button>

      {isModalOpen && (
        <AddTaskModal 
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </>
  );
};