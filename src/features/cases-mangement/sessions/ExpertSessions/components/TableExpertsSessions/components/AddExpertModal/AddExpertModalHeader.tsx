import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface AddExpertModalHeaderProps {
  isEditMode: boolean;
}

export const AddExpertModalHeader: React.FC<AddExpertModalHeaderProps> = ({
  isEditMode,
}) => {
  return (
    <DialogHeader className="mt-15 mb-2">
      <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
        {isEditMode ? "تعديل بيانات الخبير" : "إضافة خبير جديد"}
      </DialogTitle>
      <DialogDescription className="sr-only">
        {isEditMode
          ? "نموذج تعديل بيانات تقرير الخبير الحالي."
          : "نموذج إضافة تقرير خبير جديد."}
      </DialogDescription>
    </DialogHeader>
  );
};
